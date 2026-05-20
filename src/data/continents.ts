import type { Continent } from '../types';

// SVG coordinate space: 1000 × 620
// Layout: 3 continents top row, 2 bottom row, easter egg isolated lower-right corner

export const continents: Continent[] = [
  {
    id: 'personal-narrative',
    label: 'Personal Narrative',
    tagline: 'Patient voices, healing stories, and the felt reality of the experience',
    visualStyle: 'human-textured',
    position: { cx: 180, cy: 160, radius: 108 },
    colorPrimary: 'white',
    colorSecondary: '#3d4fd6',
    svgPath:
      'M 95,105 C 112,80 155,74 198,82 C 241,90 278,108 285,142 C 292,176 275,203 252,218 C 229,233 198,232 170,220 C 142,208 112,188 98,160 C 84,132 78,130 95,105 Z',
    previewNodeIds: ['patient-testimony', 'mystical-experience', 'integration-challenges'],
  },
  {
    id: 'science',
    label: 'Science',
    tagline: 'Controlled trials, neuroscience, and the mechanisms behind the effects',
    visualStyle: 'abstract-diagrammatic',
    position: { cx: 480, cy: 310, radius: 115 },
    colorPrimary: 'white',
    colorSecondary: '#3d4fd6',
    svgPath:
      'M 388,250 C 408,228 450,224 494,234 C 538,244 572,266 574,302 C 576,338 556,365 528,377 C 500,389 466,386 438,370 C 410,354 384,330 375,296 C 366,262 368,272 388,250 Z',
    previewNodeIds: ['psilocybin-rct', 'mdma-ptsd', 'default-mode-network'],
  },
  {
    id: 'history',
    label: 'History',
    tagline: 'How psychedelics were discovered, suppressed, and are now re-emerging',
    visualStyle: 'bounded-fragmented',
    position: { cx: 790, cy: 152, radius: 112 },
    colorPrimary: 'white',
    colorSecondary: '#3d4fd6',
    svgPath:
      'M 700,90 C 720,66 762,61 806,71 C 850,81 882,104 884,140 C 886,176 864,205 836,217 C 808,229 774,225 748,207 C 722,189 694,165 685,129 C 676,93 680,114 700,90 Z',
    previewNodeIds: ['war-on-drugs', 'hofmann-discovery', 'oregon-measure110'],
  },
  {
    id: 'indigenous-knowledge',
    label: 'Indigenous Knowledge',
    tagline: 'Ancestral wisdom, ceremony, and the ethics of knowledge sovereignty',
    visualStyle: 'organic',
    position: { cx: 222, cy: 442, radius: 108 },
    colorPrimary: 'white',
    colorSecondary: '#3d4fd6',
    svgPath:
      'M 132,384 C 150,358 192,350 234,360 C 276,370 310,392 314,426 C 318,460 298,486 272,498 C 246,510 214,506 188,492 C 162,478 134,454 124,420 C 114,386 114,410 132,384 Z',
    previewNodeIds: ['ayahuasca-ceremony', 'biopiracy-ethics', 'peyote-native-american'],
  },
  {
    id: 'harm-reduction',
    label: 'Harm Reduction',
    tagline: 'Contraindications, adverse effects, and practices that keep people safer',
    visualStyle: 'caution-contrast',
    position: { cx: 648, cy: 460, radius: 110 },
    colorPrimary: 'white',
    colorSecondary: '#3d4fd6',
    svgPath:
      'M 560,402 C 580,378 620,372 662,382 C 704,392 736,414 738,448 C 740,482 718,508 692,520 C 666,532 634,527 608,511 C 582,495 556,470 548,435 C 540,400 540,426 560,402 Z',
    previewNodeIds: ['hallucinogen-persisting', 'contraindications', 'harm-reduction-practices'],
  },
  {
    // Easter egg — small, isolated in the lower-right corner
    id: 'literacy-island',
    label: 'Psychedelic Literacy Project Island',
    tagline: 'A hidden corner of the map — for those who read between the lines',
    visualStyle: 'organic',
    position: { cx: 1350, cy: 820, radius: 46 },
    colorPrimary: 'white',
    colorSecondary: '#3d4fd6',
    svgPath:
      'M 1314,794 C 1322,780 1338,776 1354,782 C 1370,788 1382,800 1382,816 C 1382,832 1370,844 1354,846 C 1338,848 1322,840 1316,827 C 1310,814 1306,808 1314,794 Z',
    previewNodeIds: ['psychedelic-literacy-project'],
  },
];

export const getContinentById = (id: string) =>
  continents.find((c) => c.id === id);
