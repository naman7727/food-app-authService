import request from "supertest";
import app from "../../src/app";
// import { DataSource } from "typeorm";
// import { AppDataSource } from "../../src/config/data-source";
// import { truncateTables } from "../utils";
// import { User } from "../../src/entity/User";
describe("POST /auth/register", () => {
  // let connection: DataSource;

  // beforeAll(async () => {
  //   connection = await AppDataSource.initialize();
  // });

  // beforeEach(async () => {
  //   // Database truncate
  //   await truncateTables(connection)
  // });

  // afterAll(async () => {
  //   if (connection && connection.isInitialized) {
  //     await connection.destroy();
  //   }
  // });

  describe("Given all fields", () => {
    it("Should return the 201 status code", async () => {
      const userData = {
        firstName: "Rakesh",
        lastName: "K",
        email: "rakesh@mern.space",
        password: "secret",
      };
      const response = await request(app).post("/auth/register").send(userData);
      expect(response.statusCode).toBe(201);
    });

    it("Should return valid JSON response", async () => {
      const userData = {
        firstName: "Rakesh",
        lastName: "K",
        email: "rakesh@mern.space",
        password: "secret",
      };
      const response = await request(app).post("/auth/register").send(userData);
      // expect(response.headers["content-type"]).toEqual(
      //   expect.stringContaining("json"),
      // );
      expect(
        (response.headers as Record<string, string>)["content-type"],
      ).toEqual(expect.stringContaining("json"));
    });

    it("Should return the user in the database", async () => {
      // Arrange
      const userData = {
        firstName: "Rakesh",
        lastName: "K",
        email: "rakesh@mern.space",
        password: "secret",
      };
      // Act
      await request(app).post("/auth/register").send(userData);

      // Assert
      //   const userRepository = connection.getRepository(User);
      //   const users = await userRepository.find();
      //   expect(users).toHaveLength(1);
    });
  });
  describe("Fields are missing ", () => {});
});
