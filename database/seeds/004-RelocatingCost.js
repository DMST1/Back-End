exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex("relocatingcost").insert([
    {
      HotelCost: 500,
      NewRentalDeposit: 600,
      UtilityConnection: 150,
      StorageUnit: 100,
      NewMonthlyRent: 50,
      CarRentalCost: 100,
      CellDisconnect: 95,
      CellConnect: 45,
      TruckRental: 150,
      GasForTruck: 50,
      MentalHealthTreatment: 100,
      Other: 69,
      OtherDescription: "Buy some memes",
      user_id: 1
    }
  ]);
};
