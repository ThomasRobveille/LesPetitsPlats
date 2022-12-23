const recipesWords = [];
const listIngredient = [];
const listAppareils = [];
const listUstenciles = [];
const recipesFilter = [];
let listTag = [];

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
  const recipes = await getRecipes();
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

//Recherche par filtre
async function searchFilter(){
  let clearResponse = [];
recipesFilter

  for(let i = 0; i < listTag.length; i++){
    if(listTag[i].type == "ingredients"){
      for(let j = 0; j < recipesFilter.length; j++){
        for(let k = 0; k < recipesFilter[j].ingredients.length; k++){
          if(recipesFilter[j].ingredients[k] == listTag[i].name){            
            clearResponse.push(recipesFilter[j].id);
          }
        }
      }
    } else if(listTag[i].type == "appareils"){
      for(let j = 0; j < recipesFilter.length; j++){
        if(recipesFilter[j].appareils == listTag[i].name){
          clearResponse.push(recipesFilter[j].id);
        }
      }
    } else if(listTag[i].type == "ustenciles"){    
      for(let j = 0; j < recipesFilter.length; j++){
        for(let k = 0; k < recipesFilter[j].ustenciles.length; k++){
          if(recipesFilter[j].ustenciles[k] == listTag[i].name){
            clearResponse.push(recipesFilter[j].id);
          }
        }
      }
    }
  }

  console.log(clearResponse);

//affichage des recettes
  const recipes = await getRecipes();
  let newRecipes = [];
  for(let i = 0; i < recipes.length; i++){
    if(clearResponse.includes(recipes[i].id)){
      newRecipes.push(recipes[i]);
    }
  }

  displayRecipe(newRecipes)
}

async function init() {
  //récupération des recettes
  const array = await getRecipes();

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