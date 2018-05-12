var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Turn unit tests:', () => {
    it('Should create a Turn instance', (done: Function) => {
        api.post('/turns').send({}).expect(200, done);
    });
});
