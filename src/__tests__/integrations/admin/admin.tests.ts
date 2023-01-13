import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { loginADm, loginNotADm, notADM, userADm } from "../../mocks/users";
import { hotel1, hotel2 } from "../../mocks/hotel";

describe("/admin", () => {
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

  test("/POST /admin/users -  /admin/categories - /admin/pets - /admin/hotels :  should list all entities", async () => {
    await request(app).post("/user").send(userADm);
    await request(app).post("/user").send(notADM);

    const responseLogin = await request(app).post("/login").send(loginADm);
    const token = `Barear ${responseLogin.body.token}`;

    const usersResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", token);
    expect(usersResponse.status).toBe(200);
    expect(usersResponse.body instanceof Array).toBe(true);

    const categoriesResponse = await request(app)
      .get("/admin/categories")
      .set("Authorization", token);
    expect(categoriesResponse.status).toBe(200);
    expect(categoriesResponse.body instanceof Array).toBe(true);

    const petsResponse = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);
    expect(petsResponse.status).toBe(200);
    expect(petsResponse.body instanceof Array).toBe(true);

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", token);
    expect(hotelsResponse.status).toBe(200);
    expect(hotelsResponse.body instanceof Array).toBe(true);
  });

  test("/POST should not list all entities", async () => {
    await request(app).post("/user").send(userADm);
    await request(app).post("/user").send(notADM);

    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const usersResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", token);
    expect(usersResponse.status).toBe(403);
    expect(usersResponse.body).toHaveProperty("message");

    const categoriesResponse = await request(app)
      .get("/admin/categories")
      .set("Authorization", token);
    expect(categoriesResponse.status).toBe(403);
    expect(categoriesResponse.body).toHaveProperty("message");
    const petsResponse = await request(app)
      .get("/admin/pets")
      .set("Authorization", token);
    expect(petsResponse.status).toBe(403);
    expect(petsResponse.body).toHaveProperty("message");

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", token);

    expect(hotelsResponse.status).toBe(403);
    expect(hotelsResponse.body).toHaveProperty("message");
  });

  test("/POST /admin/hotel -  should create a hotel", async () => {
    await request(app).post("/user").send(userADm);
    await request(app).post("/user").send(notADM);

    const responseLogin = await request(app).post("/login").send(loginADm);
    const token = `Barear ${responseLogin.body.token}`;

    const userResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", token);

    const response = await request(app)
      .post("/admin/hotel")
      .set("Authorization", token)
      .send({ ...hotel2, managerId: userResponse.body[1].id });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("corporateName");
    expect(response.body).toHaveProperty("cnpj");
    expect(response.body).toHaveProperty("fantasyName");
    expect(response.body.address).toHaveProperty("code");
    expect(response.body.manager).toHaveProperty("name");
    expect(response.body).toHaveProperty("whatsapp");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("email");
    expect(response.body.corporateName).toEqual(hotel2.corporateName);
    expect(response.body.isActive).toEqual(true);
  });

  test("/DELETE /admin/hotel/ - should delete a hotel", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const token = `Barear ${responseLogin.body.token}`;

    const userResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", token);

    const test = await request(app)
      .post("/admin/hotel")
      .set("Authorization", token)
      .send({ ...hotel1, managerId: userResponse.body[0].id });

    const hoteis = await request(app)
      .get("/admin/hotels")
      .set("Authorization", token);

    const response = await request(app)
      .delete(`/admin/hotel/${hoteis.body[1].id}`)
      .set("Authorization", token);

    expect(response.status).toBe(204);

    const hoteisUpdated = await request(app)
      .get("/admin/hotels")
      .set("Authorization", token);

    expect(hoteisUpdated.body[1].isActive).toBe(false);
  });

  test("/UPDATE /admin/hotel/:id should update a hotel", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hoteis = await request(app)
      .get("/admin/hotels")
      .set("Authorization", token);

    const response = await request(app)
      .patch(`/admin/hotel/${hoteis.body[0].id}`)
      .set("Authorization", token)
      .send({ fantasyName: "Pet Vocation" });

    expect(response.status).toBe(200);
    expect(response.body.fantasyName).toBe("Pet Vocation");

    const hoteisUpdated = await request(app)
      .get("/admin/hotels")
      .set("Authorization", token);

    expect(hoteisUpdated.body[0].fantasyName).not.toBe(
      hoteis.body[0].fantasyName
    );
  });

  test("/POST /admin/category - should create a category", async () => {
    await request(app).post("/user").send(userADm);
    await request(app).post("/user").send(notADM);

    const responseLogin = await request(app).post("/login").send(loginADm);
    const token = `Barear ${responseLogin.body.token}`;

    const response = await request(app)
      .post("/admin/category")
      .set("Authorization", token)
      .send({ name: "Aves" });

    expect(response.status).toBe(201);

    const response2 = await request(app)
      .post("/admin/category")
      .set("Authorization", token)
      .send({ name: "Peixe" });

    expect(response2.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response2.body.name).toBe("Peixe");
  });
});
