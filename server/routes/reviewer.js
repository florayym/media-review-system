import express from 'express';
import reviewer_ctrl from '../controllers/reviewer-ctrl.js';
//import { getReviewerById, getReviewers } from '../controllers/reviewer-ctrl.js';

const router = express.Router();

router.get('/:id', reviewer_ctrl.getReviewerById);
router.get('/', reviewer_ctrl.getReviewers); // get all mush be /
router.post('/', reviewer_ctrl.addReviewer);

export default router;