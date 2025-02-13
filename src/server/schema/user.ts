import { Schema, Document, model, models } from "mongoose";

interface LanguageInfo {
  name: string;
  birthPlace: string;
  profession: string;
  info: string;
  bio: string;
  cause: string;
}

export interface IUser extends Document {
  id: string;
  date: string;
  age: string;
  dob: string;
  image: string;
  bn: LanguageInfo;
  en: LanguageInfo;
  gender: string;
  lastUpdated: Date | null;
  verified: boolean;
  show: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true },
    date: { type: String, required: true },
    age: { type: String },
    dob: { type: String, default: "" },
    image: {
      type: String,
      default: "https://f9b5a133.shohid24.pages.dev/default.jpg",
    },
    bn: {
      name: { type: String, required: true },
      birthPlace: { type: String },
      profession: { type: String },
      info: { type: String },
      bio: { type: String },
      cause: { type: String },
    },
    en: {
      name: { type: String, required: true },
      birthPlace: { type: String },
      profession: { type: String },
      info: { type: String },
      bio: { type: String },
      cause: { type: String },
    },
    gender: { type: String, default: "male" },
    lastUpdated: { type: Date, default: null },
    verified: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
  },
  { collection: "individual" },
);

export default models.User || model<IUser>("User", UserSchema);
