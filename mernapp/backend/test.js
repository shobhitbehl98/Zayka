const supertest = require('supertest');
const app = require('./index'); 
const { expect } = require('chai');

const request = supertest(app);

describe('GET /', () => {
  it('responds with "Hello, World!"', async () => {
    const response = await request.get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Hello World!');
  });
});
describe('POST /', () => {
  it('Gets Food Data', async () => {
    const response = await request.post('/api/foodData');
    expect(response.status).to.equal(200);
  });
});
describe('POST /', () => {
  it('Gets User Orders', async () => {
    try {
      const response = await request.post('/api/getmyorders').send({ "email": "shobhitbehl98@gmail.com" });
      console.log(response.status); // Log the response body
      expect(response.status).to.equal(200);
    } catch (error) {
      console.error(error); // Log any errors
      throw error; // Re-throw the error to fail the test
    }
  });
});

// Add more test cases as needed
