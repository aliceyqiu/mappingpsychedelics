import { useState } from 'react';
import styles from './N01Timeline.module.css';

interface TimelineEvent {
  year: number;
  label: string;
  above: boolean;
  description: string; // paragraphs separated by \n\n
}

const events: TimelineEvent[] = [
  {
    year: 1943,
    label: 'Bicycle Day',
    above: true,
    description: `On April 19, 1943, Swiss chemist Albert Hofmann became the first person to intentionally take an LSD trip. He had accidentally absorbed a small amount days earlier and decided to test it on purpose, cycling home as the effects took hold, giving the day its nickname. What he experienced was intense and disorienting, but also deeply meaningful. Hofmann spent the rest of his life arguing that LSD could be a powerful tool for self-understanding when used carefully.

His account launched two decades of serious research. Scientists at major universities and hospitals studied LSD for depression, alcoholism, and anxiety with promising results. Most people today only know LSD through its criminalization. Its medical origins are largely forgotten.`,
  },
  {
    year: 1970,
    label: 'Controlled Substances Act',
    above: false,
    description: `In 1970, President Nixon signed the Controlled Substances Act, which created the federal drug scheduling system still in use today. Psychedelics including LSD, psilocybin, and DMT were placed in Schedule I: the most restrictive category, defined as substances with no accepted medical use. This single decision effectively stopped psychedelic research for the next 30 years.

It also shaped how the public understood these substances as worthless and dangerous despite decades of earlier research showing therapeutic potential. In 1994, a Nixon aide admitted the drug war had been partly designed to target political opponents, not guided by science. The damage to public understanding had already been done.`,
  },
  {
    year: 1971,
    label: 'War on Drugs',
    above: true,
    description: `A year after the CSA passed, Nixon declared drugs "public enemy number one" and launched the War on Drugs. The Drug Enforcement Administration was created in 1973. Federal spending on anti-drug programs grew sharply, and mandatory prison sentences were set for drug offenses.

For psychedelics, the effects were sweeping. Researchers had to stop their work. Government campaigns taught the public that all illegal drugs including psychedelics were equally dangerous. In 1994, Nixon's aide John Ehrlichman confirmed the campaign had been partly motivated by politics. But by then, decades of messaging had already tied psychedelics to crime and moral failure in the public mind.`,
  },
  {
    year: 1983,
    label: 'DARE Founded',
    above: false,
    description: `Drug Abuse Resistance Education launched in Los Angeles in 1983 as a partnership between the LAPD and local schools. Within a decade it was in more than 75% of U.S. school districts. For most American kids, it was the only structured lesson they ever got about drugs, including psychedelics.

DARE treated every controlled substance the same: dangerous and to be refused. It made no distinction between heroin and psilocybin, or between abuse and medical treatment. A 2003 federal audit found DARE had no real effect on drug use. But, its cultural impact was enormous: it taught an entire generation to see all drugs through the same narrow, fearful lens.`,
  },
  {
    year: 1986,
    label: 'Anti-Drug Abuse Act',
    above: true,
    description: `Passed after basketball star Len Bias died of a cocaine overdose, the 1986 Anti-Drug Abuse Act set mandatory minimum prison sentences for drug offenses, including those involving psychedelics. Judges could no longer weigh individual circumstances — a first-time offender could receive years in prison.

The law expanded the U.S. prison population dramatically through the late 1980s and 1990s. It also made psychedelic research politically toxic: universities and researchers wanted nothing to do with Schedule I compounds when the legal and reputational risks were this high. Any contact with these substances — regardless of reason — was now treated as a criminal matter.`,
  },
  {
    year: 2006,
    label: 'Supreme Court: Ayahuasca',
    above: false,
    description: `In Gonzales v. O Centro Espirita (2006), the U.S. Supreme Court ruled unanimously that a small New Mexico religious group had the right to use ayahuasca — a psychedelic tea — in their ceremonies. The government tried to block it using the Controlled Substances Act. The Court said that wasn't a strong enough reason.

It was the first time a federal court formally acknowledged that a psychedelic substance could serve a protected, legitimate purpose. The ruling set a precedent used by other groups — including Native American peyote traditions — in later cases. For advocates, it was an early sign that the "no acceptable use" argument built into Schedule I wasn't legally absolute.`,
  },
  {
    year: 2019,
    label: 'FDA Breakthrough Designation',
    above: true,
    description: `Between 2018 and 2019, the FDA granted "Breakthrough Therapy" status to psilocybin-assisted therapy for two types of depression. This designation doesn't approve a drug for use — it signals that early results are strong enough to justify a faster, more collaborative review process.

It was the first time a classic psychedelic received this kind of formal recognition from a major federal agency. News coverage shifted. Research funding grew. Scientists felt safer pursuing studies. For many Americans who had only heard about psychedelics in the context of the War on Drugs, it became harder to dismiss psilocybin as dangerous when the FDA itself was expediting its review.`,
  },
  {
    year: 2020,
    label: 'Oregon Measure 109',
    above: false,
    description: `In November 2020, Oregon voters passed Measure 109, making Oregon the first U.S. state to legalize supervised psilocybin therapy. The law allows trained facilitators to administer psilocybin to adults at licensed service centers — no medical diagnosis required. Possession outside those settings remained illegal.

Oregon's program started accepting applications in 2023. The vote was a landmark shift in drug policy — driven by voters, not courts or legislators. It drew a clear line between therapeutic access and recreational legalization, offering a model for other states. Colorado passed a similar law two years later. Oregon showed that voters, when given the chance, are often willing to separate policy from stigma.`,
  },
  {
    year: 2021,
    label: 'Texas HB 1802',
    above: true,
    description: `In June 2021, Governor Greg Abbott signed Texas House Bill 1802, directing the state health department to study psilocybin and MDMA as treatments for PTSD in military veterans. It was the first state bill to put public money toward studying psychedelic therapy since the Controlled Substances Act halted such work 50 years earlier.

The bill showed that psychedelic research could become politically viable in a conservative state, by focusing on veteran mental health rather than counterculture. HB 1802 inspired similar bills in at least five other states and helped unlock federal and private research funding. Unexpectedly, Texas became a national leader in psychedelic health policy.`,
  },
  {
    year: 2023,
    label: 'Texas SB 2308',
    above: false,
    description: `Where HB 1802 studied whether psychedelic therapy was worth pursuing, Texas Senate Bill 2308 started building the infrastructure to actually provide it. The bill directed the Texas Health and Human Services Commission to develop clinical programs and a framework for regulated access.

SB 2308 also included protections for researchers, clinicians, and patients in approved programs. Support came from veterans' groups, mental health advocates, and Republican lawmakers, reinforcing the idea that psychedelic medicine doesn't belong to one political party. Texas continued moving faster than most states, establishing a model others looked to when designing their own legislation.`,
  },
  {
    year: 2024,
    label: 'FDA Rejects MDMA Therapy',
    above: true,
    description: `In August 2024, the FDA rejected an application to approve MDMA-assisted therapy for PTSD from Lykos Therapeutics. The agency raised concerns about how the trials were designed and how data was collected, and asked for more studies. MDMA-assisted therapy had been expected to be the first psychedelic treatment to win full FDA approval.

The decision was a setback, especially for veterans and trauma survivors who had been following the research closely. But most researchers emphasized it was about this specific application, not a rejection of psychedelic medicine overall. Psilocybin research continued unaffected. The episode forced the field to be more rigorous about how future trials are built and what data the FDA actually needs.`,
  },
  {
    year: 2026,
    label: 'Trump Executive Order',
    above: false,
    description: `On April 28, 2026, President Trump signed an executive order directing federal agencies to accelerate research into psychedelic-assisted therapy for veterans and first responders dealing with PTSD and traumatic brain injury. The VA and Department of Defense were told to expand clinical trial access and reduce regulatory delays.

The order was notable because it came from a Republican president, a signal that support for psychedelic medicine had genuinely crossed partisan lines. Questions remain about implementation: Schedule I restrictions can only be changed by Congress, not executive order. But the message was clear: the federal government was no longer standing on the sidelines of this conversation.`,
  },
];

