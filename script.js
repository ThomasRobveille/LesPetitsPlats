function getRecipe(){
  const recipes = fetch('./data/recipes.json')
                  .then(data => data.json())
                  .then(data => data.recipes)
                  .catch(error => console.log(error));

  return recipes;
}

async function searchRecipe() {
  //récupération de l'array des mots
  const words = init();
  console.log(words[0])

  //récupération du mot recherché
  const wordSeeked = document.getElementById('search').value;
  console.log(wordSeeked);

  //boucle de recherche des recettes
  const response = [];
  for(let i = 0; i < words.length; i++){
    for(let j = 0; j < words[i].words.length; j++){
      if(words[i].words[j] == wordSeeked){
        response.push(words[i].id);

        //affichage de la recette
        // document.getElementById('recipe').innerHTML = `<h1>${words[i].id}</h1>`;
        // document.getElementById('recipe').innerHTML += `<p>${words[i].words}</p>`;
      }
    }
  }

  console.log(response);

  // for(let i = 0; i < recipes.length; i++){
  //   let obj = new Object;
  //   obj.id = recipes[i].id;
  //   obj.words = [];
  //   obj.words.push(recipes[i].name.split(' '));
  //   // for(let j = 0; j < recipes[i].ingredients.length; j++){
  //   //   obj.ingredient = recipes[i].ingredients[j].ingredient.split(' ')
  //   // }
  //   // obj.name = recipes[i].name.split(' ')
  //   // obj.description = recipes[i].description.split(' ')

  //   array.push(obj);
  // }
  // console.log(array);

  // for(let i = 0; i < array.length; i++){
  //   let j = 0;
  //   while(array[i].ingredient[j] != input.value){
  //     j++;
  //   }
  //   for(let j = 0; j < array[i].ingredient.length; j++){
  //     if(array[i].ingredient[j] === input.value){
  //       arrayReponse.push(array[i].id);
  //     }
  //   }
  //   for(let k = 0; k < array[i].name.length; k++){
      
  //   }
  //   for(let l = 0; l < array[i].description.length; l++){
  //     if(array[i].description[j] === input.value || array[i].ingredient[j] === input.value || array[i].name[k] === input.value){
  //       arrayReponse.push(array[i].id);
  //     }
  //   }
  // }

  // console.log(arrayReponse);
  }

async function init() {
  //récupération des recettes
  const recipes = await getRecipe();
  
  //boucle de création du array des recettes
  const array = [];
  for(let i = 0; i < recipes.length; i++){
    let obj = new Object;
    obj.id = recipes[i].id;
    obj.words = [];
    for(let j = 0;j < recipes[i].name.split(' ').length; j++){
      obj.words.push(recipes[i].name.split(' ')[j]);
    }
    for(let j = 0;j < recipes[i].description.split(' ').length; j++){
      obj.words.push(recipes[i].description.split(' ')[j]);
    }
    for(let j = 0;j < recipes[i].ingredients.length; j++){
      for(let k = 0;k < recipes[i].ingredients[j].ingredient.split(' ').length; k++){
        obj.words.push(recipes[i].ingredients[j].ingredient.split(' ')[k]);
      }      
    }
    array.push(obj);
  }
  return array;
}