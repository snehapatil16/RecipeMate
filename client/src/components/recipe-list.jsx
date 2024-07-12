import React, { useState, useEffect } from 'react';
import RecipeCard from './recipe-card';
import { load_recipe_list } from '../data/recipes-loader';

const RecipeList = () => {
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
    <div>
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
