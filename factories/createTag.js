function displayTag(){
  const tags = document.getElementById('tags');
  tags.innerHTML = '';

  listTag.forEach((data) => {
    let tag = document.createElement('div');
    tag.textContent = data.name;
    tag.classList.add('tag');
    if(data.type == "ingredients"){
      tag.classList.add('ingredients');
    } else if(data.type == "appareils"){
      tag.classList.add('appareils');
    } else if(data.type == "ustenciles"){
      tag.classList.add('ustenciles');
    }
    tags.appendChild(tag);
    let close = document.createElement('span');
    close.classList.add('close');
    close.onclick = function(){
      closeTag(data.name);
    }
    close.textContent = 'X';
    tag.appendChild(close);
  });
}

async function closeTag(name){
  for(let i = 0; i < listTag.length; i++){
    if(listTag[i].name == name){
      listTag.splice(i, 1);
    }
  }
  displayTag();
  if(listTag.length == 0){
    const array = await getRecipes();
    displayRecipe(array);
  } else {
    searchFilter();
  }
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