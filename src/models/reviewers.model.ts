import mongoose, { Schema, Document } from 'mongoose';

export enum IGenre {
  selfHelp = 'selfHelp',
  productivity = 'productivity',
  fiction = 'fiction',
  nonFiction = 'nonFiction',
  health = 'health',
  science = 'science',
  business = 'business',
  personalDevelopment = 'personalDevelopment',
  spirituality = 'spirituality'
}

export enum Language {
  english = 'en',
  spanish = 'es',
  german = 'de',
  french = 'fr',
  italian = 'it',
  japanese = 'ja',
  korean = 'ko',
  chinese = 'zh'
}

export interface CreateReviewerDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  profileImage?: string;
  preferredGenres: IGenre[];
  primaryLanguage: Language;
  languages: Language[];
}

export interface IReviewer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  profileImage?: string;
  isVerified: boolean;
  verifiedAt: Date;
  preferredGenres: IGenre[];
  primaryLanguage: Language;
  languages: Language[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewerSchema = new Schema<IReviewer>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    bio: { type: String },
    profileImage: String,
    isVerified: { type: Boolean, default: false },
    verifiedAt: Date,
    preferredGenres: {
      type: [String],
      enum: Object.values(IGenre),
      required: true
    },
    primaryLanguage: {
      type: String,
      enum: Object.values(Language),
      required: true
    },
    languages: {
      type: [String],
      enum: Object.values(Language),
      required: true
    },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Reviewer = mongoose.model<IReviewer>('Reviewer', reviewerSchema);

export default Reviewer;
