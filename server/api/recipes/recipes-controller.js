import {Recipe} from './recipes-model.js';

export async function createRecipe(req, res) {
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({message: error.message});
        } else { 
            res.status(500).json({message: error.message});
        }
    }
};

export async function getAllRecipes(req, res){
    try {
        const recipes = await Recipe.find().populate('userReviews');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export async function getRecipe (req, res){
    try {
        const recipe = await Recipe.findById(req.params.id).populate('userReviews');
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export async function updateRecipe (req, res){
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!recipe) {
            return res.status(404).json({message: "Recipe not found"});
        }
        res.status(200).json(recipe);
    } catch (error) {
        //if the error is a validation error (client error), send a 400 error message
        if (error.name === "ValidationError") {
            return res.status(400).json({message: error.message});
        } else { //otherwise send 500 error (database error)
            //server related error (bad request)
            res.status(500).json({message: "Internal Server Error"});
        }
    }
};

export async function deleteRecipe (req, res){
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json("Recipe not found");
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

