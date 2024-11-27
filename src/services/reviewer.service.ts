import bcrypt from 'bcrypt';
import { CreateReviewerDto } from '../models/reviewers.model';
import Reviewer from '../models/reviewers.model';
import { DuplicateResourceError } from '../utils/customError.util';

class ReviewerService {
  async createReviewer(data: CreateReviewerDto) {
    const reviewerExists = await Reviewer.findOne({ email: data.email });

    if (reviewerExists) {
      throw new DuplicateResourceError('Reviewer already exists');
    }

    const { password, primaryLanguage, languages, ...rest } = data;

    const hashedPassword = await bcrypt.hash(password!, 10);

    let otherLanguages = languages.length ? languages : [primaryLanguage];
    otherLanguages = Array.from(new Set(otherLanguages));

    const reviewer = await Reviewer.create({
      ...rest,
      password: hashedPassword,
      primaryLanguage,
      languages: otherLanguages
    });
    return { reviewer };
  }
}

export default ReviewerService;
