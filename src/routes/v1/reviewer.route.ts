import { Router } from 'express';

import ReviewerController from '../../controllers/reviewer.controller';
import catchAsyncErrors from '../../middlewares/asyncErrorHandler';

const router = Router();
const reviewerController = new ReviewerController();

router.post('/register', catchAsyncErrors(reviewerController.createReviewer));

export default router;
