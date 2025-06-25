import Request from "supertest";
import app from "../../src/app";
describe("POST /auth/register", () => {
  describe("Given all fields", () => {
    it("Should return the 201 status code", async () => {
      const userData = {
        firstName: "Rakesh",
        lastName: "K",
        email: "rakesh@mern.space",
        password: "secret",
      };
      const response = await Request(app).post("/auth/register").send(userData);
      expect(response.statusCode).toBe(201);
    });

    it("Should return valid JSON response", async () => {
      const userData = {
        firstName: "Rakesh",
        lastName: "K",
        email: "rakesh@mern.space",
        password: "secret",
      };
      const response = await Request(app).post("/auth/register").send(userData);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json"),
      );
      // expect((response.headers as Record<string, string>)['content-type']).toEqual(expect.stringContaining('json'));
    });

    it("Should return the user object", async () => {
      const userData = {
        firstName: "Rakesh",
        lastName: "K",
        email: "rakesh@mern.space",
        password: "secret",
      };
      await Request(app).post("/auth/register").send(userData);
    });
    describe("Fields are missing ", () => {});
  });
});
