import { RequestHandler } from 'express';
import { sendResponse } from '../utils/customResponse.util';
import { handleValidationError, validateQueryId } from '../validators';
import { createReviewerValidator, updateReviewerValidator } from '../validators/reviewer.validator';
import ReviewerService from '../services/reviewer.service';
import { paginationUtils } from '../utils/pagination.util';
import { QueryParams } from '../@types';

const reviewerService = new ReviewerService();

class ReviewerController {
  createReviewer: RequestHandler = async (req, res) => {
    const { error } = createReviewerValidator(req.body);
    if (error) return handleValidationError(error);
    const reviewer = await reviewerService.createReviewer(req.body);
    return sendResponse({
      res,
      statusCode: 201,
      data: reviewer,
      message: 'Reviewer created successfully'
    });
  };

  updateReviewer: RequestHandler = async (req, res) => {
    const { reviewerId } = req.params;

    const { error: invalidId } = validateQueryId({ id: reviewerId });

    if (invalidId) return handleValidationError(invalidId);

    const { error } = updateReviewerValidator(req.body);

    if (error) return handleValidationError(error);

    const reviewer = await reviewerService.updateReviewer(reviewerId, req.body);

    return sendResponse({
      res,
      statusCode: 200,
      data: reviewer,
      message: 'Reviewer updated successfully'
    });
  };

  deleteReviewer: RequestHandler = async (req, res) => {
    const { reviewerId } = req.params;
    const { error: invalidId } = validateQueryId({ id: reviewerId });
    if (invalidId) return handleValidationError(invalidId);
    const deletedReviewer = await reviewerService.deleteReviewer(reviewerId);
    return sendResponse({
      res,
      statusCode: 200,
      data: deletedReviewer,
      message: 'Reviewer deleted successfully'
    });
  };

  getReviewer: RequestHandler = async (req, res) => {
    const { reviewerId } = req.params;
    const { error: invalidId } = validateQueryId({ id: reviewerId });
    if (invalidId) return handleValidationError(invalidId);
    const reviewer = await reviewerService.getReviewer(reviewerId);
    return sendResponse({
      res,
      statusCode: 200,
      data: reviewer,
      message: 'Reviewer fetched successfully'
    });
  };

  getAllReviewers: RequestHandler = async (req, res) => {
    const { page, limit } = req.query as QueryParams;
    const paginationOptions = paginationUtils.paginateData(page, limit);

    const { reviewers, total } = await reviewerService.getAllReviewers(
      paginationOptions,
      req.query
    );

    const totalPages = paginationUtils.totalPages(total, paginationOptions.limit);

    const pagination = {
      current: paginationOptions.currentPage,
      number_of_pages: totalPages,
      per_page: paginationOptions.limit,
      next: paginationUtils.nextPage(paginationOptions.currentPage, totalPages)
    };

    const message = total > 0 ? 'Reviewers fetched successfully' : 'No reviewers found';

    return sendResponse({
      res,
      statusCode: 200,
      data: { reviewers, total, pagination },
      message
    });
  };
}

export default ReviewerController;
