const recipesWords = [];
const listIngredient = [];
const listAppareils = [];
const listUstenciles = [];
const recipesFilter = [];

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
    for(let j = 0; j < recipesWords[i].words.length; j++){
      if(recipesWords[i].words[j] == wordSeeked){ 
        responses.push(recipesWords[i].id);      
      }
    }
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
  for(let i = 0; i < clearResponse.length; i++){
    for(let j = 0; j < recipes.length; j++){
      if(recipes[j].id == clearResponse[i]){
        newRecipes.push(recipes[j]);
      }
    }
  }

  if(clearResponse.length > 0){
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
async function searchFilter(data, id){
  let clearResponse = [];

  if(id == 'ingredients'){
    for(let i = 0; i < recipesFilter.length; i++){
      for(let j = 0; j < recipesFilter[i].ingredients.length; j++){
        if(recipesFilter[i].ingredients[j].toLowerCase() == data.toLowerCase()){
          clearResponse.push(recipesFilter[i].id);
        }
      }      
    }   
  } else if(id == 'appareils'){
    for(let i = 0; i < recipesFilter.length; i++){
      if(recipesFilter[i].appareils.toLowerCase() == data.toLowerCase()) clearResponse.push(recipesFilter[i].id);
    }
  } else if(id == 'ustenciles'){
    for(let i = 0; i < recipesFilter.length; i++){
      if(recipesFilter[i].ustenciles.toLowerCase() == data.toLowerCase()) clearResponse.push(recipesFilter[i].id);
    }
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

//Création des filtres
function createFilter(datas, divId) {
  const filter = document.getElementById(divId);

  datas.forEach((data) => {
    const span = document.createElement('span');
    span.textContent = data;
    span.onclick = function() {
      searchFilter(data, filter.id);
    }
    filter.appendChild(span);
  });
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
  
  //boucle de création du array des recettes
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