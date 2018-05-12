var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('WorkerTurnConflict unit tests:', () => {
    it('Should create a WorkerTurnConflict instance', (done: Function) => {
        api.post('/worker-turn-conflicts').send({
            type: 'test'
        }).expect(200, done);
    });
});
