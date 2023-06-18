const request = require('supertest');
const app = require('./app');

// get
describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/data');
    expect(response.statusCode).toBe(200);
  });
});

// post
describe('POST /data', () => {
    it('responds with json and status code 201', async () => {
      const newPerson = {
        name: "21",
        age: 32,
        mood: "happy",
        image: "img/21.jfif"
      };
  
      const response = await request(app)
        .post('/data')
        .send(newPerson)
        .set('Accept', 'application/json');
  
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Person added');
      // You can also check if the body has the new person object, but this would require you to adjust your server code accordingly.
    });
  });
  
  // put
  describe('PUT /data/:name', () => {
    it('responds with json and status code 200', async () => {
      const updatedPerson = {
        name: "21",
        age: 35,
        mood: "sad",
        image: "img/21.jfif"
      };
  
      const response = await request(app)
        .put(`/data/${updatedPerson.name}`)
        .send(updatedPerson)
        .set('Accept', 'application/json');
  
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Person updated');
      // Again, you can also check if the body has the updated person object.
    });
  });
  
  // delete
  describe('DELETE /data/:name', () => {
    it('responds with json and status code 200', async () => {
      const name = "21";
      const response = await request(app)
        .delete(`/data/${name}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Person deleted');
      // Again, you can also check if the body has no longer the deleted person object.
    });
  });