export default function N01Timeline() {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedEvent = selected !== null ? events[selected] : null;

  const handleSelect = (i: number) => {
    setSelected((prev) => (prev === i ? null : i));
  };

  return (
    <div className={styles.container}>
      <p className={styles.hint}>Select any event to learn more.</p>

      <div className={styles.scrollWrap}>
        <div className={styles.timeline}>
          <div className={styles.line} />
          {events.map((event, i) => {
            const pct = 8 + (i / (events.length - 1)) * 84;
            const isActive = selected === i;
            return (
              <div
                key={event.year}
                className={styles.eventPin}
                style={{ '--pin-left': `${pct}%` } as React.CSSProperties}
                onClick={() => handleSelect(i)}
              >
                <div
                  className={[
                    styles.label,
                    event.above ? styles.labelAbove : styles.labelBelow,
                    isActive ? styles.labelActive : '',
                  ].join(' ')}
                >
                  <span className={styles.year}>{event.year}</span>
                  <span className={styles.name}>{event.label}</span>
                </div>
                <div className={[styles.dot, isActive ? styles.dotActive : ''].join(' ')} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${styles.descriptionOuter} ${selectedEvent ? styles.descriptionOuterVisible : ''}`}>
        <div className={styles.descriptionInner}>
          {selectedEvent && (
            <div key={selectedEvent.year} className={styles.descriptionContent}>
              <div className={styles.descHeader}>
                <span className={styles.descYear}>{selectedEvent.year}</span>
                <span className={styles.descLabel}>{selectedEvent.label}</span>
              </div>
              {selectedEvent.description.split('\n\n').map((para, i) => (
                <p key={i} className={styles.descText}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
