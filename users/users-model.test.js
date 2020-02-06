const db = require("../database/dbConfig");
const Users = require("./users-model");

describe("Auth Model", function() {
  describe("test environment", function() {
    it("should use the testing environment", function() {
      expect(process.env.NODE_ENV).toBe("testing");
    });
  });

  describe("deleteUserById", function() {
    beforeEach(async () => {
      await db("users").truncate();
      await db("monthlybudget").truncate();
      await db("relocatingcost").truncate();
    });
    it("deletes a User By ID", async function() {
      await Users.addUser({ username: "Cortana", password: "Beepboop" });
      await Users.addUser({ username: "Master Chief", password: "John117" });
      Users.deleteUserByID(1).then(response => {
        expect(response).toBe(1);
      });
      Users.deleteUserByID(2).then(response => {
        expect(response).toBe(1);
      });
      Users.deleteUserByID(3).then(response => {
        expect(response).toBe(0);
      });
    });
  });
  describe("getUserByUsername(username)", function() {
    beforeEach(async () => {
      await db("users").truncate();
      await db("monthlybudget").truncate();
      await db("relocatingcost").truncate();
    });
    it("Gets a SPECIFIC User by Username", async function() {
      await Users.addUser({ username: "BillSagget", password: "BobBean" });
       let user = await Users.getUserByUsername("BillSagget")
       expect(user.username).toBe('BillSagget');
    });
  });
  describe("getUserById(id)", function() {
    beforeEach(async () => {
      await db("users").truncate();
      await db("monthlybudget").truncate();
      await db("relocatingcost").truncate();
    });
    it("Gets a specific user by id", async function() {
      await Users.addUser({ username: "BillSagget", password: "BobBean" });
      let user = await Users.getUserById(1)
      expect(user.username).toBe('BillSagget');
    });
  });
  describe("createMonthlyBudget(budget, id)", function() {
    beforeEach(async () => {
      await db("users").truncate();
      await db("monthlybudget").truncate();
      await db("relocatingcost").truncate();
    });
    it('Creates a Monthly budget by passing in body info and userid', async function() {
        let budget = {
            transportation: 500
        }
         await Users.addUser({username: "BillSagget", password: "BobBean"})
         let budgets = await Users.createMonthlyBudget(budget, 1);
         expect(budgets.Transportation).toBe(500);
    })
  });
  describe('updateMonthlyBudgetByUsername', function() {
     it('Updates a monthly budget by passing in body info and userid', async function(){
        let budget = {
            Transportation: 600,
            Food: 150,
        }
        let updateBudget = await Users.updateMonthlyBudget(budget, 1)
        expect(updateBudget.Transportation).toBe(600)
        expect(updateBudget.Food).toBe(150);
     })
  })
  describe('getMonthlyBudget pass in Username',  function() {
      it('Gets monthly budget', async function() {
          let getBudget = await Users.getMonthlyBudget('BillSagget')
          expect(getBudget.Transportation).toBe(600)
          expect(getBudget.Food).toBe(150);
      })
  })
  describe('getMonthlyBudgetTotal pass in username', function() {
      it('Gets monthly budget total', async function() {
          let Total = await Users.getMonthlyBudgetTotal('BillSagget')
          expect(Total).toEqual({
              Transportation: 600,
              Food: 150,
              CarInsurance: null,
              CarLoans: null,
              HealthInsurance: null,
              HealthLoans: null,
              PersonalLoans: null,
              Other: null
          });
      })
  })
  describe('getMonthlyBudget pass in ID',  function() {
    it('Gets monthly budget', async function() {
        let getBudget = await Users.getMonthlyBudgetByID(1)
        expect(getBudget.Transportation).toBe(600)
        expect(getBudget.Food).toBe(150);
    })
})
});
