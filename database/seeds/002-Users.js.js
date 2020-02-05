exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex("users").insert([
    { username: "TestUser123", password: "$2a$12$5IMRzupBRGYDh4MuoCwLWO3ZsJyLPeMNsVdzCd08dWzSB/7AUnOaO" }
  ]);
};
