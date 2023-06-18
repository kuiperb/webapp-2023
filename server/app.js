const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');

module.exports = app;

app.use(cors({
  origin: 'http://localhost:3000'
}));

// parse incoming requests with json payloads
app.use(bodyParser.json());

// parse incoming requests with url-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from the 'client' directory.
app.use(express.static('../client'));

// serve img
app.use('/img', express.static('img'));

app.get('/', (req, res) => {
  res.send('Hallo van Express!')
})

// routes 
app.post('/data', (req, res) => {
  addPerson(req.body)
    .then(() => {
      res.status(201).json({ message: 'Person added' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.get('/data', (req, res) => {
  readData()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.put('/data/:name', (req, res) => {
  updatePerson(req.params.name, req.body)
      .then(() => {
          res.json({ message: 'Person updated' });
      })
      .catch((err) => {
          res.status(500).json({ message: err.message });
      });
});

app.delete('/data/:name', (req, res) => {
  deletePerson(req.params.name)
      .then(() => {
          res.json({ message: 'Person deleted' });
      })
      .catch((err) => {
          res.status(500).json({ message: err.message });
      });
});

// controllers
function addPerson(person) {
  return new Promise((resolve, reject) => {
    fs.readFile('./data.json', 'utf8', (readErr, data) => {
      if (readErr) {
        reject(readErr);
      } else {
        const people = JSON.parse(data);

        people.push(person);

        fs.writeFile('./data.json', JSON.stringify(people, null, 2), (writeErr) => {
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

function updatePerson(name, newPerson) {
  return new Promise((resolve, reject) => {
      fs.readFile('./data.json', (readErr, data) => {
          if (readErr) {
              reject(readErr);
              return;
          }

          let people = JSON.parse(data);

          for (let i = 0; i < people.length; i++) {
              if (people[i].name == name) {
                  people[i] = newPerson;
                  fs.writeFile('./data.json', JSON.stringify(people, null, 2), (writeErr) => {
                      if (writeErr) {
                          reject(writeErr);
                          return;
                      }

                      resolve();
                  });

                  return;
              }
          }

          reject(new Error('Person not found'));
      });
  });
}

function deletePerson(name) {
  return new Promise((resolve, reject) => {
      fs.readFile('./data.json', (readErr, data) => {
          if (readErr) {
              reject(readErr);
              return;
          }

          let people = JSON.parse(data);
          let initialLength = people.length;

          people = people.filter((person) => person.name != name);

          if (people.length == initialLength) {
              reject(new Error('Person not found'));
              return;
          }

          fs.writeFile('./data.json', JSON.stringify(people, null, 2), (writeErr) => {
              if (writeErr) {
                  reject(writeErr);
                  return;
              }

              resolve();
          });
      });
  });
}

