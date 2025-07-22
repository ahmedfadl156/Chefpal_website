const recipesContainer = document.getElementById('popular-recipes-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('meal-search-input');
const searchButtton = document.getElementById('search-button')
const recipeInfo = document.getElementById('recipe-info');
const overlay = document.querySelector('.overlay')
const favRecipesBtn = document.querySelector('.favourite-recipes-btn')
const favouriteRecipesModal = document.getElementById('favourite-Recipes')
let favouriteRecipes = [];

// Function To Get Data From "The MealDB"
async function getRandomRecipes(numberOfRecipes = 12) {
  try {
    const recipes = [];
    // Fetch multiple random recipes
    for (let i = 0; i < numberOfRecipes; i++) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!response.ok) {
        throw new Error(`Error fetching recipe ${i + 1}: ${response.status}`);
      }
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        recipes.push(data.meals[0]);
      }
    }

    // Check if any recipes were fetched
    if (recipes.length === 0) {
      recipesContainer.innerHTML = '<p class="text-center text-gray-600">No recipes found. Please try again.</p>';
      return;
    }

    // Display the fetched recipes
    displayRecipes(recipes);

  } catch (error) {
    recipesContainer.innerHTML = '<p class="text-center text-red-500">Failed to load recipes. Please check your internet connection.</p>';
    console.error('Error:', error);
  }
}

// Function To Display Recipe
function displayRecipes(recipes){
  recipesContainer.innerHTML = '';
    if (!recipes || recipes.length === 0) {
        recipesContainer.innerHTML = '<p class="text-center text-gray-600 col-span-full">No recipes found for your search. Try another keyword!</p>';
        return;
    }
  recipes.forEach(recipe => {
    const isFavorite = favouriteRecipes.some(favRecipe => favRecipe.idMeal === recipe.idMeal);
    const heartClass = isFavorite ? 'fa-solid text-red-500' : 'fa-regular text-gray-600';
    
    const recipeHTML = `<div class="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer recipe-card" data-id="${recipe.idMeal}">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-48 object-cover">
        <div class="p-4 flex justify-between items-center">
        <h3 class="text-xl font-semibold mb-2">${recipe.strMeal}</h3>
        <button class="add-fav hover:scale-110 transition-transform" data-id="${recipe.idMeal}">
          <i class="fa-heart ${heartClass} text-2xl"></i>
        </button>
        </div>
        </div>`
    recipesContainer.insertAdjacentHTML('beforeend' , recipeHTML);
  })
}

// Function To Search For Recipe
async function searchRecipe(query){
  try {
    recipesContainer.innerHTML = '<p class="text-center text-gray-600 col-span-full">Loading recipes...</p>';
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    if(!response.ok) throw new Error(`There Is An Error While Fectching Data ${response.status}`)
    const data = await response.json();
    displayRecipes(data.meals)
  } catch (error) {
  recipesContainer.innerHTML = '<p class="text-center text-red-500">Failed to load recipe. Please check your internet connection.</p>'; 
  }
}

// Function To Get Recipe By ID
async function getRecipeById(id){
  try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  const data = await response.json();
  if (!data.meals || data.meals.length === 0) {
      recipeInfo.innerHTML = '<p class="text-center text-gray-600">Recipe details not found.</p>';
      return;
    }
    const [recipe] = data.meals;
    displayRecipeDetails(recipe);
  } catch (error) {
    recipeInfo.innerHTML = '<p class="text-center text-red-500">Failed to load recipe. Please check your internet connection.</p>'; 
  }
}

// Function Display Recipe Details
async function displayRecipeDetails(recipe){
  let ingredientsHTML = '';
  for(let i = 1 ; i <= 20 ; i++){ 
  const ingredient = recipe[`strIngredient${i}`];
  const measure = recipe[`strMeasure${i}`];  
if (ingredient && ingredient.trim() !== '') {
    ingredientsHTML += `<li class="mb-1 text-gray-700">${measure} ${ingredient}</li>`;
    } else {
      break;
      }
    }

  const recipeDetails = `
  <div class="recipe-image h-1/2 w-full">
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="h-full w-full object-cover rounded-t-2xl">
  </div>
  <div class="recipe-details px-8 pb-8 overflow-y-auto">
    <h2 class="recipe-title font-bold text-3xl mb-4">${recipe.strMeal}</h2>
    <h3 class="font-bold text-xl mb-2">Ingredients:</h3>
    <ul class="recipe-ingrediants list-disc list-inside mb-6 text-lg">
      ${ingredientsHTML}
    </ul>
    <h3 class="recipe-instructions font-bold text-xl mb-2">Instructions:</h3>
    <p class="text-gray-700 mb-4 leading-relaxed">${recipe.strInstructions}</p>
    <div class="flex gap-4">
      ${recipe.strSource ? `<a href="${recipe.strSource}" target="_blank" class="text-blue-600 hover:underline">View Source</a>` : ''}
      ${recipe.strYoutube ? `<a href="${recipe.strYoutube}" target="_blank" class="text-red-600 hover:underline">Recipe On Youtube</a>` : ''}
    </div>
  </div>
  <button id="close-modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
  `;

  recipeInfo.innerHTML = recipeDetails;
  
  recipeInfo.classList.remove('hidden');
  overlay.classList.remove('hidden');
  
  const closeBtn = document.getElementById('close-modal');
  closeBtn.addEventListener('click', closeModal);
}

function closeModal() {
  recipeInfo.classList.add('hidden');
  overlay.classList.add('hidden');
}

