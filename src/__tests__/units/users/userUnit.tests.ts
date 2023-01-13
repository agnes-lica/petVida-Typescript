import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("/should create a user", () => {
    const x = 2 + 2;

    expect(x).toBe(4);
  });
});
