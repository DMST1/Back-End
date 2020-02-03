const db = require("../database/dbConfig");
​
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
  getRelocationCostByID
};
​
function getUserByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}
​
function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}
​
function createMonthlyBudget(budget, id) {
  return db("monthlybudget")
    .insert({ ...budget, user_id: id })
    .then(count => (count > 0 ? this.getMonthlyBudgetByID(id) : null));
}
function updateMonthlyBudget(budget, id) {
  return db("monthlybudget")
    .where("user_id", id)
    .update(budget)
    .then(count => (count > 0 ? this.getMonthlyBudgetByID(id) : null))
}
function getMonthlyBudget(username) {
  return db("users")
    .join("monthlybudget", "users.id", "monthlybudget.user_id")
    .where("users.username", username)
    .select('Transportation','Food','HealthInsurance','CarInsurance','HealthLoans','CarLoans','PersonalLoans', 'OtherDescription','Other')
    .first()
}
function getMonthlyBudgetTotal(username) {
  return db("users")
    .join("monthlybudget", "users.id", "monthlybudget.user_id")
    .where("users.username", username)
    .select('Transportation','Food','HealthInsurance','CarInsurance','HealthLoans','CarLoans','PersonalLoans','Other')
    .first()
}
function getMonthlyBudgetByID(id) {
  return db("users")
    .join("monthlybudget", "users.id", "monthlybudget.user_id")
    .where("users.id", id)
    .select('Transportation','Food','HealthInsurance','CarInsurance','HealthLoans','CarLoans','PersonalLoans','Other','OtherDescription','user_id' )
    .first();    
}
​
// relocation costs
​
function createRelocationCost(budget, id) {
  return db("relocationcost")
    .insert({ ...budget, user_id: id })
    .then(count => (count > 0 ? this.getRelocationCostByID(id) : null));
}
function updateRelocationCost(budget, id) {
  return db("relocationcost")
    .where("user_id", id)
    .update(budget)
    .then(count => (count > 0 ? this.getRelocationCostByID(id) : null))
}
​
function getRelocationCost(username) {
  return db("users")
    .join("relocationcost", "users.id", "relocationcost.user_id")
    .where("users.username", username)
    .select('HotelCost','NewRentalDeposit','UtilityConnection','StorageUnit','NewMonthlyRent','CarRentalCost', 'CellDiconnect', 'CellConnect', 'TruckRental', 'GasForTruck','MentalHealthTreatment','OtherDescription','Other')
    .first()
}
function getRelocationCostTotal(username) {
  return db("users")
    .join("relocationcost", "users.id", "relocationcost.user_id")
    .where("users.username", username)
    .select('HotelCost','NewRentalDeposit','UtilityConnection','StorageUnit','NewMonthlyRent','CarRentalCost', 'CellDiconnect', 'CellConnect', 'TruckRental', 'GasForTruck','MentalHealthTreatment','OtherDescription','Other')
    .first()
}
​
function getRelocationCostByID(id) {
  return db("users")
    .join("relocationcost", "users.id", "relocationcost.user_id")
    .where("users.id", id)
    .select('HotelCost','NewRentalDeposit','UtilityConnection','StorageUnit','NewMonthlyRent','CarRentalCost', 'CellDiconnect', 'CellConnect', 'TruckRental', 'GasForTruck','MentalHealthTreatment','OtherDescription','Other')
    .first();    
}
​
function addUser(user) {
  return db("users").insert(user);
} 