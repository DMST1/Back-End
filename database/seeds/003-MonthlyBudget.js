exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex("monthlybudget").insert([
    {
      Transportation: 500,
      Food: 600,
      HealthInsurance: 150,
      CarInsurance: 100,
      HealthLoans: null,
      CarLoans: 100,
      PersonalLoans: 95,
      Other: 45,
      OtherDescription: "Gas",
      user_id: 1
    }
  ]);
};
