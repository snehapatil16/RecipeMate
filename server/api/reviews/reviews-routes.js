import express from 'express';

import { createReview, getAllReviews, getReview, updateReview, deleteReview } from './reviews-controller.js';

const router = express.Router({mergeParams: true});

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/:id', getReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;