function getRecipe() {
const getData = fetch('./data/recipes.json')
  .then(data => data.json())
  .then(data => data.recipes)
  .catch(err => console.log(err));

  return getData;
}