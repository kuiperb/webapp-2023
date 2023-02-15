fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = generateTable(data.slice(0, 5));
  })
  .catch(error => console.error(error));

function generateTable(data) {
  let html = '<table><thead><tr>';
  for (let key in data[0]) {
    html += `<th>${key.toUpperCase()}</th>`;
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