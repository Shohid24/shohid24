import { FuzzyResult } from "@nozbe/microfuzz";
import { ObjectId } from "mongoose";

// Common language-specific fields
export interface LanguageContent {
  bn: string;
  en: string;
}

// Common bilingual fields for various user types
export interface BilingualFields {
  name: LanguageContent;
  profession: LanguageContent;
  info: LanguageContent;
}

// Language-specific content structure
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

// Basic martyr data
export interface Martyr extends BilingualFields {
  id: string;
  date: string;
  hasImage: boolean | number;
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
