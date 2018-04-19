var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('WorkCenter unit tests:', () => {
    it('Should create a WorkCenter instance', (done: Function) => {
        api.post('/work-centers').send({
            name: 'test'
        }).expect(200, done);
    });
});
