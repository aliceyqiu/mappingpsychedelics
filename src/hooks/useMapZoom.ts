import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import type { RefObject } from 'react';
import type { ContinentId, MapTransform } from '../types';
import { useMapStore } from '../store/mapStore';
import { continents } from '../data/continents';
import { nodes } from '../data/nodes';
import { PRESENT_OFFSETS, FUTURE_OFFSETS } from '../data/continentTimeline';

const SVG_W = 1000;
const SVG_H = 620;

// Overview zoom: k=0.5, centered on the viewBox midpoint
// x = SVG_W/2 * (1-k), y = SVG_H/2 * (1-k)
const OVERVIEW_K = 0.5;
const OVERVIEW_ZOOM = d3.zoomIdentity
  .translate(SVG_W / 2 * (1 - OVERVIEW_K), SVG_H / 2 * (1 - OVERVIEW_K))
  .scale(OVERVIEW_K);

// D3 zoom uses SVG user-coordinate space (viewBox units) via getScreenCTM().inverse().
// To center viewBox point (vx, vy) at the SVG midpoint with zoom level k:
//   x = SVG_W/2 - k * vx,  y = SVG_H/2 - k * vy
export function getContinentZoom(continentId: ContinentId, _w: number, _h: number, timelineT = 0) {
  const c = continents.find((ct) => ct.id === continentId);
  if (!c) return d3.zoomIdentity;
  const zero = { dx: 0, dy: 0, rotation: 0 };
  const p = PRESENT_OFFSETS[continentId] ?? zero;
  const f = FUTURE_OFFSETS[continentId] ?? zero;
  const dx = p.dx + (f.dx - p.dx) * timelineT;
  const dy = p.dy + (f.dy - p.dy) * timelineT;
  const k = 2.0;
  return d3.zoomIdentity
    .translate(SVG_W / 2 - k * (c.position.cx + dx), SVG_H / 2 - k * (c.position.cy + dy))
    .scale(k);
}

export function getNodeZoom(nodeId: string, _w: number, _h: number, timelineT = 0) {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return d3.zoomIdentity;

  // Resolve the node's actual visual position by applying the continent's timeline transform
  const continent = continents.find((c) => c.id === node.continentId);
  const zero = { dx: 0, dy: 0, rotation: 0 };
  const p = PRESENT_OFFSETS[node.continentId as ContinentId] ?? zero;
  const f = FUTURE_OFFSETS[node.continentId as ContinentId] ?? zero;
  const dx = p.dx + (f.dx - p.dx) * timelineT;
  const dy = p.dy + (f.dy - p.dy) * timelineT;
  const rotRad = (p.rotation + (f.rotation - p.rotation) * timelineT) * (Math.PI / 180);

  let vx = node.position.x;
  let vy = node.position.y;

  if (continent && rotRad !== 0) {
    const { cx, cy } = continent.position;
    const cos = Math.cos(rotRad);
    const sin = Math.sin(rotRad);
    vx = cx + (node.position.x - cx) * cos - (node.position.y - cy) * sin + dx;
    vy = cy + (node.position.x - cx) * sin + (node.position.y - cy) * cos + dy;
  } else {
    vx = node.position.x + dx;
    vy = node.position.y + dy;
  }

  const k = 4;
  return d3.zoomIdentity
    .translate(SVG_W / 2 - k * vx, SVG_H / 2 - k * vy)
    .scale(k);
}

