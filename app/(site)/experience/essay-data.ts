export type Essay = {
  slug: string;
  title: string;
  date: string;
  intro: string;
  hero?: string;
  heroAlt: string;
  sections: { heading: string; body: string; mediaLabel?: string; mediaSrc?: string; mediaAlt?: string }[];
};

export const essays: Essay[] = [
  {
    slug: "from-development-to-data-analysis",
    title: "From Development to Data Analysis",
    date: "October 2026",
    intro: "I started by building systems people could rely on. Now I am learning to ask what those systems can teach us.",
    hero: "/articles/article-hero-1.png",
    heroAlt: "A visual transition from software development structures into an analytics dashboard",
    sections: [
      {
        heading: "A change in the question",
        body: "Software development taught me to think about how things work: how a feature should behave, how data should move through a system, and how small decisions can affect the experience of the person using it. Data analysis began with a different question. Instead of asking only whether a system works, I started asking what its data was trying to tell me.",
        mediaSrc: "/articles/article-second-1.jpg",
        mediaAlt: "A thoughtful woman surrounded by software development notes and technical sketches on a chalkboard",
        mediaLabel: "Image placeholder · The shift from building to understanding",
      },
      {
        heading: "The skills that came with me",
        mediaSrc: "/articles/article-third-1.jpg",
        mediaAlt: "An abstract visualization of data being inspected, cleaned, and validated",
        body: "The move was not a complete reset. Working with software had already taught me to be precise, to understand relationships between parts, and to be suspicious of assumptions that had not been tested. Those habits became useful when I began cleaning datasets, checking definitions, and tracing an unexpected result back to its source.",
        mediaLabel: "Image placeholder · Skills carried across the transition",
      },
      {
        heading: "Learning to stay with the messy part",
        mediaSrc: "/articles/article-forth-1.jpg.jpg",
        mediaAlt: "A minimal typographic image displaying the word Conclusion",
        body: "The most valuable work often happens before a chart is made. It happens while deciding what a row represents, finding duplicated records, resolving inconsistent categories, and checking whether a pattern is real. Analysis has made me more comfortable with that uncertainty. The goal is not to make the data look impressive; it is to make the conclusion dependable.",
      },
      {
        heading: "Building and understanding belong together",
        mediaSrc: "/articles/article-fiveth-1.jpg",
        mediaAlt: "Interlocking construction bricks representing software, data, and continuous improvement",
        body: "The more I learn about analysis, the more connected it feels to development. Reliable software creates better conditions for reliable data, and useful analysis can reveal where a product or process needs to improve. I am interested in the space between those two practices: making things work, then learning how to make them more useful.",
        mediaLabel: "Image placeholder · Complexity becoming a clear insight",
      },
    ],
  },
  {
    slug: "novelty",
    title: "Novelty",
    date: "February 2026",
    intro: "A study of how small moments of surprise can make an interface feel more human and memorable.",
    hero: "/concept/From Chaos to Clarity.png",
    heroAlt: "Abstract composition representing clarity from chaos",
    sections: [
      { heading: "The premise", body: "Novelty does not need to be loud. In a digital product, it can be a change in rhythm, a responsive detail, or a visual cue that rewards attention without interrupting the task." },
      { heading: "Designing the pause", body: "The work explored how transitions and carefully timed feedback can create a sense of discovery. The aim was to make the interface feel considered while keeping the path through it obvious." },
      { heading: "What I learned", body: "The strongest moments came from restraint: one meaningful change at the right time was more effective than a page full of competing effects." },
    ],
  },
  {
    slug: "word-lookup",
    title: "Word Lookup",
    date: "January 2024",
    intro: "An exploration of making reference tools feel immediate, calm, and useful while someone is already in the flow of reading.",
    hero: "/concept/Sunlit UX Design Workspace.png",
    heroAlt: "UX design workspace in sunlight",
    sections: [
      { heading: "The problem", body: "Looking up a word often means leaving the context where the question appeared. That interruption creates friction and makes a small moment of curiosity feel expensive." },
      { heading: "The interaction", body: "Word Lookup focused on keeping definitions close to the source text, with a compact presentation that could be scanned quickly and dismissed without losing place." },
      { heading: "The result", body: "The concept treats reference as a layer rather than a destination: useful information appears when needed, then gets out of the way when the reader is ready to continue." },
    ],
  },
];

export function getEssay(slug: string) {
  return essays.find((essay) => essay.slug === slug);
}
