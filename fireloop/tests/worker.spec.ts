var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Worker unit tests:', () => {
    it('Should create a Worker instance', (done: Function) => {
        api.post('/workers').send({
            alias: 'test'
        }).expect(200, done);
    });
});
