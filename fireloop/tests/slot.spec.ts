var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Slot unit tests:', () => {
    it('Should create a Slot instance', (done: Function) => {
        api.post('/slots').send({
            interval: 12345
        }).expect(200, done);
    });
});
