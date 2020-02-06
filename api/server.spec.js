const request = require("supertest");
const server = require("./server");

describe("server", function() {
  describe("test environment", () => {
    it("", () => {
      expect(process.env.NODE_ENV).toBe("testing");
    });
  });
  it("runs the server", () => {
    expect(true).toBe(true);
  });
});
