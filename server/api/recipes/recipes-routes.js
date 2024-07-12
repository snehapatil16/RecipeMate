import express from 'express';
import { createRecipe, getAllRecipes, getRecipe, updateRecipe, deleteRecipe } from './recipes-controller.js';
import reviewRouter from '../reviews/reviews-routes.js';

const router = express.Router();

router.use('/:recipeId/reviews', reviewRouter);

router.post('/', createRecipe);
router.get('/', getAllRecipes);
router.get('/:id', getRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router