import { FuzzyResult } from "@nozbe/microfuzz";

// Common language-specific fields
export interface LanguageContent {
  bn: string;
  en: string;
}

// Language-specific content structure for basic fields
export interface LanguageSpecificContent {
  name: string;
  profession: string;
  info: string;
}

// Extended language-specific content for MartyrInfo
export interface ExtendedLanguageContent extends LanguageSpecificContent {
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
  showIndex?: boolean;
};

// Updated Martyr interface to match your data structure
export interface Martyr {
  id: string;
  bn: any;
  en: any;
  date: string;
  hasImage: boolean;
}

// Full martyr information
export type MartyrInfo = {
  id: string;
  age: string;
  dob: string;
  bn: ExtendedLanguageContent;
  en: ExtendedLanguageContent;
};

// Search results type
export type SearchResults = FuzzyResult<Martyr>[];