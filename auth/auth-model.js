const db = require("../database/dbConfig");

module.exports = {
  getUserByUsername,
  addUser
};

function getUserByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(id => {
      return db("monthlybudget")
        .insert({ user_id: id[0] })
        .then(count => {
          return db("relocatingcost")
            .insert({ user_id: id[0] })
            .then(count2 => {
              return id;
            });
        });
    });
  //then create table for
}

async function addUser2(user) {
  let id = await db("users").insert(user, "id");
  await db("monthlybudget").insert(id);
  await db("relocatingcost").insert(id);
  return id;
}
