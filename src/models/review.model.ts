import mongoose, { Schema, Document } from 'mongoose';
import { IGenre } from './reviewers.model';

export interface IReview extends Document {
  bookId: string;
  bookName: string;
  rating: number;
  review: string;
  reviewerId: Schema.Types.ObjectId;
  votesReceived: {
    positive: number;
    negative: number;
  };
  genre: IGenre;
  reviewDate: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    bookId: { type: String, required: true },
    bookName: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    reviewerId: { type: Schema.Types.ObjectId, ref: 'Reviewer', required: true },
    votesReceived: {
      positive: { type: Number, default: 0 },
      negative: { type: Number, default: 0 }
    },
    genre: { type: String, enum: Object.values(IGenre), required: true },
    reviewDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
