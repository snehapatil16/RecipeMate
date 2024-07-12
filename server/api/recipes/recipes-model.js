import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: String, required: true}
});

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required:true},
    image: {type: String, required: true},
    prepTime: {type: Number, required: true},
    cookTime: {type: Number, required: true},
    directions: [{
        type: String, 
        required: true
    }],
    ingredients: [ IngredientSchema
    ],
    userReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}]
});

let Recipe = mongoose.model('Recipe', RecipeSchema);
export {Recipe};
