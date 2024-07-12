# Cookbook API Documentation
# By Sneha Patil & Annika Sonne

### Recipe Schema

The `Recipe` schema represents the structure of the recipe data in the database. Each recipe has a name, description, image URL, preparation time, cooking time, an array of directions, and an array of ingredients.

- `name`: String, required.
  - We use the String type because a recipe name is textual content.
  - The `required` validator is used because every recipe should have a name for identification.

- `description`: String, required.
  - Similar to `name`, we use a String to hold the text describing the recipe.
  - It is marked `required` because a description is necessary to provide context for the recipe.

- `image`: String, required.
  - This is a String to store the URL of the recipe's image.
  - We chose not to make this `required` initially but assuming every recipe should have an image for better user experience, it has been updated to `required`.

- `prepTime` and `cookTime`: Number, required.
  - Both are stored as Numbers representing the time in minutes.
  - These fields are `required` because knowing how long it takes to prepare and cook is essential for planning.

- `directions`: Array of String, required.
  - An array is used because the directions for a recipe are a list of steps.
  - Each step is a String, and the array is marked `required` because a recipe without directions is incomplete.

- `ingredients`: [IngredientSchema].
  - This is an array of subdocuments based on `IngredientSchema`.
  - Using a subdocument allows us to group related attributes of an ingredient together, like its name and amount.

- `userReviews`: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}].
  - This is an array of ObjectIds linking to the `Review` model.
  - This relationship allows us to associate reviews directly with a recipe.

### Reviews Schema

The `Reviews` schema represents user reviews for the recipes.

- `description`: String, required.
  - We use a String for the review text.
  - The `required` validator ensures that every review includes feedback.

- `rating`: Number, required.
  - A Number is the best choice for a star rating system.
  - The `required` validator is necessary to quantify the reviewer's opinion.

- `createdAt`: Date, default to Date.now.
  - The Date type is used to timestamp the creation of a review.
  - The default value is set to the current date and time when the review is created.

- `user`: ObjectId, required, ref: 'User'.
  - This field stores a reference to the `User` model, linking a review to the user who created it.
  - The `required` validator ensures accountability and traceability for reviews.

### User Schema

The `User` schema represents the users who can create recipes and leave reviews.

- `name`: Subdocument, required.
  - A subdocument is used to enclose the first and last names.
  - We require this subdocument so that each user has a proper identity within the system.

  - `firstName`: String, required.
    - Represents the user's first name.
    - String type is used for textual content and marked `required`.

  - `lastName`: String, required.
    - Represents the user's last name.
    - Also a String and `required` for a full representation of the user's name.

- `username`: String, unique.
  - This is a unique identifier for the user.
  - The `unique` attribute ensures that no two users can have the same username, which is important for login and user identification.

- `email`: String, unique.
  - Used to store the user's email address.
  - It is marked `unique` to prevent multiple accounts from being registered with the same email.

## RESTful API Endpoints

### Recipes

- `POST /api/recipes`: Create a new recipe. Requires a JSON payload with `name`, `description`, `image`, `prepTime`, `cookTime`, `directions`, and `ingredients`.
- `GET /api/recipes`: Retrieve a list of all recipes.
- `GET /api/recipes/:id`: Retrieve a single recipe by its ID.
- `PUT /api/recipes/:id`: Update an existing recipe by its ID. Requires a JSON payload with any recipe attributes to be updated.
- `DELETE /api/recipes/:id`: Delete a recipe by its ID.

### Reviews

- `POST /api/recipes/:recipeId/reviews`: Create a new review for a recipe. Requires a JSON payload with `description`, `rating`, and `user`.
- `GET /api/recipes/:recipeId/reviews`: Retrieve all reviews for a specific recipe.
- `GET /api/reviews/:id`: Retrieve a single review by its ID.
- `PUT /api/reviews/:id`: Update an existing review by its ID. Requires a JSON payload with any review attributes to be updated.
- `DELETE /api/reviews/:id`: Delete a review by its ID.

### Users

- `POST /api/users`: Create a new user. Requires a JSON payload with `name`, `username`, and `email`.
- `GET /api/users`: Retrieve a list of all users.
- `GET /api/users/:id`: Retrieve a single user by their ID.
- `PUT /api/users/:id`: Update an existing user by their ID. Requires a JSON payload with any user attributes to be updated.
- `DELETE /api/users/:id`: Delete a user by their ID.

## Response Codes

The following response codes are returned by the API:

- `200 OK`: The request was successful.
- `201 Created`: A new resource was successfully created.
- `400 Bad Request`: The request was invalid or missing required data.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: A server error occurred while processing the request.
