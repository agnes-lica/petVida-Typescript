import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { loginADm, loginNotADm, notADM, userADm } from "../../mocks/users";
import { hotel1, hotel2 } from "../../mocks/hotel";

describe("/hotels", () => {
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

    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;

    const userResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", tokenADm);

    await request(app)
      .post("/admin/hotel")
      .set("Authorization", tokenADm)
      .send({ ...hotel1, managerId: userResponse.body[0].id });

    await request(app)
      .post("/admin/hotel")
      .set("Authorization", tokenADm)
      .send({ ...hotel2, managerId: userResponse.body[1].id });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("/POST should update a hotel", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;

    const hoteis = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const response = await request(app)
      .patch(`/hotel/${hoteis.body[1].id}`)
      .set("Authorization", token)
      .send({ fantasyName: "Pet Vocation" });

    expect(response.status).toBe(200);
    expect(response.body.fantasyName).toBe("Pet Vocation");

    const hoteisUpdated = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    expect(hoteisUpdated.body[1].fantasyName).not.toBe(
      hoteis.body[1].fantasyName
    );
  });

  test("/PATCH should delete a hotel", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADM = `Barear ${responseLoginADM.body.token}`;

    const hoteis = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADM);

    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const response = await request(app)
      .delete(`/hotel/${hoteis.body[1].id}`)
      .set("Authorization", token);

    expect(response.status).toBe(204);

    const hoteisUpdated = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADM);

    expect(hoteisUpdated.body[1].isActive).toBe(false);
  });

  test("/UPDATE not should delete a hotel", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADM = `Barear ${responseLoginADM.body.token}`;

    const hoteis = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADM);

    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const response = await request(app)
      .delete(`/hotel/${hoteis.body[0].id}`)
      .set("Authorization", token);

    expect(response.status).toBe(401);

    const hoteisUpdated = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADM);

    expect(hoteisUpdated.body[0].isActive).toBe(true);
  });

  test("/UPDATE should not list a hotel's booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADM = `Barear ${responseLoginADM.body.token}`;

    const hoteis = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADM);

    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const booking = await request(app)
      .get(`/hotel/${hoteis.body[0].id}/bookings`)
      .set("Authorization", token);

    expect(booking.status).toBe(401);
    expect(booking.body).toHaveProperty("message");
  });

  test("/UPDATE should  list a hotel's booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADM = `Barear ${responseLoginADM.body.token}`;

    const hoteis = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADM);

    const booking = await request(app)
      .get(`/hotel/${hoteis.body[0].id}/bookings`)
      .set("Authorization", tokenADM);

    expect(booking.status).toBe(200);
    expect(booking.body instanceof Array).toBe(true);
  });
});
