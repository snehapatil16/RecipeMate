import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './recipe-card.module.css';

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate();
    const formatTime = (time) => `${time} minutes`;

    const handleCardClick = () => {
        navigate(`/recipes/${recipe._id}`); 
    };

    return (
        <div className={styles.recipeCard} onClick={handleCardClick}>
            <div className={styles.recipeCardContent}>
                <h3 className={styles.recipeCardTitle}>{recipe.name}</h3>
                <p className={styles.recipeCardDescription}>{recipe.description}</p>
                <div className={styles.recipeCardTime}>
                    <div>Prep Time: {formatTime(recipe.prepTime)}</div>
                    <div>Cooking Time: {formatTime(recipe.cookTime)}</div>
                    <div>Total Time: {formatTime(recipe.prepTime + recipe.cookTime)}</div>
                </div>
            </div>
            <img src={recipe.image} alt={recipe.name} className={styles.recipeCardImage} />
        </div>
    );
};

export default RecipeCard;
