var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('test unit tests:', () => {
    it('Should create a test instance', (done: Function) => {
        api.post('/tests').send({
            name: 'test'
        }).expect(200, done);
    });
});
