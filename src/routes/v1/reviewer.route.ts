import { Router } from 'express';

import ReviewerController from '../../controllers/reviewer.controller';
import catchAsyncErrors from '../../middlewares/asyncErrorHandler';

const router = Router();
const reviewerController = new ReviewerController();

router.post('/register', catchAsyncErrors(reviewerController.createReviewer));
router.put('/:reviewerId/update', catchAsyncErrors(reviewerController.updateReviewer));
router.delete('/:reviewerId/delete', catchAsyncErrors(reviewerController.deleteReviewer));
router.get('/:reviewerId/details', catchAsyncErrors(reviewerController.getReviewer));
router.get('/list', catchAsyncErrors(reviewerController.getAllReviewers));
router.get('/top-languages', catchAsyncErrors(reviewerController.getTopPrimaryLanguages));
router.get('/top-genres', catchAsyncErrors(reviewerController.getTopPreferredGenres));

export default router;
