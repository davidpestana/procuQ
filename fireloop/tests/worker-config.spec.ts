var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('WorkerConfig unit tests:', () => {
    it('Should create a WorkerConfig instance', (done: Function) => {
        api.post('/worker-configs').send({
            relation: 'test'
        }).expect(200, done);
    });
});
