import express from 'express';
import reviewer_ctrl from '../controllers/reviewer-ctrl.js';
//import { getReviewerById, getReviewers } from '../controllers/reviewer-ctrl.js';

const router = express.Router();

router.get('/secure/:id', reviewer_ctrl.getReviewerById);
router.get('/secure/', reviewer_ctrl.getAllReviewers); // get all mush be /
router.post('/', reviewer_ctrl.addReviewer);
router.post('/login', reviewer_ctrl.reviewerLogin);

export default router;