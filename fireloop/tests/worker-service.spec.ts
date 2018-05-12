var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('WorkerService unit tests:', () => {
    it('Should create a WorkerService instance', (done: Function) => {
        api.post('/worker-services').send({
            relation: 'test'
        }).expect(200, done);
    });
});