export function useMapZoom(
  svgRef: RefObject<SVGSVGElement | null>,
  gRef: RefObject<SVGGElement | null>,
  containerSize: { width: number; height: number }
) {
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const setTransform = useMapStore((s) => s.setTransform);
  const setActiveContinent = useMapStore((s) => s.setActiveContinent);
  const clearCommand = useMapStore((s) => s.clearCommand);
  const setPendingOverlay = useMapStore((s) => s.setPendingOverlay);
  const setActiveNode = useMapStore((s) => s.setActiveNode);
  const setHighlightedNode = useMapStore((s) => s.setHighlightedNode);

  // Initialize D3 zoom
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const svg = d3.select(svgRef.current);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 6])
      .on('start', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        if (event.sourceEvent) {
          useMapStore.getState().setPinnedPreview(null);
        }
      })
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        if (!gRef.current) return;
        const { x, y, k } = event.transform;
        gRef.current.setAttribute('transform', `translate(${x},${y}) scale(${k})`);
        // Resize nodes and labels live — bypasses React render cycle during gesture
        gRef.current.querySelectorAll('[data-base-r]').forEach((el) => {
          const base = parseFloat(el.getAttribute('data-base-r') ?? '9');
          el.setAttribute('r', String(base / k));
        });
        gRef.current.querySelectorAll('[data-base-sw]').forEach((el) => {
          const base = parseFloat(el.getAttribute('data-base-sw') ?? '1.5');
          el.setAttribute('stroke-width', String(base / k));
        });
        gRef.current.querySelectorAll('[data-label-size]').forEach((el) => {
          const baseSize = parseFloat(el.getAttribute('data-label-size') ?? '11');
          const baseLS = parseFloat(el.getAttribute('data-base-ls') ?? '0.5');
          el.setAttribute('font-size', String(baseSize / k));
          el.setAttribute('letter-spacing', String(baseLS / k));
        });
      })
      .on('end', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        const { x, y, k } = event.transform;
        // Update Zustand only on end — semantic state change
        setTransform({ x, y, k });

        // Resolve any pending overlay after zoom settles
        const pending = useMapStore.getState().pendingOverlayNodeId;
        if (pending) {
          setPendingOverlay(null);
          setHighlightedNode(pending);
          setTimeout(() => setActiveNode(pending), 120);
        }

        // Resolve any pending hover preview after zoom settles
        const pendingHover = useMapStore.getState().pendingHoverNodeId;
        if (pendingHover && svgRef.current) {
          const rect = svgRef.current.getBoundingClientRect();
          useMapStore.getState().setPendingHover(null);
          useMapStore.getState().setPinnedPreview(pendingHover, {
            x: rect.left + rect.width / 2 + 16,
            y: rect.top + rect.height / 2 - 8,
          });
        }
      });

    zoomRef.current = zoom;
    svg.call(zoom);
    svg.call(zoom.transform, OVERVIEW_ZOOM);

    return () => {
      svg.on('.zoom', null);
    };
  }, [svgRef, gRef, setTransform, clearCommand, setPendingOverlay, setActiveNode, setHighlightedNode]);

  // Execute queued map commands
  const command = useMapStore((s) => s.command);
  useEffect(() => {
    if (!command || !svgRef.current || !zoomRef.current) return;
    const { width, height } = containerSize;
    if (width === 0 || height === 0) return;

    clearCommand();

    const duration = command.duration ?? 700;
    const svg = d3.select(svgRef.current);

    let target: d3.ZoomTransform;

    if (command.type === 'zoomToOverview') {
      target = OVERVIEW_ZOOM;
    } else if (command.type === 'zoomToContinent' && command.continentId) {
      target = getContinentZoom(command.continentId, width, height, command.timelineT ?? 0);
      setActiveContinent(command.continentId);
    } else if (command.type === 'zoomToNode' && command.nodeId) {
      target = getNodeZoom(command.nodeId, width, height, command.timelineT ?? 0);
      if (command.pendingOverlayNodeId) {
        setPendingOverlay(command.pendingOverlayNodeId);
      }
    } else {
      return;
    }

    svg
      .transition()
      .duration(duration)
      .ease(d3.easeCubicInOut)
      .call(zoomRef.current!.transform, target);
  }, [command, containerSize, clearCommand, setActiveContinent, setPendingOverlay]);

  const zoomTo = useCallback(
    (transform: MapTransform, duration = 700) => {
      if (!svgRef.current || !zoomRef.current) return;
      const t = d3.zoomIdentity.translate(transform.x, transform.y).scale(transform.k);
      d3.select(svgRef.current)
        .transition()
        .duration(duration)
        .ease(d3.easeCubicInOut)
        .call(zoomRef.current.transform, t);
    },
    [svgRef]
  );

  return { zoomRef, zoomTo };
}
