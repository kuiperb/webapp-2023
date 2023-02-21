// Global access
let data;

// Import json data
fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    page1();
  })
  .catch(error => console.error(error));

// Generate table
function generateTable(data, from, to) {
  data = data.slice(from, to);
  let html = '<table><thead><tr>';
  for (let key in data[0]) {
    html += `<th id="${key}-header">${key.toUpperCase()}</th>`;
  }
  html += '</tr></thead><tbody>';
  data.forEach((item) => {
    html += '<tr>';
    for (let key in item) {
      if (key === 'image') {
        html += `<td><img src="${item[key]}" alt="${item.name}" width="200" /></td>`;
      } else {
        html += `<td>${item[key]}</td>`;
      }
    }
    html += '</tr>';
  });
  html += '</tbody></table>';
  return html;
}

// Buttons w/ event listener and slicing function
var button1 = document.getElementById("page-1");
button1.addEventListener("click", page1);

function page1(){
  const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = generateTable(data, 0, 5);
}

var button2 = document.getElementById("page-2");
button2.addEventListener("click", page2);

function page2(){
  const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = generateTable(data, 5, 10);
}

var button3 = document.getElementById("page-3");
button3.addEventListener("click", page3);

function page3(){
  const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = generateTable(data, 10, 13);
}

// Sorting by column
var button4 = document.getElementById("name-header");
button.addEventListener("click", sortTable);

function sortTable(column) {
  jsonData.sort((a, b) => a[Object.keys(a)[column]] > b[Object.keys(b)[column]] ? 1 : -1);
  page1();
}