var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('AssingationFeed unit tests:', () => {
    it('Should create a AssingationFeed instance', (done: Function) => {
        api.post('/assingation-feeds').send({}).expect(200, done);
    });
});
