import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { loginADm, loginNotADm, notADM, userADm } from "../../mocks/users";
import { pet1, pet2, pet3 } from "../../mocks/pets";

describe("/pets", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/user").send(userADm);
    await request(app).post("/user").send(notADM);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("/POST should create a pet", async () => {
    const responseLoginAdm = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLoginAdm.body.token}`;

    await request(app)
      .post("/admin/category")
      .send({
        name: "Cachorro",
      })
      .set("Authorization", tokenAdm);

    const responseCategories = await request(app)
      .get("/admin/categories")
      .set("Authorization", tokenAdm);

    const categories = responseCategories.body;

    const newPet = {
      ...pet1,
      categoryId: categories[0].id,
    };

    const response = await request(app)
      .post("/pet")
      .set("Authorization", tokenAdm)
      .send(newPet);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toEqual("Santiagoo");
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("/GET should get a pet info", async () => {
    const responseLoginAdm = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLoginAdm.body.token}`;

    const responsePets = await request(app)
      .get("/admin/pets")
      .set("Authorization", tokenAdm);

    const PetsDb = responsePets.body;

    const response = await request(app)
      .get(`/pet/${PetsDb[0].id}`)
      .set("Authorization", tokenAdm);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Santiagoo");
  });

  test("/GET should not get a other owner pet info", async () => {
    let responseLogin = await request(app).post("/login").send(loginADm);
    let token = `Barear ${responseLogin.body.token}`;

    const responsePets = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);

    const PetsDb = responsePets.body;

    responseLogin = await request(app).post("/login").send(loginNotADm);
    token = `Barear ${responseLogin.body.token}`;

    const response = await request(app)
      .get(`/pet/${PetsDb[0].id}`)
      .set("Authorization", token);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("/PATCH should update a pet", async () => {
    let responseLogin = await request(app).post("/login").send(loginADm);
    let token = `Barear ${responseLogin.body.token}`;

    const responsePets = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);

    const PetsDb = responsePets.body;

    await request(app)
      .post("/admin/category")
      .send({ name: "Gato" })
      .set("Authorization", token);

    const responseCategories = await request(app)
      .get("/admin/categories")
      .set("Authorization", token);

    const categories = responseCategories.body;

    const response = await request(app)
      .patch(`/pet/${PetsDb[0].id}`)
      .set("Authorization", token)
      .send({ name: "Liao" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Liao");
  });

  test("/PATCH not should update a pet", async () => {
    let responseLogin = await request(app).post("/login").send(loginADm);
    let token = `Barear ${responseLogin.body.token}`;

    const responsePets = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);
    const PetsDb = responsePets.body;

    const responseCategories = await request(app)
      .get("/admin/categories")
      .set("Authorization", token);

    const categories = responseCategories.body;

    responseLogin = await request(app).post("/login").send(loginNotADm);
    token = `Barear ${responseLogin.body.token}`;

    const response = await request(app)
      .patch(`/pet/${PetsDb[0].id}`)
      .set("Authorization", token)
      .send({ name: "Liao", categoryId: `${categories[1].id}` });
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("/DELETE should a delete a pet", async () => {
    let responseLogin = await request(app).post("/login").send(loginADm);
    let token = `Barear ${responseLogin.body.token}`;

    const responseCategories = await request(app)
      .get("/admin/categories")
      .set("Authorization", token);

    const categories = responseCategories.body;
    responseLogin = await request(app).post("/login").send(loginNotADm);
    token = `Barear ${responseLogin.body.token}`;

    const responseprofile = await request(app)
      .get("/user/profile")
      .set("Authorization", token);

    const newPet1 = {
      ...pet2,
      userId: responseprofile.body.id,
      categoryId: categories[0].id,
    };
    await request(app).post("/pet").set("Authorization", token).send(newPet1);

    const newPet2 = {
      ...pet3,
      userId: responseprofile.body.id,
      categoryId: categories[0].id,
    };

    await request(app).post("/pet").set("Authorization", token).send(newPet2);

    responseLogin = await request(app).post("/login").send(loginADm);
    token = `Barear ${responseLogin.body.token}`;

    const responsePets = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);

    const PetsDb = responsePets.body;

    const response = await request(app)
      .delete(`/pet/${PetsDb[1].id}`)
      .set("Authorization", token);

    const newResponse = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);

    const PetsDbUpdated = newResponse.body;

    expect(PetsDb.length).toBe(3);
    expect(response.status).toBe(204);
    expect(PetsDbUpdated[1].isActive).toBe(false);
  });

  test("/DELETE should not a delete a other user's pet", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLogin.body.token}`;

    const responsePets = await request(app)
      .get("/admin/pets")
      .set("Authorization", tokenADm);

    const PetsDb = responsePets.body;

    const responseLoginNotADm = await request(app)
      .post("/login")
      .send(loginNotADm);
    const token = `Barear ${responseLoginNotADm.body.token}`;

    const response = await request(app)
      .delete(`/pet/${PetsDb[0].id}`)
      .set("Authorization", token);

    expect(PetsDb.length).toBe(3);
    expect(PetsDb[0].isActive).toBe(true);
  });

  test("/DELETE ADM should a delete a other user's pet", async () => {
    let responseLogin = await request(app).post("/login").send(loginADm);
    let token = `Barear ${responseLogin.body.token}`;

    const responsePets = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);

    const PetsDb = responsePets.body;

    const response = await request(app)
      .delete(`/pet/${PetsDb[2].id}`)
      .set("Authorization", token);

    const newResponse = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);

    const PetsDbUpdated = newResponse.body;

    expect(PetsDb.length).toBe(3);
    expect(response.status).toBe(204);
    expect(PetsDbUpdated[2].isActive).toBe(false);
  });
});
