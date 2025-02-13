import { FuzzyResult } from "@nozbe/microfuzz";

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
  hasImage: boolean | number;
};

type X = {
  name: string;
  birthPlace: string;
  profession: string;
  bio: string;
  cause: string;
};

export type MartyrInfo = {
  id: string;
  age: string;
  dob: string;
  bn: X;
  en: X;
};

export type SearchResults = FuzzyResult<{
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
  hasImage: boolean | number;
}>[];
