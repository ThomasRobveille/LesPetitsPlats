const recipesWords = [];
const recipesFilter = [];
const listIngredient = [];
const listAppareils = [];
const listUstenciles = [];

function getRecipe(){
  const recipes = fetch('./data/recipes.json')
                  .then(data => data.json())
                  .then(data => data.recipes)
                  .catch(error => console.log(error));

  return recipes;
}

async function searchRecipe() {
  //récupération du mot recherché
   const wordSeeked = document.getElementById('search').value;  

  //boucle de recherche des recettes
  let responses = [];
    for(let i = 0; i < recipesWords.length; i++){
      if(recipesWords[i].words.includes(wordSeeked)) responses.push(recipesWords[i].id);
    }
  
  //nettoyage du tableau de réponses
  let clearResponse = [];
  for(let i = 0; i < responses.length; i++){
    if(responses[i] != responses[i+1]){
      clearResponse.push(responses[i]);
    }
  }

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
    const recipesModel = createHTML(recipe);
    const recipeCardDOM = recipesModel.recipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

function createHTML(recipes){
  const { name, time, ingredients, description } = recipes;

  function recipeCardDOM() {
    const article = document.createElement('article');

    const img = document.createElement('div');
    img.classList.add('img');
    article.appendChild(img);

    const content = document.createElement('div');
    content.classList.add('content');
    article.appendChild(content);

    const title = document.createElement('div');
    title.classList.add('title');
    content.appendChild(title);
  
    const h2 = document.createElement('h2');
    h2.textContent = name;
    title.appendChild(h2);
  
    const cookTime = document.createElement('p');
    cookTime.classList.add('time');
    cookTime.textContent = time + " min";
    title.appendChild(cookTime);

    const descrip = document.createElement('div');
    descrip.classList.add('description');
    descrip.title = description;
    content.appendChild(descrip);
  
    const ul = document.createElement('ul');
    for(let i = 0; i < ingredients.length; i++){
      const li = document.createElement('li');
      li.textContent = ingredients[i].ingredient + " : " + ingredients[i].quantity + " " + ingredients[i].unit;
      ul.appendChild(li);
    }
    descrip.appendChild(ul);
  
    const p2 = document.createElement('p');
    p2.textContent = description;
    descrip.appendChild(p2);
  
    return article;
  }  

  return { recipeCardDOM };
}

//Recherche par filtre
async function searchFilter(data){
  let clearResponse = [];
  console.log(recipesFilter)
  for(let i = 0; i < recipesFilter.length; i++){
    if(recipesFilter[i].ingredients.includes(data)) clearResponse.push(recipesFilter[i].id);
  }  

  console.log(clearResponse)

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

function createFilter(datas, divId) {
  const filter = document.getElementById(divId);

  datas.forEach((data) => {
    const span = document.createElement('span');
    span.textContent = data;
    span.onclick = function() {
      searchFilter(data);
    }
    filter.appendChild(span);
  });
}

//Affichage des filtres
function displayFilter(filterName){
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
    for(let j = 0;j < array[i].ingredients.length; j++){
      obj.ingredients.push(array[i].ingredients[j].ingredient.toLowerCase());
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
  createFilter(listIngredient, 'ingredients');

  //boucle de création du tableau des appareils
  for(let i = 0; i < array.length; i++){
    if(!listAppareils.includes(array[i].appliance.toLowerCase())){
      listAppareils.push(array[i].appliance.toLowerCase());
    }
  }
  createFilter(listAppareils, 'appareils');

  //boucle de création du tableau des ustenciles
  for(let i = 0; i < array.length; i++){
    for(let j = 0;j < array[i].ustensils.length; j++){
      if(!listUstenciles.includes(array[i].ustensils[j].toLowerCase())){
        listUstenciles.push(array[i].ustensils[j].toLowerCase());
      }
    }
  }
  createFilter(listUstenciles, 'ustenciles');
}

init();
