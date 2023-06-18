const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// parse incoming requests with json payloads
app.use(bodyParser.json());

// parse incoming requests with url-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from the 'client' directory.
app.use(express.static('../client'));

app.get('/', (req, res) => {
  res.send('Hallo van Express!')
})

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

function readData() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

app.get('/data', (req, res) => {
  readData()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.post('/data', (req, res) => {
  addPerson(req.body)
    .then(() => {
      res.status(201).json({ message: 'Person added' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

function addPerson(person) {
  return new Promise((resolve, reject) => {
    // Read the existing data
    fs.readFile('./data.json', 'utf8', (readErr, data) => {
      if (readErr) {
        reject(readErr);
      } else {
        const people = JSON.parse(data);

        // Add the new person to the data
        people.push(person);

        // Write the updated data back to the file
        fs.writeFile('./data.json', JSON.stringify(people), (writeErr) => {
          if (writeErr) {
            reject(writeErr);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

