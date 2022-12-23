function factoryRecipes(recipes){
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