// Function Save Favourites
function saveFavourites(){
  localStorage.setItem('chefspal-favourites' , JSON.stringify(favouriteRecipes));
}

// Function Load Favourites
function loadFavourites(){
  const storedfavourites = localStorage.getItem('chefspal-favourites');
  if(storedfavourites){
    favouriteRecipes = JSON.parse(storedfavourites);
  } else {
    favouriteRecipes = [];
  }
}

function removeFavourite(id){
  favouriteRecipes = favouriteRecipes.filter(recipe => recipe.idMeal !== id);
  saveFavourites();
  displayFavourites();
  // إعادة عرض الوصفات لتحديث أيقونة القلب
  updateHeartIcons();
}

// دالة لتحديث أيقونات القلب
function updateHeartIcons() {
  const heartIcons = document.querySelectorAll('.add-fav i');
  heartIcons.forEach(icon => {
    const recipeId = icon.closest('.add-fav').dataset.id;
    const isFavorite = favouriteRecipes.some(recipe => recipe.idMeal === recipeId);
    
    if (isFavorite) {
      icon.className = 'fa-heart fa-solid text-red-500 text-2xl';
    } else {
      icon.className = 'fa-heart fa-regular text-gray-600 text-2xl';
    }
  });
}

// Function To Add Recipe To Favourite List
async function addFavourite(recipeId){
  try {
    // التحقق إذا كانت الوصفة موجودة في المفضلة
    const isFavourite = favouriteRecipes.some(favRecipe => favRecipe.idMeal === recipeId);
    
    if (isFavourite) {
      // إزالة من المفضلة
      removeFavourite(recipeId);
      console.log('Recipe removed from favourites');
      return;
    }
    
    // جلب تفاصيل الوصفة من API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    if (!response.ok) throw new Error('Failed to fetch recipe details');
    
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      const recipe = data.meals[0];
      favouriteRecipes.push(recipe);
      saveFavourites();
      displayFavourites();
      updateHeartIcons();
      console.log('Recipe added to favourites:', recipe.strMeal);
    }
  } catch (error) {
    console.error('Error adding to favourites:', error);
  }
}

// Function To Display Favourite Recipes
function displayFavourites(){
  favouriteRecipesModal.innerHTML = `<h2 class="font-medium text-2xl mb-4">Favourite Recipes</h2>`;
  
  if(favouriteRecipes.length === 0){
    favouriteRecipesModal.innerHTML += '<p class="text-gray-500 mt-4">No favorite recipes yet. Add some!</p>';
    return; 
  }
  
  favouriteRecipes.forEach(recipe => {
    const favouriteRecipe = `<div class="fav-recipe flex justify-between items-center mt-3 p-2 hover:bg-gray-50 rounded" data-id="${recipe.idMeal}">
        <div class="fav-recipe-info flex gap-3 items-center cursor-pointer">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-16 h-16 object-cover rounded">
        <h2 class="text-sm font-medium">${recipe.strMeal}</h2>
        </div>
        <i class="fa-solid fa-trash text-red-600 cursor-pointer hover:text-red-800 p-2" data-id="${recipe.idMeal}"></i>
      </div>`;
    favouriteRecipesModal.insertAdjacentHTML('beforeend', favouriteRecipe);
  });
}

// Event Listeners

// Toggle favorites modal
favRecipesBtn.addEventListener('click', e => {
  e.preventDefault();
  favouriteRecipesModal.classList.toggle('hidden');
  if (!favouriteRecipesModal.classList.contains('hidden')) {
    displayFavourites();
  }
});

// Search form event listener
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if(query){
    searchRecipe(query);
  }
  else{
    recipesContainer.innerHTML = '<p class="text-center text-gray-600 col-span-full">Please enter a meal name to search.</p>';
  }
});

// Recipe container click handler - للوصفات والمفضلة
recipesContainer.addEventListener('click', e => {
  // التعامل مع زر المفضلة
  if (e.target.closest('.add-fav')) {
    e.preventDefault();
    e.stopPropagation();
    const favBtn = e.target.closest('.add-fav');
    const recipeId = favBtn.dataset.id;
    if (recipeId) {
      addFavourite(recipeId);
    }
    return;
  }
  
  // التعامل مع النقر على الوصفة
  const recipeCard = e.target.closest('.recipe-card');
  if (recipeCard && recipeCard.dataset.id) {
    getRecipeById(recipeCard.dataset.id);
  }
});

// Favorites modal click handler
favouriteRecipesModal.addEventListener('click', e => {
  // حذف من المفضلة
  if (e.target.classList.contains('fa-trash')) {
    const recipeId = e.target.dataset.id;
    removeFavourite(recipeId);
    return;
  }
  
  // فتح تفاصيل الوصفة من المفضلة
  if (e.target.closest('.fav-recipe-info')) {
    const recipeCard = e.target.closest('.fav-recipe');
    const recipeId = recipeCard.dataset.id;
    if (recipeId) {
      getRecipeById(recipeId);
      favouriteRecipesModal.classList.add('hidden');
    }
  }
});

// إغلاق المودال عند النقر على الخلفية
overlay.addEventListener('click', closeModal);

// إغلاق المودال عند الضغط على Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// إغلاق مودال المفضلة عند النقر خارجها
document.addEventListener('click', e => {
  if (!e.target.closest('#favourite-Recipes') && !e.target.closest('.favourite-recipes-btn')) {
    favouriteRecipesModal.classList.add('hidden');
  }
});



// Load favorites and random recipe on page load
window.addEventListener('DOMContentLoaded', () => {
  loadFavourites();
  getRandomRecipes();
});
