import type { AtlasNode } from '../types';

// SVG coordinate space: 1000 × 620
// Continent centers: personal-narrative (180,160) · science (480,310) · history (790,152)
//                   indigenous-knowledge (222,442) · harm-reduction (648,460) · literacy-island (1350,820)

export const nodes: AtlasNode[] = [

  // ── History ─────────────────────────────────────────────────────────────────

  {
    id: 'n01',
    continentId: 'history',
    nodeType: 'immersive' as const,
    title: 'Psychedelics, Laws, and Policies',
    keyInsight: 'From DARE to the Controlled Substances Act to Texas Senate Bill 2308, this exhibit is a timeline of key U.S. and Texas laws and policies that have shaped how psychedelics are perceived and regulated.',
    position: { x: 770, y: 140 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'The legal history of psychedelics in the United States did not emerge from a neutral place. From the Controlled Substances Act of 1970 to DARE programs in schools to recent state-level reform, laws and policies have shaped what people think, what researchers are permitted to study, and who gets to speak on the subject at all.',
        'The U.S. Food and Drug Administration has granted Breakthrough Therapy designation to some psychedelic compounds such as [psilocybin](https://med.uth.edu/psychiatry/2024/06/03/fda-grants-breakthrough-therapy-designation-to-cyb003-a-deuterated-psilocybin-analog-being-investigated-as-an-adjunctive-treatment-for-major-depressive-disorder-mdd/), signaling growing clinical interest. At the state level, Oregon and Colorado have passed measures to create regulated access to psilocybin services. In Texas, [Texas House Bill 1802](https://www.t4gmh.com/history) funded research into psychedelic therapies for veterans, marking a notable shift in public investment.',
        'At the same time, rising mental health needs, particularly among veterans and first responders, have renewed attention on treatment gaps and contributed to growing momentum for policy reconsideration.',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n17',
    continentId: 'history',
    nodeType: 'immersive' as const,
    title: 'Hallo from Albert Hofmann',
    keyInsight: 'Albert Hofmann synthesized LSD and isolated psilocybin — but the same era includes the story of Maria Sabina, whose sacred ceremony was exploited by a Western outsider, triggering commercialization that devastated her community.',
    position: { x: 834, y: 115 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Albert Hofmann first synthesized LSD in 1938 and later isolated psilocybin from mushrooms in 1959, two milestones that fundamentally shaped the modern history of psychedelics. Both discoveries began with his work at Sandoz Laboratories in Switzerland.',
        "But that same era includes a more troubling story. In 1955, American banker R. Gordon Wasson gained access to a sacred Mazatec mushroom ceremony by deceiving the sabia Maria Sabina, then published a widely read account in Life magazine without the community's consent. The commercialization that followed devastated Sabina and her community: outsiders flooded her village, her house was burned down, her son was killed, and she was briefly jailed. The spread of psychedelic knowledge has not always occurred through ethical means.",
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n18',
    continentId: 'history',
    nodeType: 'standard' as const,
    title: 'Learn More: Texans for Greater Mental Health',
    keyInsight: 'A Texas nonprofit whose advocacy helped pass the first publicly funded psychedelic research bill since the Controlled Substances Act, inspiring similar efforts in five other states and unlocking nearly $100 million in research funding nationally.',
    position: { x: 822, y: 160 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Texans for Greater Mental Health (T4GMH) is a Texas nonprofit expanding access to psychedelic-assisted treatment through advocacy and research funding. Their monthly Lunch and Learns at the State Capitol connect lawmakers directly with researchers and clinicians.',
        "T4GMH's advocacy helped pass Texas House Bill 1802 in 2021 — the first publicly funded psychedelic research bill since the Controlled Substances Act. Five other states and the federal government have since followed, collectively unlocking nearly $100 million in research funding nationwide.",
      ],
    },
    crossLinks: [],
  },

  // ── Science ──────────────────────────────────────────────────────────────────

  {
    id: 'n02',
    continentId: 'science',
    nodeType: 'callout' as const,
    title: 'Did You Know...',
    keyInsight: 'Veterans and first responders experience PTSD at rates far higher than the general population, pointing to an urgent gap in effective mental health treatment.',
    position: { x: 440, y: 272 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Veterans and first responders experience PTSD at far higher rates than the general population. At least 7% of veterans will develop PTSD in their lifetime (U.S. Department of Veterans Affairs); roughly 30% of first responders will experience it at some point (SAMHSA).',
        'These numbers represent people who have tried conventional treatments — therapy, medication, peer support — and found them insufficient. That gap has made veterans and first responders a central focus of psychedelic research, where early trials test whether compounds like MDMA and psilocybin can help.',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n06',
    continentId: 'science',
    nodeType: 'standard' as const,
    title: 'Learn More: Psychedelics & Addiction',
    keyInsight: 'Psychedelics are non-addictive, and early research suggests they may help people overcome alcohol, tobacco, and opioid addiction, though results remain promising rather than conclusive.',
    position: { x: 530, y: 278 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'It might seem counterintuitive that psychedelics — often discussed in the context of drug policy and harm — could help people overcome addiction to other substances. But early research suggests that may be exactly the case.',
        'Psilocybin and LSD have both been studied for their potential to reduce alcohol and tobacco dependence, with results that have surprised some researchers. Ibogaine, derived from a Central African shrub, has shown early promise in addressing opioid withdrawal and use disorder. Ketamine-assisted therapy is being tested for both depression and addiction. Psychedelics are not considered addictive substances, and some researchers believe their ability to produce significant shifts in perspective is part of what makes them worth studying in this context. Results remain promising but preliminary; the research is ongoing.',
        'Want to read more? Check out this research paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC10291338/',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n11',
    continentId: 'science',
    nodeType: 'immersive' as const,
    title: "POV: You're a molecule of DMT",
    keyInsight: 'DMT is a naturally occurring compound found in humans, plants, and animals, used ceremonially for centuries, and still being studied for how it produces its profound effects.',
    position: { x: 548, y: 316 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'N,N-Dimethyltryptamine (DMT) is a psychedelic compound found not only in many plants and animals but also in the human body itself. Its presence across living systems, and its long history of ceremonial use across multiple cultures, have made it one of the most intriguing and actively studied psychedelic compounds.',
        'Exactly how DMT produces its psychedelic effects is still being worked out by researchers. It acts on serotonin receptors, among other systems, but the full picture of its pharmacology remains incomplete. What is known is that humans have been using DMT-containing plants — in preparations like ayahuasca — for hundreds of years. Its natural presence in the body has prompted scientific curiosity about what role, if any, it plays in ordinary human biology.',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n12',
    continentId: 'science',
    nodeType: 'standard' as const,
    title: 'Learn More: Psychedelic Research',
    keyInsight: 'Rigorous clinical trials at Johns Hopkins and the Fonzo Lab at UT Austin are testing how psilocybin, LSD, ibogaine, and ayahuasca can treat depression, PTSD, and addiction, with a particular focus on combat veterans.',
    position: { x: 488, y: 354 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'After decades of near-total restriction following the Controlled Substances Act, rigorous psychedelic research has returned to mainstream science. Institutions including [Johns Hopkins University](https://www.hopkinspsychedelic.org/) and [the Fonzo Lab](https://sites.utexas.edu/fonzolab/) at UT Austin are now running clinical trials that meet the same standards as pharmaceutical drug studies.',
        "Johns Hopkins researchers are studying how psilocybin-assisted therapy can address depression, PTSD, and addiction in randomized controlled trials. [The Fonzo Lab](https://sites.utexas.edu/fonzolab/) at UT Austin is conducting studies involving psilocybin, LSD, ibogaine, and ayahuasca, with a particular focus on combat veterans. Texas-based research is part of a national wave of renewed scientific interest, one producing findings with real clinical implications.",
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n13',
    continentId: 'science',
    nodeType: 'immersive' as const,
    title: "POV: You're a molecule of psilocybin",
    keyInsight: 'Psilocybin is produced by over 200 mushroom species. Once in the body, it converts to psilocin and acts on serotonin receptors, making it a subject of serious clinical research for depression, PTSD, and addiction.',
    position: { x: 418, y: 316 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Psilocybin is produced by more than 200 species of mushrooms found across the globe, from tropical regions to the Pacific Northwest. Once ingested, it is rapidly converted in the body to psilocin, which acts primarily on serotonin receptors in the brain to produce its psychedelic effects.',
        'Humans have used psilocybin-containing mushrooms for thousands of years across many cultures. In recent decades, scientists have returned to studying it in clinical settings as a potential treatment for depression, PTSD, addiction, and other conditions. Its measurable biological mechanisms and natural origin make it one of the most thoroughly researched psychedelic compounds in current clinical trials.',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n19',
    continentId: 'science',
    nodeType: 'callout' as const,
    title: 'Learn More: The Charmaine and Gordon McGill Center for Psychedelic Research and Therapy',
    keyInsight: "UT Austin's McGill Center researches psychedelic-assisted therapy for depression, PTSD, and substance use, with a particular focus on military veterans and AI-personalized care.",
    position: { x: 480, y: 268 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        "The Charmaine and Gordon McGill Center for Psychedelic Research and Therapy at UT Austin's Dell Medical School conducts clinical research into psychedelic-assisted therapy, focusing on depression, anxiety, PTSD, and substance use disorders.",
        'The center particularly focuses on military veterans and survivors of childhood trauma, populations with high rates of treatment-resistant conditions. Researchers study the mechanisms underlying treatment effects and are developing AI tools to help clinicians personalize care.',
      ],
    },
    crossLinks: [],
  },

  // ── Harm Reduction ───────────────────────────────────────────────────────────

  {
    id: 'n03',
    continentId: 'harm-reduction',
    nodeType: 'callout' as const,
    title: 'Did You Know...',
    keyInsight: 'A trained guide supports individuals before, during, and after a psychedelic experience, and having that support is considered just as important as the substance itself.',
    position: { x: 612, y: 428 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'A trained guide supports individuals throughout a psychedelic experience, clarifying intentions beforehand, staying present during the session, and supporting integration afterward. In both clinical and ceremonial contexts, the guide is considered as important as the substance itself.',
        'Psychedelic experiences can surface unexpected emotions and memories. A skilled guide helps individuals navigate difficult moments and make meaning afterward. Preparation sets the foundation; integration after helps make what surfaced lasting. Psychedelic therapy is not simply a matter of taking a compound — it is a structured, relational process.',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n05',
    continentId: 'harm-reduction',
    nodeType: 'standard' as const,
    title: 'Learn More: Set, Setting, Integration',
    keyInsight: "Whether a psychedelic experience is difficult or transformative often comes down to three factors: your mindset going in, the environment around you, and the work you do afterward.",
    position: { x: 694, y: 438 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Whether a psychedelic experience is difficult or transformative often comes down to three factors: your mindset going in, the environment around you, and how much time and attention you give to processing it afterward. These are not peripheral concerns — they are central to what responsible and meaningful psychedelic use looks like.',
        'Set refers to your inner state before the experience: your intentions, emotional readiness, and any unresolved tensions you bring into it. Setting refers to the physical environment and the people around you during the session. Integration is the work you do afterward in conversation, journaling, therapy, or reflection to understand and apply what surfaced.',
        '[Research](https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2021.619890/full) and [practice](https://spectrumpsychwa.com/wp-content/uploads/2025/04/MAPS-Integration-Workbook.pdf) consistently point to all three as key determinants of outcome. ',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n09',
    continentId: 'harm-reduction',
    nodeType: 'standard' as const,
    title: 'Learn More: Risks',
    keyInsight: 'Psychedelics carry genuine psychological risks that vary by person, dose, and context, especially for people with certain mental health histories or those using in unsafe settings.',
    position: { x: 666, y: 494 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Psychedelics carry genuine psychological risks. While they are generally considered low in physical toxicity, the risks of a difficult or harmful experience are real, and they vary significantly based on the person, the dose, the substance, and the context.',
        'People with a personal or family history of schizophrenia, bipolar disorder, or certain other psychiatric conditions are advised to avoid psychedelics, as these compounds can trigger or amplify symptoms. High doses, impure substances, poor preparation, or an unsafe environment increase the likelihood of a distressing experience for anyone. In clinical settings, screening and preparation processes exist specifically to reduce these risks. Taking psychedelics in unsupported or uncontrolled settings removes many of the safeguards that clinical research has identified as important.',
        'Check out the UC Berkeley Center for the Science of Psychedelics for more information: https://psychedelics.berkeley.edu/understanding-risk/',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n14',
    continentId: 'harm-reduction',
    nodeType: 'immersive' as const,
    title: 'Set the Mood',
    keyInsight: 'Intentional preparation including music and environment is considered important for psychedelic experiences, and small acts like curating a playlist can meaningfully shape them.',
    position: { x: 616, y: 472 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'The environment in which a psychedelic experience takes place matters. Lighting, temperature, sound, and the presence or absence of other people all contribute to what kind of inner territory opens up. Preparing these conditions intentionally is itself a form of care.',
        'Music has become a well-studied element of psychedelic therapy — specific playlists are used in clinical trials to guide emotional tone and support the arc of the session. Research suggests that music can help people move through difficult moments and access deeper emotional material. Thinking through your physical environment and intentions in advance is not excessive caution, it is the foundational work of a thoughtful experience.',
      ],
    },
    crossLinks: [],
  },

  // ── Indigenous Knowledge ──────────────────────────────────────────────────────

  {
    id: 'n04',
    continentId: 'indigenous-knowledge',
    nodeType: 'immersive' as const,
    title: 'Meet the Organisms',
    keyInsight: 'Psychedelic compounds like psilocybin, DMT, ibogaine, and mescaline emerge from living organisms that have coexisted with humans for thousands of years.',
    position: { x: 196, y: 408 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Psychedelic compounds like psilocybin, DMT, ibogaine, and mescaline are not synthetic inventions. They are produced by living organisms — mushrooms, toads, plants, shrubs, and cacti — that have coexisted with humans for thousands of years and continue to play central roles in ceremonial and spiritual practices across many cultures.',
        'Psilocybin is produced by over 200 species of mushrooms distributed across much of the world. DMT occurs naturally in many plant species and in the human body. Ibogaine comes from the root bark of the iboga shrub, native to Central Africa. Mescaline is found in peyote and several other cacti with long roots in indigenous North American traditions. These are organisms with evolutionary histories, and in many communities, with profound cultural significance.',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n10',
    continentId: 'indigenous-knowledge',
    nodeType: 'standard' as const,
    title: 'Learn More: Ayahuasca Ceremonies',
    keyInsight: 'Ayahuasca ceremonies are sacred practices with deep roots across Central and South America, conducted for centuries under the guidance of trained healers who sing sacred songs to guide participants.',
    position: { x: 258, y: 420 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Ayahuasca ceremonies are sacred practices with spiritual and cultural roots across Central and South America, maintained within indigenous communities for centuries. They are not recreational events — they are structured, guided experiences held within a framework of tradition and responsibility.',
        'Among the Shipibo people of the Peruvian Amazon, ceremonies are conducted by a trained healer called a curandero or onanya. The healer sings icaros — sacred songs — that are central to guiding participants through the experience and understood as a form of medicine in their own right. These traditions have been passed down across generations, and approaching them with respect for their cultural origin is considered an ethical baseline by researchers and practitioners alike.',
        'Observe an ayahuasca ceremony as seen in Shipibo tradition: https://www.youtube.com/watch?v=dl2cbk_-zm4',
        'Read about the ayahuasca ceremony experience: https://pmc.ncbi.nlm.nih.gov/articles/PMC8034606/',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n16',
    continentId: 'indigenous-knowledge',
    nodeType: 'standard' as const,
    title: 'Learn more: Hikuri (Peyote) Traditions and Conservation',
    keyInsight: 'Hikuri (peyote) is the most sacred plant of the Wixarika people — and its declining population due to overuse has prompted urgent conservation work by the community.',
    position: { x: 246, y: 472 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Hikuri, commonly known as peyote, is the most sacred plant of the [Wixarika people of Mexico](https://mattreichel.com/work/peyote-pilgrimage-to-wirikuta). For generations, the Wixarika have made pilgrimages to Wirikuta, a remote sacred desert, to harvest hikuri for religious ceremonies that are central to their cultural and spiritual identity.',
        'In recent years, peyote populations have been declining due to overharvesting and habitat loss. The Wixarika community has responded by developing and pursuing active conservation plans to protect this plant. The situation reflects a broader tension between the growing global interest in psychedelic plants and the communities for whom those plants hold irreplaceable cultural meaning. Conservation here is not only an ecological question — it is a question of cultural survival.',
      ],
    },
    crossLinks: [],
  },

  // ── Personal Narrative ────────────────────────────────────────────────────────

  {
    id: 'n07',
    continentId: 'personal-narrative',
    nodeType: 'standard' as const,
    title: 'Learn More: Veteran Stories',
    keyInsight: 'Veterans Exploring Treatment Solutions (VETS) connects veterans with psychedelic-assisted therapy through grants, community support, and policy advocacy, addressing an urgent gap in veteran mental health care.',
    position: { x: 148, y: 132 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Veterans Exploring Treatment Solutions (VETS) is a nonprofit dedicated to ending veteran suicide by connecting veterans with psychedelic-assisted therapy through grants, education, and community support. The organization also funds scientific research and advocates for policy changes that would expand legal access to these treatments.',
        'Veteran suicide and treatment-resistant PTSD remain serious, undertreated public health issues in the United States. VETS was founded in response to the gap between the scale of that problem and the limitations of currently available care. Their work spans direct support for individual veterans, funding for researchers studying psychedelic therapy, and engagement with policymakers who can change what treatments are legally available.',
        'Read more about VETS at: https://vetsolutions.org',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n08',
    continentId: 'personal-narrative',
    nodeType: 'immersive' as const,
    title: 'Story, Story, Story',
    keyInsight: "Personal narratives from veterans, caregivers, patients, and clinicians offer perspectives that clinical data alone cannot capture; each story reflects one individual's experience, not a guaranteed result.",
    position: { x: 216, y: 144 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Personal narratives offer something that clinical data cannot: the texture of what it actually feels like to navigate mental health and treatment. This space brings together stories from veterans, caregivers, patients, and others whose lives have intersected with psychedelic-assisted care, shared in their own words and on their own terms.',
        "The stories here reflect a wide range of experiences, backgrounds, and relationships to psychedelics. Some are accounts of significant recovery; others are more ambivalent or ongoing. Each story represents one individual's experience — not a universal result or a recommendation. Taken together, they offer a fuller picture of what is happening at the intersection of mental health, psychedelic research, and human life.",
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n15',
    continentId: 'personal-narrative',
    nodeType: 'callout' as const,
    title: 'Did you know...',
    keyInsight: 'Many Americans live with depression without ever receiving a formal diagnosis — in one study, only 39% of adults with depression symptoms had been told by a doctor they had the condition.',
    position: { x: 185, y: 210 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Many Americans experience depression without a formal diagnosis. In a study of 200 adults, only 39% had been told by a doctor they had depression — yet nearly half scored moderate to severe on standardized screening.',
        'The diagnosis gap reflects real barriers: limited care access, cultural stigma, cost, and many people not recognizing their own symptoms. Undiagnosed depression is a widespread public health concern, disproportionately affecting communities with less access to mental health services.',
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n20',
    continentId: 'personal-narrative',
    nodeType: 'immersive' as const,
    title: 'Leave a Story',
    keyInsight: 'Sharing your experience — even a small part of it — is a way of contributing to a larger conversation about psychedelics and mental health.',
    position: { x: 148, y: 182 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        'Stories shape understanding in ways that statistics and research alone cannot. This space invites visitors to leave a short personal reflection — about their own mental health, their encounters with psychedelics, or simply their reason for coming to this atlas — to contribute to a broader, ongoing conversation.',
        'You do not need to have had a psychedelic experience to leave something here. A thought about mental health care, a question you are sitting with, or a word that resonates with where you are right now is enough. What you share becomes part of what other visitors encounter after you.',
      ],
    },
    crossLinks: [],
  },

  // ── Literacy Island ───────────────────────────────────────────────────────────

  {
    id: 'n21',
    continentId: 'literacy-island',
    nodeType: 'standard' as const,
    gardenLink: true as const,
    title: 'Meet the masterminds behind this awesome project',
    keyInsight: 'Meet the three graduate students behind the Psychedelic Atlas, working to reimagine how people learn about mental health and psychedelics in partnership with Texans for Greater Mental Health to make psychedelic education more accessible and honest.',
    position: { x: 1340, y: 810 },
    interaction: {
      type: 'scroll-narrative',
      paragraphs: [
        "The Psychedelic Literacy Project was created by Natasha Gengler, Kaitlyn Gehrman, and Alice Qiu, three graduate students in UT Austin's MA in Design Focused on Health program, in partnership with [Texans for Greater Mental Health](https://www.t4gmh.com/).",
        'The project is designed to make psychedelic education more accessible, honest, and grounded in real human experiences. It draws together scientific research, historical context, Indigenous knowledge, personal narrative, and harm reduction into a single navigable space, built for people who are curious but unsure where to start and to provide a clearer way of seeing, more context, more support, and more confidence in deciding what matters to them.',
        'Our hope for the Psychedelics Atlas is that it becomes a starting point for that shift. A place where whatever word first came to mind can evolve into something more informed, more connected, and a little less uncertain.'
      ],
    },
    crossLinks: [],
  },

  {
    id: 'n22',
    continentId: 'literacy-island',
    nodeType: 'immersive' as const,
    gardenLink: true as const,
    title: '???',
    keyInsight: 'A hidden place. Some things cannot be described.',
    position: { x: 1356, y: 828 },
    interaction: { type: 'scroll-narrative', paragraphs: ['A hidden place. Some things cannot be described.'] },
    crossLinks: [],
  },

];

export const getNodeById = (id: string) => nodes.find((n) => n.id === id);

export const getNodesByContinent = (continentId: string) =>
  nodes.filter((n) => n.continentId === continentId);
