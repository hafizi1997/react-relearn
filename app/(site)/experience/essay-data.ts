export type Essay = {
  slug: string;
  title: string;
  date: string;
  intro: string;
  hero: string;
  heroAlt: string;
  sections: { heading: string; body: string }[];
};

export const essays: Essay[] = [
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
