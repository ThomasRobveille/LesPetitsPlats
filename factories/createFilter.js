function createFilter(datas, divId) {
  const filter = document.getElementById(divId);

  datas.forEach((data) => {
    const span = document.createElement('span');
    span.textContent = data;
    span.onclick = function() {
      addTag(data, filter.id);
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