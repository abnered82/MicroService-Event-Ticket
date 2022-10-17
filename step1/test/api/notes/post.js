const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../index.js');
const conn = require('../../../database/config.js');

describe('GET /events', () => {
    before((done) => {
        conn.dbConnection()
        .then(() => done())
        .catch((err) => done(err));
    })

    after((done) => {
        conn.close()
        .then(() => done())
        .catch((err)=>done(err));
    })

    it('OK, this works',(done) =>{
        request(app).get('/events')
        .send({})
    })

})