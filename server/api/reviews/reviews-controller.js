import {Reviews} from './reviews-model.js';
import {Recipe} from '../recipes/recipes-model.js';

export async function createReview(req, res){

    try {
        const {description, rating, user} = req.body;
        const recipeId = req.params.recipeId;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            console.log("Recipe not found");
            return res.status(404).json({message: "Recipe not found"});
            
        }

        const newReview = new Reviews({
            description,
            rating,
            user,
        });

        const savedReview = await newReview.save();
        recipe.userReviews.push(savedReview);
        await recipe.save();
        res.status(201).json(newReview);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        } else { 
            res.status(500).json({ message: error.message });
        }
    }
};

export async function getAllReviews(req, res){
    try {
        const recipeId = req.params.recipeId;
        const recipe = await Recipe.findById(recipeId).populate('userReviews');
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }
        res.status(200).json(recipe.userReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export async function getReview(req, res){
    try {
        const review = await Reviews.findById(req.params.id);
        if (!review) {
            return res.status(404).json({message: "Review not found"});
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export async function updateReview(req, res){
    try {
        const review = await Reviews.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }); 
        if (!review) {
            return res.status(404).json({message: "Review not found"});
        }
        res.status(200).json(review);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        } else { 
            res.status(500).json({ message: error.message });
        }
    }
};

export async function deleteReview(req, res) {
    try {
        const review = await Reviews.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({message: "Review not found"});
        }
        await Recipe.updateMany({}, { $pull: { userReviews: review._id } });
        
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
