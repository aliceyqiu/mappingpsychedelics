import type { Persona } from '../types';

export const personas: Persona[] = [
  // ── Robert ─────────────────────────────────────────────────────────────────
  {
    id: 'robert',
    name: 'Robert',
    bio: 'Houston, TX · 53 · Navy Veteran & Retired Law Enforcement',
    shortDescription:
      "Hi, I'm Robert. After serving my country in Afghanistan, I returned home and served as a law enforcement officer. Psychedelics were not just off the table for me, they were what I put other people in handcuffs for.",
    arcSummary: 'enforcement → healing',
    finalReflectionPrompt:
      "You spent your career enforcing the laws that made this illegal. What do you think the men you served alongside needed most?",
    beats: [
      {
        storyText:
          "I grew up in a military family during the War on Drugs. I believed in the system completely because it was the only world I knew. Rules, lines, these things existed for a reason, and I knew better than to cross 'em.",
        emotionalLabel: 'By the Book',
        targetNodeId: 'n01',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I served in Afghanistan, then I spent twenty years in law enforcement. Psychedelics weren't just off the table for me — they were what I put other people in handcuffs for.",
        emotionalLabel: 'Conviction',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "But, I carried the weight of what I'd seen the way those in my profession were expected to: quietly and alone. When it finally caught up with me, I turned to alcohol. I went through treatment programs. I tried medication and structure. Nothing ever reached the root of it. After a while, it started to feel like I was running out of options.",
        emotionalLabel: 'Exhausted',
        targetNodeId: 'n02',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I kept thinking about an old military buddy who had become a psychedelic guide. I'd thought he was out of his mind when he first told me. But something now compelled me to call him, and that one call forced me to question everything I thought I knew.",
        emotionalLabel: 'Reluctant Curiosity',
        targetNodeId: 'n03',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "He connected me with an organization working with veterans using ibogaine and 5-MeO-DMT for PTSD and alcohol use disorder. I won't pretend I wasn't terrified. I had spent two decades enforcing the laws that made this illegal. Sitting in that room felt like becoming someone I didn't recognize.",
        emotionalLabel: 'Fear',
        targetNodeId: 'n04',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "During my first guided experience, I was confronted with the pain I had caused my family. For the first time, I was able to see my actions from their perspective. I could see how my bad habits not only affect myself, but the loved ones in my life as well.",
        emotionalLabel: 'Reckoning',
        targetNodeId: 'n05',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "My experience was eye-opening, and the changes I felt were near instantaneous. I no longer felt the need to turn to alcohol! Though the experience didn't 'cure' me, it gave me a deeper understanding of my being and showed me that I had the power and tools I needed all along. The therapy, the structure, the daily effort — none of that changed. But I had, and that made all the difference.",
        emotionalLabel: 'Transformation',
        targetNodeId: 'n06',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "Today, I don't feel defined by my past anymore. I feel called to share my experience with others who may be dealing with similar issues, and show that there are other options out there.",
        emotionalLabel: 'Purpose',
        targetNodeId: 'n07',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "When I look around at those I served with in the military and law enforcement, I see a lot of them struggling the way I once did. I want them to know what I know now, that reaching the limits of the system you trusted isn't failure. Sometimes it's the beginning of actually getting better.",
        emotionalLabel: 'Hope',
        targetNodeId: 'n08',
        continueLabel: 'Reach the reflection →',
      },
    ],
  },

  // ── Isabel ─────────────────────────────────────────────────────────────────
  {
    id: 'isabel',
    name: 'Isabel',
    bio: 'Austin, TX · 32 · Tech Professional',
    shortDescription:
      "I'm Isabel. I grew up doing everything right and never really questioned the rules I was given. I've spent years managing my mental health carefully and I'm not interested in doing anything that might risk that progress. Psychedelics were always a clear no for me until a close friend's experience made me realize I didn't actually know as much about them as I thought I did.",
    arcSummary: 'reluctance → support',
    finalReflectionPrompt:
      "You came here protective of your stability. What does showing up for someone else's healing teach you about your own?",
    beats: [
      {
        storyText:
          "I've always been a rule-follower. I grew up hearing, 'Don't do drugs!' from my parents and that drugs were bad from DARE. Even when close friends experimented with weed and alcohol, I stayed away. Part of it was discipline, but part of it was also fear.",
        emotionalLabel: 'Rule-Following',
        targetNodeId: 'n01',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "In high school, a classmate had a bad trip on acid and never seemed the same after. His story stuck with me. It made psychedelics feel risky and unpredictable.",
        emotionalLabel: 'Fear',
        targetNodeId: 'n09',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "At the same time, I've dealt with depression and anxiety for most of my life. I've worked hard to manage it. Therapy, routines, and at times, medication. It took a lot of trial and error to feel stable, so it's important to me to protect that stability.",
        emotionalLabel: 'Protectiveness',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "When a close friend told me he wanted to sit with Ayahuasca for his mental health, I didn't take it seriously. I thought it sounded like an excuse. I had never heard of people using psychedelics as a mental health treatment, so I felt concerned for his safety.",
        emotionalLabel: 'Skepticism',
        targetNodeId: 'n10',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "The next time I saw my friend, he described his experience to me and what he's gained from it since. I was happy for him, yet I still didn't fully understand. But over a few months, I noticed real changes. My friend seemed calmer, more present, and more like himself overall. Seeing the improvements he was having, I became more curious about psychedelic medicine.",
        emotionalLabel: 'Curiosity',
        targetNodeId: 'n11',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I started doing my own research. I read studies from places like the University of Texas at Austin and Johns Hopkins University. I listened to doctors explain how psychedelics are used with therapy, not on their own.",
        emotionalLabel: 'Research Mode',
        targetNodeId: 'n12',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I learned about screening, preparation, and follow-up care. I also read about the risks with taking psychedelics, and that part still matters to me.",
        emotionalLabel: 'Grounded Interest',
        targetNodeId: 'n05',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I don't see myself using psychedelics, that hasn't changed. But I understand now that for some people, this can be a real and legitimate path forward. I fully support my friend and anyone else trying to find what actually works for them.",
        emotionalLabel: 'Acceptance',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "My story is about showing up for those who do use psychedelics for their mental health and accepting that, while you may not fully understand their experience, you can have compassion and respect. Being there for someone is one of the most impactful aspects of their mental health journey, especially for those exploring psychedelic treatment options.",
        emotionalLabel: 'Compassion',
        targetNodeId: 'n08',
        continueLabel: 'Reach the reflection →',
      },
    ],
  },

  // ── Zoe ────────────────────────────────────────────────────────────────────
  {
    id: 'zoe',
    name: 'Zoe',
    bio: 'Corpus Christi, TX · 27 · Freelance Video Editor',
    shortDescription:
      "Hi, I'm Zoe, and I'm naturally curious and intentional about how I move through life, whether that's in my professional work or my day-to-day routines. I like to approach my mental health with the same care I bring to everything else.",
    arcSummary: 'skepticism → intentional use',
    finalReflectionPrompt:
      "You gave something a second chance — this time on your own terms. What made the difference between the first time and the second?",
    beats: [
      {
        storyText:
          "I've struggled with anxiety all my life and started therapy for it about five years ago. I had done real work in therapy and also tried SSRIs. But, I only saw minor improvements and never found the exact medication that worked well for me. There was still this layer that I couldn't work through.",
        emotionalLabel: 'Searching',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "One day, I saw a documentary called 'How to Change Your Mind' on Netflix. The idea that psilocybin could help break through entrenched mental patterns stopped me in my tracks. But, I was skeptical, and I had reason to be.",
        emotionalLabel: 'Skeptical Curiosity',
        targetNodeId: 'n06',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "As a teenager, I had tried magic mushrooms on a camping trip with friends. It was supposed to be a light and fun experience. Everyone seemed to have a great time, but I didn't. Something felt off, and I couldn't explain why. I walked away thinking maybe psychedelics just weren't for me.",
        emotionalLabel: 'Past Reluctance',
        targetNodeId: 'n09',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "The documentary reframed everything. What was missing that first time wasn't courage or the right dose, it was intention. Set, setting, integration — none of that had been part of it. My first psychedelic experience had just been something that happened to me, not something I'd chosen carefully. The difference between those two things, I was starting to understand, was everything.",
        emotionalLabel: 'Reframing',
        targetNodeId: 'n05',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "So, I spent two months reading. Learning how psilocybin works, what conditions actually make a difference, what responsible use looks like. I wanted to feel reasonably informed, not just reassured.",
        emotionalLabel: 'Preparation',
        targetNodeId: 'n13',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "When I finally felt ready, I blocked off an entire Saturday. I cleaned my apartment, made a playlist, and wrote down what I was hoping to understand. Then, I took the medicine.",
        emotionalLabel: 'Intention',
        targetNodeId: 'n14',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "What came up was grief. Not new grief, but something I hadn't connected to my anxiety before. It wasn't comfortable, but it felt honest in a way I couldn't ignore. Afterward, I wrote for an hour while everything was still fresh.",
        emotionalLabel: 'Grief',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I brought those notes to my next therapy session. My therapist and I spent the next three sessions working through what had surfaced, tracing it back, sitting with it, making sense of it in a way I hadn't been able to before.",
        emotionalLabel: 'Integration',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "Over the following weeks, I noticed something subtle but real. That layer I hadn't been able to reach before had shifted.",
        emotionalLabel: 'Shift',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I still have anxiety. I'm not looking for a cure. I'm looking for tools that help me understand myself. And for me, psychedelics have become one of them.",
        emotionalLabel: 'Equanimity',
        targetNodeId: 'n08',
        continueLabel: 'Reach the reflection →',
      },
    ],
  },

  // ── Jordan ─────────────────────────────────────────────────────────────────
  {
    id: 'jordan',
    name: 'Jordan',
    bio: 'Plano, TX · 36 · Entrepreneur',
    shortDescription:
      "Hi, I'm Jordan, a self-employed entrepreneur in my mid-thirties with Wixárika heritage. I spent years outrunning a heaviness I couldn't name. What finally reached it wasn't something new — it was something ancient that had been waiting for me in my own family all along.",
    arcSummary: 'emptiness → cultural reconnection',
    finalReflectionPrompt:
      "You found healing in something your family had always carried for you. What does it mean to inherit something you didn't know you needed?",
    beats: [
      {
        storyText:
          "I've felt a kind of heaviness since I was a teenager. I never stopped to examine it. Instead, I built things: businesses, routines, a life that looked, from the outside, like it was working.",
        emotionalLabel: 'Heaviness',
        targetNodeId: 'n15',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "For a while, it was enough. But over time the motion stopped helping. Everything on paper was going right. The businesses were growing, my social life was full, and I was close to buying my parents a new home. Yet, I felt completely empty. I didn't have a name for it. I just knew something was wrong, and I didn't know how to slow down long enough to find out what.",
        emotionalLabel: 'Emptiness',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I decided to take time off and visit my grandparents in Mexico. I needed to get out of my own life for a moment. What I didn't expect was to find something waiting for me there.",
        emotionalLabel: 'Seeking',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "My grandparents introduced me more fully to our Wixarika heritage, something I had grown up knowing only in fragments. They shared healing practices that had been part of our tradition for generations, including the ceremonial use of hikuri, more commonly known as peyote.",
        emotionalLabel: 'Reconnection',
        targetNodeId: 'n04',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I chose to participate in a ceremony. Not as an escape but as an act of returning to something that belonged to me. I approached it with preparation, respect, and guidance from people who had held this knowledge their whole lives.",
        emotionalLabel: 'Return',
        targetNodeId: 'n16',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "What happened during that ceremony is difficult to put into words. For the first time in as long as I could remember, the heaviness lifted. I felt connected to something larger than the facade that I had been exhausting myself trying to maintain.",
        emotionalLabel: 'Release',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "The experience didn't cure anything, but it changed my relationship to what I had been carrying in a way that was real and lasting. I came home different: calmer and more honest with myself about what I actually needed.",
        emotionalLabel: 'Clarity',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I stopped running from my thoughts. I let the people closest to me in. I told them what I had been going through, and for the first time in a long time, I didn't try to make what I was feeling smaller than it was. I just let it be true.",
        emotionalLabel: 'Openness',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "Today, I run my businesses and feel more at home in my own life than I ever have. I stay close to my grandparents and the traditions they kept alive for me. I don't see the ceremony as the beginning of my healing journey. I see it as a form of healing that was whole on its own. One my ancestors understood long before any of the frameworks I'd been handed growing up.",
        emotionalLabel: 'Belonging',
        targetNodeId: 'n08',
        continueLabel: 'Reach the reflection →',
      },
    ],
  },

  // ── Dr. Cristina Salazar ────────────────────────────────────────────────────
  {
    id: 'cristina',
    name: 'Dr. Cristina Salazar',
    bio: 'Austin, TX · 29 · Psychiatry Provider',
    shortDescription:
      "Hi, I'm Dr. Cristina Salazar. I'm a psychiatrist at a major university medical center. I came to psychedelic medicine through my own early experiences that stayed with me and shaped my path through medical school. I live at the intersection of personal conviction and the frustrating realities of medical law, and I'm constantly pushing for the system to catch up with the evidence.",
    arcSummary: 'curiosity → advocacy',
    finalReflectionPrompt:
      "You train for years to have the tools to help people. What does it mean to know the tool exists and not be allowed to use it?",
    beats: [
      {
        storyText:
          "I always knew I was interested in how the brain worked. That curiosity drove me to study neuroscience and psychology at UT Austin.",
        emotionalLabel: 'Curiosity',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I took my studies seriously, but I still experimented with new substances like a lot of my peers. This led me to trying LSD with some of my friends. I had a fun time, but it wasn't something I'd think much about again. At the time, it felt more like a one-off experience rather than something meaningful.",
        emotionalLabel: 'Exploration',
        targetNodeId: 'n17',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "Then, in my upper-level courses, something clicked. We started covering psychedelics not as recreation or cautionary tales but as pharmacological compounds with measurable effects on brain networks, compounds that early research suggested could produce lasting therapeutic change in ways that existing treatments simply couldn't.",
        emotionalLabel: 'Awakening',
        targetNodeId: 'n13',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I started reading papers on my own and following new studies as they came out. The more I read, the harder it was to look away from how promising the results were, and how rigorous the best research had become.",
        emotionalLabel: 'Deep Research',
        targetNodeId: 'n12',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I realized then that I didn't just want to study these medicines. I wanted to be the doctor prescribing them and helping patients who aren't responding to existing treatments or traditional therapies. I went to medical school with that goal in mind.",
        emotionalLabel: 'Purpose',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "A Lunch & Learn at the State Capitol during my time in medical school helped define the trajectory of my training. I found out that some of the most important psychedelic research in the country was happening right at my own university. That made the field feel urgent in a way it hadn't before.",
        emotionalLabel: 'Urgency',
        targetNodeId: 'n18',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I learned about the Charmaine and Gordon McGill Center for Psychedelic Research and Therapy there, and it inspired me to pursue my residency in psychiatry.",
        emotionalLabel: 'Direction',
        targetNodeId: 'n19',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "Now, as a licensed psychiatrist, I sit across from patients with treatment-resistant depression, PTSD, and anxiety that have tried every medication a pharmacy can offer and are still suffering.",
        emotionalLabel: 'Frustration',
        targetNodeId: null,
        continueLabel: 'Next →',
      },
      {
        storyText:
          "I believe there are compounds that could reach these patients in ways that current treatments haven't and won't. And I'm hopeful that these psychedelic substances will be proven effective in clinical trials. Waiting for results is the hardest part of this work.",
        emotionalLabel: 'Advocacy',
        targetNodeId: 'n01',
        continueLabel: 'Next →',
      },
      {
        storyText:
          "So beyond my clinical practice, I advocate for the legal and clinical access to psychedelic medicine. I talk to policymakers about MDMA-assisted therapy for PTSD. I support psilocybin research for treatment-resistant depression. I try to move the conversation forward wherever I can. I believe access to these treatments is a matter of equity and compassion, not just science. The evidence is ready. I'm trying to help everything else get there too.",
        emotionalLabel: 'Mission',
        targetNodeId: 'n08',
        continueLabel: 'Reach the reflection →',
      },
    ],
  },
];

export const getPersonaById = (id: string) => personas.find((p) => p.id === id);
