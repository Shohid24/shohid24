import mongoose, { Schema, Document, model, models } from "mongoose";

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
  hasImage: boolean | number;
  bn: LanguageInfo;
  en: LanguageInfo;
  gender: string;
  lastUpdated: Date | null;
  verified: boolean;
  verifiedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true },
    date: { type: String, required: true },
    age: { type: String, required: true },
    dob: { type: String, default: "" },
    hasImage: { type: Boolean, default: false },
    bn: {
      name: { type: String, required: true },
      birthPlace: { type: String, required: true },
      profession: { type: String, required: true },
      info: { type: String, required: true },
      bio: { type: String, required: true },
      cause: { type: String, required: true },
    },
    en: {
      name: { type: String, required: true },
      birthPlace: { type: String, required: true },
      profession: { type: String, required: true },
      info: { type: String, required: true },
      bio: { type: String, required: true },
      cause: { type: String, required: true },
    },
    gender: { type: String, default: "male" },
    lastUpdated: { type: Date, default: null },
    verified: { type: Boolean, default: false },
    verifiedBy: { type: [String], default: [] },
  },
  { timestamps: true, collection: "individual" },
);

export default models.User || model<IUser>("User", UserSchema);
