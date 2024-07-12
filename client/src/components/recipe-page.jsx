import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Review from "./reviews";
import { load_recipe_detail } from "../data/recipes-loader";
import ReviewForm from "./create-update-reviews";
import styles from "./recipe-page.module.scss";

const RecipeDetail = () => {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/recipes/${recipeId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        navigate("/all-recipes");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (review) => {
    setEditReview(review);
    setIsEditing(true);
  };

  useEffect(() => {
    setIsLoading(true);

    load_recipe_detail({ params: { id: recipeId } })
      .then((loadedRecipe) => {
        setRecipe(loadedRecipe);
        if (!loadedRecipe) {
          throw new Error(`No recipe found for ID: ${recipeId}`);
        }
        return fetch(`/api/recipes/${recipeId}/reviews`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok - reviews");
        }
        return response.json();
      })
      .then((loadedReviews) => {
        setReviews(loadedReviews);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [recipeId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  console.log(recipe);

  return (
    <div className={styles.recipeDetailContainer}>
      <div className={styles.recipeDetailTextContent}>
        <h1>{recipe.name}</h1>
        <img
        src={recipe.image}
        alt={recipe.name}
        className={styles.recipeDetailImage}
        />
        <p>{recipe.description}</p>
        <p>Prep Time: {recipe.prepTime} minutes</p>
        <p>Cook Time: {recipe.cookTime} minutes</p>
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.amount}
              </li>
            ))}
          </ul>
        </div>

        <div className="directions">
          <h2>Directions</h2>
          <ol>
            {recipe.directions.map((direction, index) => (
              <li key={index}>{direction}</li>
            ))}
          </ol>
        </div>
        
        <Link
          to={`/create-update-recipe/${recipeId}`}
          className={styles.button}
        >
          Edit Recipe
        </Link>

        <div className={styles.reviewSection}>
        <h2 className={styles.reviewHeading}>User Reviews</h2>
        {isEditing ? (
          <ReviewForm
            recipeId={recipeId}
            setReviews={setReviews}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editReview={editReview}
            className={styles.reviewForm}
          />
        ) : (
          <>
            <ReviewForm
              recipeId={recipeId}
              setReviews={setReviews}
              className={styles.reviewForm}
            />
            <ul className={styles.reviewList}>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Review
                    key={review._id}
                    review={review}
                    setReviews={setReviews}
                    setIsEditing={setIsEditing}
                    setEditReview={setEditReview}
                    handleEdit={handleEdit}
                    className={styles.reviewItem}
                  />
                ))
              ) : (
                <p className={styles.noReviews}>No reviews yet.</p>
              )}
            </ul>
          </>
        )}
      </div>

      <button className={styles.button} onClick={handleDelete}>
        Delete Recipe
      </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
