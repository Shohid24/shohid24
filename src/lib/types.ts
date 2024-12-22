export type ProfileType = {
  id: string;
  name: string;
  profession: string;
  info: string;
  martyrDate: string;
  imageUrl?: string;
  index?: number;
  lang: "bn" | "en";
  showIndex?: boolean;
};
export type Martyr = {
  id: string;
  name: {
    bn: string;
    en: string;
  };
  profession: {
    bn: string;
    en: string;
  };
  info: {
    bn: string;
    en: string;
  };
  date: string;
  hasImage: number;
};

type X = {
  name: string;
  age: string;
  born: string;
  birthPlace: string;
  profession: string;
  bio: string;
  cause: {
    short: string;
    long: string;
  };
};

export type MartyrInfo = {
  id: string;
  age: string;
  bn: X;
  en: X;
};
