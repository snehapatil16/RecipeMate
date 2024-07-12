import { useLoaderData, Link, Form } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./create-update-recipe.module.scss";
import { useNavigate } from "react-router-dom";

export default function CreateUpdateRecipe() {
  const recipe = useLoaderData();
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients || [{ name: "", amount: "" }]
  );
  const [directions, setDirections] = useState(recipe?.directions || [""]);
  const navigate = useNavigate();

  useEffect(() => {
    if (recipe && recipe.ingredients) {
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (index === i) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleDirectionChange = (index, value) => {
    const newDirections = directions.map((direction, i) => {
      if (index === i) {
        return value;
      }
      return direction;
    });
    setDirections(newDirections);
  };

  // Add a new direction field
  const addDirection = () => {
    setDirections([...directions, ""]);
  };

  // Remove a direction field
  const removeDirection = (index) => {
    setDirections(directions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const ingredients = [];
    const directions = [];

    for (let [key, value] of formData.entries()) {
      // Check if key matches the pattern for ingredients
      let match = key.match(/^ingredients\[(\d+)\]\[(name|amount)\]$/);
      if (match) {
        const [, index, field] = match;
        if (!ingredients[index]) ingredients[index] = { name: "", amount: "" };
        ingredients[index][field] = value;
        continue; // Skip further processing for this key-value pair
      }

      // Check if key matches the pattern for directions
      match = key.match(/^directions\[(\d+)\]$/);
      if (match) {
        const [, index] = match;
        directions[index] = value; // each direction is just a string
      }
    }

    const json = {
      name: formData.get("name"),
      description: formData.get("description"),
      prepTime: formData.get("prepTime"),
      cookTime: formData.get("cookTime"),
      image: formData.get("image"),
      ingredients: ingredients.filter(
        (ingredient) => ingredient.name && ingredient.amount
      ), // filter out empty ingredients
      directions: directions.filter((direction) => direction), // filter out empty directions
    };

    console.log("Form data submitted:", json);

    const method = recipe ? "PUT" : "POST";
    const url = recipe ? `/api/recipes/${recipe._id}` : "/api/recipes";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData);
        alert("Recipe saved successfully!");
        navigate("/");
      } else {
        const errorText = await response.text();
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(`An error occurred: ${err.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <h1>{recipe ? "Update Recipe 📝" : "Create Recipe 📝"}</h1>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Name:
          <input
            name="name"
            defaultValue={recipe?.name || ""}
            className={styles.formInput}
            required
          />
        </label>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Description:
          <textarea
            name="description"
            defaultValue={recipe?.description || ""}
            className={styles.formInput}
            required
          />
        </label>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Prep Time (min):
          <input
            type="number"
            name="prepTime"
            defaultValue={recipe?.prepTime || ""}
            className={styles.formInput}
            required
          />
        </label>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Cook Time (min):
          <input
            type="number"
            name="cookTime"
            defaultValue={recipe?.cookTime || ""}
            className={styles.formInput}
            required
          />
        </label>
      </div>
      <div>
        <label className={styles.formLabel}>Directions</label>
        {directions.map((direction, index) => (
          <div key={index} className={styles.directionSection}>
            <label>Step {index + 1}:</label>
            <div className={styles.directionInputContainer}>
              <textarea
                name={`directions[${index}]`}
                value={direction}
                onChange={(e) => handleDirectionChange(index, e.target.value)}
                className={`${styles.directionInput} ${styles.formInput}`}
                required
              />
              <button
                type="button"
                onClick={() => removeDirection(index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addDirection}
          className={styles.addButton}
        >
          Add Step
        </button>
      </div>

      <div>
        <label className={styles.formLabel}>Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientSection}>
            <input
              name={`ingredients[${index}][name]`}
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              className={styles.ingredientInput}
              placeholder="Ingredient"
              required
            />
            <input
              name={`ingredients[${index}][amount]`}
              value={ingredient.amount}
              onChange={(e) =>
                handleIngredientChange(index, "amount", e.target.value)
              }
              className={styles.ingredientInput}
              placeholder="Amount"
              required
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className={styles.addButton}
        >
          Add Ingredient
        </button>
      </div>

      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Image URL:
          <input
            type="url"
            name="image"
            defaultValue={recipe?.image || ""}
            className={styles.formInput}
          />
        </label>
      </div>
      <input
        type="submit"
        value={recipe ? "Update Recipe" : "Create Recipe"}
        className={styles.formSubmitButton}
      />
    </Form>
  );
}
