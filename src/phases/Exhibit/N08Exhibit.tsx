import React, { useState } from 'react';
import { motion } from 'framer-motion';
import continentImg from '../../assets/Asset 6.png';
import oceanBg from '../../assets/blue ocean paper background.JPG';
import person1Img from '../../assets/person1.png';
import person2Img from '../../assets/person2.png';
import styles from './N08Exhibit.module.css';

const PERSON = { 1: person1Img, 2: person2Img } as const;

interface Testimony {
  id: string;
  bio: string;
  quote: string;
  position: { x: number; y: number };
  avatar: 1 | 2;
}

const TESTIMONIES: Testimony[] = [
  {
    id: 'R38',
    bio: 'Newington, CT | 35-50 yo',
    quote: "My wife was completely against [psychedelics]... So for two years, I would just give her a little bit of the information that I was finding because I was becoming very desperate, and it slowly changed her ways.",
    position: { x: 50, y: 24 },
    avatar: 1,
  },
  {
    id: 'R40',
    bio: 'Austin, TX | 35-50 yo',
    quote: "He just was one of those people that did it and was just never the same afterwards. And that was a defining thing in my memory, that there is the risk of doing it and never being the same after that. And that's too risky for me.",
    position: { x: 62, y: 35 },
    avatar: 1,
  },
  {
    id: 'R41',
    bio: 'Houston, TX | 25-34 yo',
    quote: "I told [my mom] I hated living. And as soon as I said that, she was astonished, and she kind of  froze...I wanted her to understand I didn't do [psychedelics] to be stupid. And I didn't do it to numb the pain. I did it because I was on a mission. I was on a mission to fix my mental health.",
    position: { x: 20, y: 30 },
    avatar: 1,
  },
  {
    id: 'Dr. Michael Coe',
    bio: 'Ethnobiologist',
    quote: "I think there's a lot of great work that's being done with respect to applying them in a clinical setting, but we miss out on a few things if we solely focus on chemicals and the biology of humans.",
    position: { x: 52, y: 38 },
    avatar: 1,
  },
  {
    id: 'R36',
    bio: 'College Station, TX | 35-50',
    quote: "We're trying to turn this into medicine, but maybe it's a different type of medicine than we're accustomed to. Maybe we have to approach this in a new way because it's a new type of medicine, new to us anyway.",
    position: { x: 40, y: 40 },
    avatar: 2,
  },
  {
    id: 'R20',
    bio: 'Austin, TX | 51-65',
    quote: "I’ve had really beautiful trips… but I’ve also had trips where I was so scared I hid under the car seat for hours.",
    position: { x: 69, y: 40 },
    avatar: 2,
  },
  {
    id: 'R21',
    bio: 'Driftwood, TX | 51-65',
    quote: "I’m breaking cycles and patterns and through the help and assistance and relationship with psychedelics and plant medicine.",
    position: { x: 14, y: 46 },
    avatar: 1,
  },
  {
    id: 'R32',
    bio: 'Pearland, TX | 51-65',
    quote: "What I've learned through the plant medicine and through the ceremonial process is that it’s something that has to be respected. You have to respect the plant, you have to respect the culture.",
    position: { x: 52, y: 50 },
    avatar: 1,
  },
  {
    id: 'R27',
    bio: 'Austin, TX | 35-50',
    quote: "The part of legalization is the way that we think about what drugs are in our lives, any drug, not even just [psychedelics] but any drug, I think it would really help people kind of understand each other a little better.",
    position: { x: 64, y: 24 },
    avatar: 2,
  },
  {
    id: 'R37',
    bio: 'Austin, TX | 18-24',
    quote: "I did research [on psychedelics], and I talked with my friend, and then I heard about the ego thing. I was like, 'Ooh, I don't know if I like myself enough yet to try that.'",
    position: { x: 19, y: 56 },
    avatar: 2,
  },
  {
    id: 'R47',
    bio: 'El Paso, TX | 35-50',
    quote: "I've been paralyzed for a number of years, found psychedelics in 2018, and it changed my life. Healed a lot of my trauma.",
    position: { x: 35, y: 52 },
    avatar: 2,
  },
  {
    id: 'R01',
    bio: 'Austin, TX | 35-50',
    quote: "I think of nature, because a lot of Peruvians have a positive, a positive idea of psychedelics, and it's part of our culture.",
    position: { x: 34, y: 64 },
    avatar: 1,
  },
  {
    id: 'R48',
    bio: 'Austin, TX | 35-50',
    quote: "My experiences with psilocybin have carried into my day-to-day life and have helped transform the way I see life as I experience it. I honestly think it would have taken years to see similar strides with therapy and medication.",
    position: { x: 36, y: 32 },
    avatar: 1,
  },
  {
    id: 'R02',
    bio: 'Austin, TX | 25-34',
    quote: "When it comes to degrees of impact, I didn't like the recreational use of psychedelics, but I was highly impacted by the intentional use of psychedelics, which has done very good for me in my life.",
    position: { x: 48, y: 72 },
    avatar: 2,
  },
  {
    id: 'R28',
    bio: 'Houston, TX | 25-34',
    quote: "Most of my advice…would be from people that I know and I trust that have used them before.",
    position: { x: 38, y: 76 },
    avatar: 2,
  },
  {
    id: 'Salomé',
    bio: 'Co-founder, the ROOTS Foundation',
    quote: "How do you even start changing anything if you don't even have the conversation with the right person, have Indigenous people be invited at the right table? That's the elephant in a room.",
    position: { x: 75, y: 22 },
    avatar: 2,
  },
  {
    id: 'Mary Olivar',
    bio: 'Co-Executive Director, T4GMH',
    quote: "My friend asked, 'If we're saying their words, isn't that giving them honor?' Not necessarily. To take Indigenous words or knowledge out of context or relationship is appropriation.",
    position: { x: 36, y: 88 },
    avatar: 1,
  },
];

interface Props {
  onBack: () => void;
}

export default function N08Exhibit({ onBack }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      className={styles.page}
      style={{ '--n08-bg': `url(${oceanBg})` } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button type="button" className={styles.backBtn} onClick={onBack}>
        ← Back to atlas
      </button>

      <div className={styles.scene}>
        <div className={styles.stage}>
        <img src={continentImg} alt="" className={styles.continent} draggable={false} />

        {TESTIMONIES.map((t, i) => (
          <motion.div
            key={t.id}
            className={styles.avatarWrap}
            style={{ '--ax': `${t.position.x}%`, '--ay': `${t.position.y}%`, zIndex: hoveredId === t.id ? 100 : 2 } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.7 + i * 0.05 }}
            onMouseEnter={() => setHoveredId(t.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {hoveredId === t.id && (
              <div className={styles.bubble}>
                <div className={styles.bubbleId}>{t.id}</div>
                <div className={styles.bubbleBio}>{t.bio}</div>
                <div className={styles.bubbleQuote}>"{t.quote}"</div>
                <div className={styles.bubbleCaret} />
              </div>
            )}
            <img
              src={PERSON[t.avatar]}
              alt={t.id}
              className={styles.avatar}
              draggable={false}
            />
          </motion.div>
        ))}
        </div>
      </div>
    </motion.div>
  );
}
