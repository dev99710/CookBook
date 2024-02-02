document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('recipeContainer');
    const searchInput = document.getElementById('searchInput');
    const selectedRecipeSection = document.getElementById('selectedRecipe');
  
    // Fetch recipes from the MealDB API
    function fetchRecipes(searchTerm = '') {
      const apiUrl = searchTerm
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        : 'https://www.themealdb.com/api/json/v1/1/search.php?f=c';
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const recipes = data.meals;
          displayRecipes(recipes);
        })
        .catch(error => console.error('Error fetching recipes:', error));
    }
  
    // Initial fetch
    fetchRecipes();
  
    // Search functionality
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim();
      fetchRecipes(searchTerm);
    });
  
    // Display recipes in the UI
    function displayRecipes(recipes) {
      if (!recipes) return;
  
      recipeContainer.innerHTML = recipes
        .map(recipe => createRecipeCard(recipe))
        .join('');
  
      // Add click event listeners to each recipe card
      recipes.forEach(recipe => {
        const recipeCard = document.getElementById(`recipe_${recipe.idMeal}`);
        recipeCard.addEventListener('click', () => showRecipeDetails(recipe));
      });
    }
  
    // Create HTML for each recipe card
    function createRecipeCard(recipe) {
      return `
        <div class="recipe-card" id="recipe_${recipe.idMeal}">
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-img">
          <div class="recipe-details">
            <h2 class="recipe-title">${recipe.strMeal}</h2>
          </div>
        </div>
      `;
    }
  
    // Show recipe details in selectedRecipeSection
    function showRecipeDetails(recipe) {
      selectedRecipeSection.innerHTML = `
        <h2 class="recipe-title">${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-img">
        <div class="recipe-details">
          <p class="recipe-instructions">${recipe.strInstructions}</p>
        </div>
      `;
  
      // Show the selectedRecipeSection and hide recipeContainer
      selectedRecipeSection.classList.remove('hidden');
      recipeContainer.classList.add('hidden');
    }
  
    // Back to the list of recipes
    selectedRecipeSection.addEventListener('click', () => {
      selectedRecipeSection.classList.add('hidden');
      recipeContainer.classList.remove('hidden');
    });
  
  homeLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of the link
    location.reload(); // Reload the page
});
});