const recipesWords = [];
const recipesFilter = [];
const listIngredient = [];
const listAppareils = [];
const listUstenciles = [];
let listTag = [];

// function getRecipe(){
//   const recipes = fetch('./data/recipes.json')
//                   .then(data => data.json())
//                   .then(data => data.recipes)
//                   .catch(error => console.log(error));

//   return recipes;
// }

async function searchRecipe() {
  //récupération du mot recherché
   const wordSeeked = document.getElementById('search').value;  

  //boucle de recherche des recettes
  let responses = [];
  recipesWords.forEach((item) => {
    if(item.words.includes(wordSeeked)) responses.push(item.id);
  })
  
  //nettoyage du tableau de réponses
  let clearResponse = [];
  responses.forEach((item) => {
    if(!clearResponse.includes(item)) clearResponse.push(item);
  });
  

  //affichage des recettes
  const recipes = await getRecipe();
  let newRecipes = [];
  for(let i = 0; i < recipes.length; i++){
    if(clearResponse.includes(recipes[i].id)){
      newRecipes.push(recipes[i]);
    }
  }  
  
  if(clearResponse.length > 0) {
    displayRecipe(newRecipes)
    console.log(clearResponse);
  } else {
    alert ("Aucune recette ne correspond à votre critère... Vous pouvez chercher « tarte aux pommes », « poisson », etc.");
  } 
}

function displayRecipe(recipes){
  const recipesSection = document.getElementById('recipesSection');
  recipesSection.innerHTML = '';

  recipes.forEach((recipe) => {
    const recipesModel = factoryRecipes(recipe);
    const recipeCardDOM = recipesModel.recipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

function addTag(name, type){
  let isPresent = false;
  
  if(listTag.length == 0){
    isPresent = true;
  } else {
    for(let i = 0; i < listTag.length; i++){   
      if(listTag[i].name == name) {
        return
      } else if(listTag[i].name != name){
        isPresent = true;
      }
    }
  }  

  if(isPresent){
    let obj = new Object;
    obj.name = name;
    obj.type = type;
    listTag.push(obj);
  }

  displayTag();
  searchFilter();
}

//Recherche par filtre
async function searchFilter(){
  let clearResponse = [];

  listTag.forEach((tag) => {
    if(tag.type == 'ingredients'){
      recipesFilter.forEach((item) => {
        if(item.ingredients.includes(tag.name)) clearResponse.push(item.id);
      })
    } else if(tag.type == 'appareils'){
      recipesFilter.forEach((item) => {
        if(item.appareils.includes(tag.name)) clearResponse.push(item.id);
      })
    } else if(tag.type == 'ustenciles'){
      recipesFilter.forEach((item) => {
        if(item.ustenciles.includes(tag.name)) clearResponse.push(item.id);
      })
    }
  })

  console.log(clearResponse);

//affichage des recettes
  const recipes = await getRecipe();
  let newRecipes = [];
  for(let i = 0; i < recipes.length; i++){
    if(clearResponse.includes(recipes[i].id)){
      newRecipes.push(recipes[i]);
    }
  }

  displayRecipe(newRecipes)
}

//Affichage des filtres
function displayFilter(filterName){
  if(filterName == 'ingredients'){
    createFilter(listIngredient, 'ingredients');
  } else if (filterName == 'appareils'){
    createFilter(listAppareils, 'appareils');
  } else if (filterName == 'ustenciles'){
    createFilter(listUstenciles, 'ustenciles');
  }

  const filterContainer = document.getElementById(filterName + "Container");
  filterContainer.classList.toggle('expanded');

  const filterTitle = document.getElementById(filterName + "Title");
  filterTitle.classList.toggle('enabled');

  const filterInput = document.getElementById(filterName + "Input");
  filterInput.classList.toggle('enabled');

  const filterClose = document.getElementById(filterName + "Close");
  filterClose.classList.toggle('rotation');

  const filter = document.getElementById(filterName);
  filter.classList.toggle('enabled');
}

//Fermeture des filtres
function closeFilter(filterName){
  
  const filterContainer = document.getElementById(filterName + "Container");
  // if(filterContainer.classList.contains('expanded')){
  //   createFilter(listIngredient, filterName);
  // }
  filterContainer.classList.toggle('expanded');

  const filterTitle = document.getElementById(filterName + "Title");
  filterTitle.classList.toggle('enabled');

  const filterInput = document.getElementById(filterName + "Input");
  filterInput.classList.toggle('enabled');

  const filterClose = document.getElementById(filterName + "Close");
  filterClose.classList.toggle('rotation');

  const filter = document.getElementById(filterName);
  filter.classList.toggle('enabled');
}

async function init() {
  //récupération des recettes
  const array = await getRecipe();

  displayRecipe(array);
  
  //boucle de création du tableau des recettes
  for(let i = 0; i < array.length; i++){
    let obj = new Object;
    obj.id = array[i].id;
    obj.words = [];
    for(let j = 0;j < array[i].name.split(' ').length; j++){
      obj.words.push(array[i].name.split(' ')[j]);
    }
    for(let j = 0;j < array[i].description.split(' ').length; j++){
      obj.words.push(array[i].description.split(' ')[j]);
    }
    for(let j = 0;j < array[i].ingredients.length; j++){
      for(let k = 0;k < array[i].ingredients[j].ingredient.split(' ').length; k++){
        obj.words.push(array[i].ingredients[j].ingredient.split(' ')[k]);
      }      
    }
    recipesWords.push(obj);
  }

  //boucle de création du tableau des ingrédients
  for(let i = 0; i < array.length; i++){
    let obj = new Object;
    obj.id = array[i].id;
    obj.ingredients = [];
    obj.ustenciles = [];
    for(let j = 0;j < array[i].ingredients.length; j++){
      obj.ingredients.push(array[i].ingredients[j].ingredient.toLowerCase());
    }
    obj.appareils = array[i].appliance.toLowerCase();
    for(let j = 0;j < array[i].ustensils.length; j++){
      obj.ustenciles.push(array[i].ustensils[j].toLowerCase());
    }
    recipesFilter.push(obj);
  }

  //boucle de création du tableau des ingredients
  for(let i = 0; i < array.length; i++){
    for(let j = 0;j < array[i].ingredients.length; j++){
      if(!listIngredient.includes(array[i].ingredients[j].ingredient.toLowerCase())){
        listIngredient.push(array[i].ingredients[j].ingredient.toLowerCase());
      }
    }
  }

  //boucle de création du tableau des appareils
  for(let i = 0; i < array.length; i++){
    if(!listAppareils.includes(array[i].appliance.toLowerCase())){
      listAppareils.push(array[i].appliance.toLowerCase());
    }
  }

  //boucle de création du tableau des ustenciles
  for(let i = 0; i < array.length; i++){
    for(let j = 0;j < array[i].ustensils.length; j++){
      if(!listUstenciles.includes(array[i].ustensils[j].toLowerCase())){
        listUstenciles.push(array[i].ustensils[j].toLowerCase());
      }
    }
  }
}

init();
