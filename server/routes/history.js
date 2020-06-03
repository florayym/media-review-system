import express from 'express';
import history_ctrl from '../controllers/review-history-ctrl.js';

const router = express.Router();

// function handles incoming HTTP GET request on the / URL path
router.get('/media/:id', history_ctrl.getHistoryByMediaId);
router.get('/reviewer/:id', history_ctrl.getHistoryByReviewerId);
router.get('/all', history_ctrl.getHistory);
router.post('/', history_ctrl.addHistory);
router.put('/:mediaID/:reviewerID', history_ctrl.updateHistory);

export default router;