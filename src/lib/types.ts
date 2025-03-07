import { FuzzyResult } from "@nozbe/microfuzz";

// Extended language-specific content for MartyrInfo
export interface LanguageSpecificContent {
  name: string;
  profession: string;
  info: string;
  birthPlace: string;
  bio: string;
  cause: string;
}

// Profile with single language
export type ProfileType = {
  id: string;
  name: string;
  profession: string;
  info: string;
  martyrDate: string;
  imageUrl?: string;
  index?: number;
  lang: "bn" | "en";
  show?: boolean;
};

// Updated Martyr interface to match your data structure
export interface Martyr {
  id: string;
  bn: any;
  en: any;
  date: string;
  verified: boolean;
  show: boolean;
  hasImage: boolean;
}

// Full martyr information
export type MartyrInfo = {
  id: string;
  age: string;
  dob: string;
  bn: LanguageSpecificContent;
  en: LanguageSpecificContent;
};

// Search results type
export type SearchResults = FuzzyResult<Martyr>[];
