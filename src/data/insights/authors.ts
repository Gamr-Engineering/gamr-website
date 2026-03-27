export interface Author {
  name: string;
  slug: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const authors: Record<string, Author> = {
  "williams-falodun": {
    name: "Williams Falodun",
    slug: "williams-falodun",
    bio: "Williams Falodun is a storyteller focused on African gaming culture, identity, and the evolving ecosystem shaping the next generation of creators.",
    avatar: "/assets/authors/williams-falodun.png",
    social: {
      twitter: "https://twitter.com/williamsfalodun",
      linkedin: "https://linkedin.com/in/williamsfalodun"
    }
  },
  "emmanuel-oyalabu": {
    name: "Emmanuel Oyalabu",
    slug: "emmanuel-oyalabu",
    bio: "Emmanuel is a tech enthusiast and esports researcher dedicated to documenting the growth of gaming infrastructure across Africa.",
    social: {}
  },
  "oladapo-dosekun": {
    name: "Oladapo Dosekun",
    slug: "oladapo-dosekun",
    bio: "Oladapo is a logistics and operations expert focusing on the scale and impact of large-scale gaming festivals in emerging markets.",
    social: {}
  },
  "gamr-editorial": {
    name: "Gamr Editorial",
    slug: "gamr-editorial",
    bio: "The official editorial voice of Gamr Africa, bringing you the latest news, case studies, and deep dives into the gaming ecosystem.",
    social: {}
  }
};
