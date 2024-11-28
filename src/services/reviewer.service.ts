import moment from 'moment';
import bcrypt from 'bcrypt';
import { CreateReviewerDto, UpdateReviewerDto } from '../models/reviewers.model';
import Reviewer from '../models/reviewers.model';
import { DuplicateResourceError, NotFoundError } from '../utils/customError.util';
import { PaginationOptions, QueryParams } from '../@types';

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

  async updateReviewer(reviewerId: string, data: UpdateReviewerDto) {
    const reviewer = await Reviewer.findById(reviewerId);

    if (!reviewer || reviewer.isDeleted) {
      throw new NotFoundError('Reviewer not found');
    }

    const { preferredGenres, languages, ...rest } = data;

    const updateParams: any = {
      ...rest
    };

    if (preferredGenres?.length) {
      updateParams.preferredGenres = Array.from(new Set(preferredGenres));
    }

    if (languages?.length) {
      const allLanguages = [reviewer.primaryLanguage, ...languages];
      updateParams.languages = Array.from(new Set(allLanguages));
    }

    const updatedReviewer = await Reviewer.findByIdAndUpdate(reviewerId, updateParams, {
      new: true
    });

    return { reviewer: updatedReviewer };
  }

  async deleteReviewer(reviewerId: string) {
    const reviewer = await Reviewer.findById(reviewerId);

    if (!reviewer) {
      throw new NotFoundError('Reviewer not found');
    }

    await Reviewer.findByIdAndUpdate(reviewerId, { isDeleted: true });

    return { reviewerId };
  }

  async getReviewer(reviewerId: string) {
    const reviewer = await Reviewer.findById(reviewerId);

    if (!reviewer || reviewer.isDeleted) {
      throw new NotFoundError('Reviewer not found');
    }

    return { reviewer };
  }

  async getAllReviewers(paginationOptions: PaginationOptions, filter: QueryParams) {
    const query: any = {};

    if (filter.search) {
      query.$or = [
        { firstName: { $regex: filter.search, $options: 'i' } },
        { lastName: { $regex: filter.search, $options: 'i' } },
        { email: { $regex: filter.search, $options: 'i' } }
      ];
    }

    if (filter.startDate && filter.endDate) {
      query.createdAt = { $gte: moment(filter.startDate).toDate(), $lte: moment(filter.endDate).toDate() };
    }

    if (filter.status) {
      query.status = filter.status;
    }

    if (filter.language) {
      query.languages = { $in: [filter.language] };
    }

    const reviewers = await Reviewer.find(
      query,
      {},
      {
        skip: paginationOptions.skip,
        limit: paginationOptions.limit,
        sort: {
          createdAt: -1
        }
      }
    );

    const total = await Reviewer.countDocuments(query);

    return { reviewers, total };
  }
}

export default ReviewerService;
