const request = require("supertest");
const server = require("../api/server");

const db = require('../database/dbConfig')

describe("authrouter", function() {
  it("runs the tests", function() {
    expect(true).toBe(true);
  });
  describe("POST /api/auth/register", function() {
    beforeEach(function(){
      db('users').truncate();
      db('monthlybudget').truncate()
      db('relocatingcost').truncate();
    })
    it("should return 201 created when sending a username and password", function() {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "ODST",
          password: "OrbitalDrop"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it("should return 500 error when no body is sent", function() {
      return request(server)
        .post("/api/auth/register")
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });
  describe('POST /api/auth/login', function() {
    
      it('should return status 200 when sending valid login info', function() {
          return request(server)
          .post('/api/auth/login')
          .send({
              username: 'ODST',
              password: 'OrbitalDrop'
          })
          .then(res => {
              expect(res.status).toBe(200);
          })
      })
      it('should return status 401 when sending invalid login info', function(){
          return request(server)
          .post('/api/auth/login')
          .send({
              username: 'ODST',
              password: 'OrbitalDroop'
          })
          .then(res => {
              expect(res.status).toBe(401);
          })
      })
      it('should return status 500 when sending invalid body', function() {
          return request(server)
          .post('/api/auth/login')
          .send({
              username: 'ODST',
              bassword: 'OrbitalDrop'
          })
          .then(res => {
              expect(res.status).toBe(500);
          })
      })
  })
});
