import { RequestHandler } from 'express';
import { sendResponse } from '../utils/customResponse.util';
import { handleValidationError } from '../validators';
import { createReviewerValidator } from '../validators/reviewer.validator';
import ReviewerService from '../services/reviewer.service';

const reviewerService = new ReviewerService();

class ReviewerController {
  createReviewer: RequestHandler = async (req, res) => {
    const { error, value: data } = createReviewerValidator(req.body);
    if (error) return handleValidationError(error);
    const reviewer = await reviewerService.createReviewer(req.body);
    return sendResponse({
      res,
      statusCode: 201,
      data: reviewer,
      message: 'Reviewer created successfully'
    });
  };
}

export default ReviewerController;
