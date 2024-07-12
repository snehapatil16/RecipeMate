import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { load_recipe_list } from '../data/recipes-loader';
import styles from './simple-recipe-list.module.scss';

const SimpleRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    load_recipe_list()
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetching recipe list failed:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error loading recipes: {error.message}</div>;
  }

  if (recipes.length === 0) {
    return <div>No recipes found</div>;
  }

  return (
    <div className={styles.recipeList}>
      {recipes.map(recipe => (
        <div key={recipe._id} className={styles.recipeCard}>
          <Link to={`/recipes/${recipe._id}`}>
            <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
            <h3 className={styles.recipeName}>{recipe.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SimpleRecipeList;
