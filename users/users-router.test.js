const request = require("supertest");
const server = require("../api/server");
const Users = require('./users-model')
const db = require('../database/dbConfig')

describe("UserRouter", function() {
  it("runs the tests", function() {
    expect(true).toBe(true);
  });
  describe("Get /api/user", function() {
      beforeEach(async () => {
          await db('users').truncate();
          await db('monthlybudget').truncate();
          await db('relocatingcost').truncate();
          await Users.addUser({username: 'OBST', password: 'testtest'})
      })
    it("should return a user object", function() {
      return request(server)
        .get("/api/user")
        .send({
          username: "OBST"
        })
        .then(res => {
          console.log(res.body);
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty('username', 'OBST')
          expect(res.body).toHaveProperty('password', 'testtest')
        });
    });
  });

  describe("GET /api/user/mb", function() {
      it('should send back an object with mutliple properties, transportation etc', function() {
          return request(server)
          .get('/api/user/mb')
          .send({
              username: 'OBST'
          })
          .then(res => {
              expect(res.body).toHaveProperty('Transportation')
              expect(res.status).toBe(200);
          })
      })
      
  })
  describe("GET /api/user/mb/total", function() {
    it('should send an integer with the total', function() {
      return request(server)
      .get('/api/user/mb/total')
      .send({
        username: 'OBST'
      })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toBe(0)
      })
    })
  })
  describe("PUT /api/user/mb", function() {
    it('should send a body and return all the fields', function() {
      return request(server)
      .put('/api/user/mb')
      .send({
        // username: 'OBST',
        Transportation: 500
      })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('Transportation', 500);
        expect(res.body).toHaveProperty('Food', null)
      })
    })
  })
//   describe("DELETE /api/user", function() {
//     it('should delete a user', function() {
//         return request(server)
//         .delete('/api/user')
//         .send({
//             username: "OBST"
//         })
//         .then(res => {
//             expect(res.status).toBe(200);
//         })
//     })
// })
});
