exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .string("username", 16)
        .notNullable()
        .unique();
      users.string("password", 24).notNullable();
    })
    .createTable("monthlybudget", mbudget => {
      mbudget.increments();
      mbudget.integer("Transportation");
      mbudget.integer("Food");
      mbudget.integer("HealthInsurance");
      mbudget.integer("CarInsurance");
      mbudget.integer("HealthLoans");
      mbudget.integer("CarLoans");
      mbudget.integer("PersonalLoans");
      mbudget.integer("Other");
      mbudget.string("OtherDescription");
      mbudget
        .integer("user_id")
        .unique()
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("relocatingcost", rcost => {
      rcost.increments();
      rcost.integer("HotelCost");
      rcost.integer("NewRentalDeposit");
      rcost.integer("UtilityConnection");
      rcost.integer("StorageUnit");
      rcost.integer("NewMonthlyRent");
      rcost.integer("CarRentalCost");
      rcost.integer("CellDisconnect");
      rcost.integer("CellConnect");
      rcost.integer("TruckRental");
      rcost.integer("GasForTruck");
      rcost.integer("MentalHealthTreatment");
      rcost.integer("Other");
      rcost.string("OtherDescription");

      rcost
        .integer("user_id")
        .unique()
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("relocatingcost")
    .dropTableIfExists("monthlybudget")
    .dropTableIfExists("users");
};
