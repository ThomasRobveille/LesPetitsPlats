const recipesWords = [];

function getRecipe(){
  const recipes = fetch('./data/recipes.json')
                  .then(data => data.json())
                  .then(data => data.recipes)
                  .catch(error => console.log(error));

  return recipes;
}

async function init() {
  //récupération des recettes
  const array = await getRecipe();
  
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
}

function searchRecipe() {
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

  console.log(clearResponse);  
  }

init();