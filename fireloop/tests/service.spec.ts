var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Service unit tests:', () => {
    it('Should create a Service instance', (done: Function) => {
        api.post('/services').send({
            name: 'test'
        }).expect(200, done);
    });
});
