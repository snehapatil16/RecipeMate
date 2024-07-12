import { createBrowserRouter } from 'react-router-dom';
import Root from './root/root';
import HomePage from './components/home-page';
import AllRecipes from './components/all-recipes';
import RecipeList from './components/recipe-list';
import SimpleRecipeList from './components/simple-recipe-list';
import RecipeDetail from './components/recipe-page'; 
import CreateUpdateRecipe from './components/create-update-recipe';
import { load_recipe_list, load_recipe_detail } from './data/recipes-loader';

const router = createBrowserRouter([
    {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <HomePage />, index: true },
      { path: '/all-recipes', element: <AllRecipes /> },
      { path: '/create-update-recipe', element: <CreateUpdateRecipe /> },
      { path: '/create-update-recipe/:id', element: <CreateUpdateRecipe />, loader: load_recipe_detail},
      { path: '/simple-recipes', element: <SimpleRecipeList />, loader: load_recipe_list},
      { path: '/recipes/:id', element: <RecipeDetail />, loader: load_recipe_detail}
    ],
    },
    
]);

export default router;
