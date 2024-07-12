# Cookbook API Documentation
# By Sneha Patil & Annika Sonne

### Running the Project

You can run the entire project with just one command. This setup simplifies the development process by building the client and starting the server in one step.

1. cd client -> `npm install --save-dev rimraf`
2. cd server -> `npm run dev`

### Screenshots

Here are some screenshots showing various aspects of the project:

![Screenshot 1](https://github.com/user-attachments/assets/8e5efd09-f2fc-4299-bed0-f0b74ab057f8)
![Screenshot 2](https://github.com/user-attachments/assets/d262bf80-3434-4c25-a409-98fbca8f012c)
![Screenshot 3](https://github.com/user-attachments/assets/32cb80e5-51bd-466a-be3a-1f18623d3795)
![Screenshot 4](https://github.com/user-attachments/assets/b0a9ad5e-964f-491b-9ead-480010641b6b)
![Screenshot 5](https://github.com/user-attachments/assets/37526aae-bdfd-40fb-8e14-56719cf13e52)


### Recipe Schema

The `Recipe` schema represents the structure of the recipe data in the database. Each recipe has a name, description, image URL, preparation time, cooking time, an array of directions, and an array of ingredients.

- `name`: String, required. The name of the recipe for identification.
- `description`: String, required. Description providing context for the recipe.
- `image`: String, required. URL of the recipe's image.
- `prepTime` & `cookTime: Number`, required. Time in minutes for preparation and cooking.
- `directions`: Array of String, required. Step-by-step instructions.
- `ingredients`: Array of subdocuments based on IngredientSchema.
- `userReviews`: Array of ObjectIds linking to the Review model.

### Reviews Schema

The `Reviews` schema represents user reviews for the recipes.

- `description`: String, required. Textual feedback for the review.
- `rating`: Number, required. Star rating for the recipe.
- `createdAt`: Date, default to Date.now. Timestamp of review creation.
- `user`: ObjectId, required, ref: 'User'. Reference to the user who created the review.

### User Schema

The `User` schema represents the users who can create recipes and leave reviews.

- `name`: Subdocument, required.
  - `firstName`: String, required.
  - `lastName`: String, required.
- `username`: String, unique. Unique identifier for login.
- `email`: String, unique. User's email address.

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
