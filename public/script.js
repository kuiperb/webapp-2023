// Global access variable
let data;

// Import json data
fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    page(0, 5);
  })
  .catch(error => console.error(error));

// Generate table
function generateTable(data, from, to) {

  // Slice
  data = data.slice(from, to);

  // Table
  let html = '<table><thead><tr>';
  for (let key in data[0]) {
    html += `<th id="${key}-header">${key.toUpperCase()}</th>`;
  }
  html += '</tr></thead><tbody>';
  data.forEach((item) => {
    html += '<tr>';
    for (let key in item) {
      if (key === 'image') {
        html += `<td><img src="${item[key]}" alt="${item.name}" width="200"/></td>`;
      } else {
        html += `<td>${item[key]}</td>`;
      }
    }
    html += '</tr>';
  });
  html += '</tbody></table>';
  return html;
}

// Generate page
function page(from, to){
  const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = generateTable(data, from, to);
}

function sortByName() {
  data.sort((a, b) => a.name - b.name);
  page(0, 5);
}

function sortByAge() {
  data.sort((a, b) => a.age - b.age);
  page(0, 5);
}

function sortByMood() {
  data.sort((a, b) => a.mood.localeCompare(b.mood));
  page(0, 5);
}

// Event listeners
document.getElementById("page-1").addEventListener("click", () => {
  page(0, 5);
  document.title = "Page 1";
});

document.getElementById("page-2").addEventListener("click", () => {
  page(5, 10);
  document.title = "Page 2";
});

document.getElementById("page-3").addEventListener("click", () => {
  page(10, 13);
  document.title = "Page 3";
});

document.getElementById("name-sort").addEventListener("click", sortByName);
document.getElementById("age-sort").addEventListener("click", sortByAge);
document.getElementById("mood-sort").addEventListener("click", sortByMood);


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}