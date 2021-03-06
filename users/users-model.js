const db = require("../database/dbConfig");

module.exports = {
  getUserByUsername,
  addUser,
  createMonthlyBudget,
  getMonthlyBudget,
  updateMonthlyBudget,
  getUserById,
  getMonthlyBudgetByID,
  getMonthlyBudgetTotal,
  createRelocationCost,
  updateRelocationCost,
  getRelocationCost,
  getRelocationCostTotal,
  getRelocationCostByID,
  deleteUserByID
};
function deleteUserByID(id) {
  return db("users")
    .where({ id })
    .del()
    .then(count => {
      return db("monthlybudget")
        .where("user_id", id)
        .del()
        .then(count2 => {
          return db("relocatingcost")
            .where("user_id", id)
            .del()
            .then(count3 => {
              return count
            });
        });
    });
}
function getUserByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function createMonthlyBudget(budget, id) {
  return db("monthlybudget")
    .insert({ ...budget, user_id: id }, "id")
    .then(count => (count > 0 ? this.getMonthlyBudgetByID(id) : null));
}
function updateMonthlyBudget(budget, id) {
  return db("monthlybudget")
    .where("user_id", id)
    .update(budget)
    .then(count => (count > 0 ? this.getMonthlyBudgetByID(id) : null));
}
function getMonthlyBudget(username) {
  return db("users")
    .join("monthlybudget", "users.id", "monthlybudget.user_id")
    .where("users.username", username)
    .select(
      "Transportation",
      "Food",
      "HealthInsurance",
      "CarInsurance",
      "HealthLoans",
      "CarLoans",
      "PersonalLoans",
      "OtherDescription",
      "Other"
    )
    .first();
}
function getMonthlyBudgetTotal(username) {
  return db("users")
    .join("monthlybudget", "users.id", "monthlybudget.user_id")
    .where("users.username", username)
    .select(
      "Transportation",
      "Food",
      "HealthInsurance",
      "CarInsurance",
      "HealthLoans",
      "CarLoans",
      "PersonalLoans",
      "Other"
    )
    .first();
}
function getMonthlyBudgetByID(id) {
  return db("users")
    .join("monthlybudget", "users.id", "monthlybudget.user_id")
    .where("users.id", id)
    .select(
      "Transportation",
      "Food",
      "HealthInsurance",
      "CarInsurance",
      "HealthLoans",
      "CarLoans",
      "PersonalLoans",
      "Other",
      "OtherDescription",
      "user_id"
    )
    .first();
}

// relocation costs

function createRelocationCost(budget, id) {
  return db("relocatingcost")
    .insert({ ...budget, user_id: id }, "id")
    .then(count => (count > 0 ? this.getRelocationCostByID(id) : null));
}
function updateRelocationCost(budget, id) {
  return db("relocatingcost")
    .where("user_id", id)
    .update(budget)
    .then(count => (count > 0 ? this.getRelocationCostByID(id) : null));
}
function getRelocationCost(username) {
  return db("users")
    .join("relocatingcost", "users.id", "relocatingcost.user_id")
    .where("users.username", username)
    .select(
      "HotelCost",
      "NewRentalDeposit",
      "UtilityConnection",
      "StorageUnit",
      "NewMonthlyRent",
      "CarRentalCost",
      "CellDisconnect",
      "CellConnect",
      "TruckRental",
      "GasForTruck",
      "MentalHealthTreatment",
      "OtherDescription",
      "Other"
    )
    .first();
}
function getRelocationCostTotal(username) {
  return db("users")
    .join("relocatingcost", "users.id", "relocatingcost.user_id")
    .where("users.username", username)
    .select(
      "HotelCost",
      "NewRentalDeposit",
      "UtilityConnection",
      "StorageUnit",
      "NewMonthlyRent",
      "CarRentalCost",
      "CellDisconnect",
      "CellConnect",
      "TruckRental",
      "GasForTruck",
      "MentalHealthTreatment",
      "Other"
    )
    .first();
}

function getRelocationCostByID(id) {
  return db("users")
    .join("relocatingcost", "users.id", "relocatingcost.user_id")
    .where("users.id", id)
    .select(
      "HotelCost",
      "NewRentalDeposit",
      "UtilityConnection",
      "StorageUnit",
      "NewMonthlyRent",
      "CarRentalCost",
      "CellDisconnect",
      "CellConnect",
      "TruckRental",
      "GasForTruck",
      "MentalHealthTreatment",
      "OtherDescription",
      "Other"
    )
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