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