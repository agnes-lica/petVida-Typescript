import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import {
  loginADm,
  loginNotADm,
  notADM,
  user2,
  userADm,
  userADmAge,
  userADmCpf,
  userADmWhats,
} from "../../mocks/users";
import { pet1 } from "../../mocks/pets";
import { hotel1 } from "../../mocks/hotel";
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

  test("/POST should create a user", async () => {
    const response = await request(app).post("/user").send(userADm);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("bornDate");
    expect(response.body).toHaveProperty("whatsapp");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("ADM");
    expect(response.body.email).toEqual("ADM@kenzie.com");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body.isAdm).toEqual(true);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("/POST shloud not create if email already exist", async () => {
    const response = await request(app).post("/user").send(userADm);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("/POST shloud not create if cpf already exist", async () => {
    const response = await request(app).post("/user").send(userADmCpf);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("/POST shloud not create if whatsApp already exist", async () => {
    const response = await request(app).post("/user").send(userADmWhats);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("/POST User cannot be a minor", async () => {
    const response = await request(app).post("/user").send(userADmAge);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("/login", async () => {
    const response = await request(app).post("/login").send(loginADm);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("/PATCH Should update a user", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const token = `Barear ${responseLogin.body.token}`;

    const UserDataBaseResponse = await request(app)
      .get("/admin/users")
      .set("authorization", token);

    const response = await request(app)
      .patch(`/user/${UserDataBaseResponse.body[0].id}`)
      .set("Authorization", token)
      .send({ name: "Joao Aragao" });

    const UserUpdateResponse = await request(app)
      .get("/admin/users")
      .set("authorization", token);

    expect(response.status).toBe(200);
    expect(UserUpdateResponse.body[0].name).toBe("Joao Aragao");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toBe("Joao Aragao");
  });

  test("/PATCH Should not update a other user ", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLogin.body.token}`;
    const UserDataBaseResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    await request(app).post("/user").send(notADM);
    const responseLoginNotADm = await request(app)
      .post("/login")
      .send(loginNotADm);
    const token = `Barear ${responseLoginNotADm.body.token}`;

    const response = await request(app)
      .patch(`/user/${UserDataBaseResponse.body[0].id}`)
      .set("Authorization", token)
      .send({ name: "Pedro" });

    const UserUpdatedResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(UserUpdatedResponse.body[0].name).not.toBe("Pedro");
  });

  test("/PATCH ADM Should update a other user ", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLogin.body.token}`;
    const UserDataBaseResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    const response = await request(app)
      .patch(`/user/${UserDataBaseResponse.body[1].id}`)
      .set("Authorization", tokenAdm)
      .send({ name: "Pedro" });

    const UserUpdateResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    expect(response.status).toBe(200);
    expect(UserUpdateResponse.body[1].name).toBe("Pedro");
  });

  test(`/PATCH 
      Should no update isAdm
      /isActive
      /funcEmpresaId
      /staffHotelId
  `, async () => {
    const newValue = {
      isAdm: true,
    };

    const responseLogin = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLogin.body.token}`;

    const UserDataBaseResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    const response = await request(app)
      .patch(`/user/${UserDataBaseResponse.body[1].id}`)
      .set("Authorization", tokenAdm)
      .send(newValue);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("/DELETE Should soft delete a user", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLogin.body.token}`;

    const UserDataBaseResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    const response = await request(app)
      .delete(`/user/${UserDataBaseResponse.body[1].id}`)
      .set("Authorization", tokenAdm);

    const UserUpdateResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    expect(UserUpdateResponse.body[1].isActive).toBe(false);

    expect(response.status).toBe(204);
  });

  test("/DELETE Should not delete a outher user", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLogin.body.token}`;

    const responseLoginNotADm = await request(app)
      .post("/login")
      .send(loginNotADm);
    const token = `Barear ${responseLoginNotADm.body.token}`;

    const UserDataBaseResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    const response = await request(app)
      .delete(`/user/${UserDataBaseResponse.body[0].id}`)
      .set("Authorization", token);

    const UserUpdateResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    expect(UserUpdateResponse.body[1].isActive).toBe(false);

    expect(response.status).toBe(403);
  });
  test("/DELETE ADM Should delete a outher user", async () => {
    const responseLoginNotAdm = await request(app)
      .post("/login")
      .send(loginNotADm);
    const token = `Barear ${responseLoginNotAdm.body.token}`;
    await request(app).post("/user").send(user2);

    const responseLogin = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLogin.body.token}`;

    const UserDataBaseResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    const response = await request(app)
      .delete(`/user/${UserDataBaseResponse.body[2].id}`)
      .set("Authorization", tokenAdm);

    const UserUpdateResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    expect(UserUpdateResponse.body[2].isActive).toBe(false);
    expect(response.status).toBe(204);
  });

  test("/GET /user/profile Should show a user data", async () => {
    const responseLogin = await request(app).post("/login").send(loginADm);
    const tokenAdm = `Barear ${responseLogin.body.token}`;

    const UserDataBaseResponse = await request(app)
      .get("/admin/users")
      .set("authorization", tokenAdm);

    const response = await request(app)
      .get(`/user/profile`)
      .set("Authorization", tokenAdm);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(UserDataBaseResponse.body[0].id);
  });

  test("/GET /user/:id/pets Should show a user pets", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADM = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    await request(app)
      .post("/admin/category")
      .send({
        name: "Cachorro",
      })
      .set("Authorization", tokenADM);

    const categoriesResponse = await request(app)
      .get("/admin/categories")
      .set("Authorization", tokenADM);

    const categories = categoriesResponse.body;
    const userResponse = await request(app)
      .get("/user/profile")
      .set("Authorization", token);

    const user = userResponse.body;

    const newPet = {
      ...pet1,
      userId: user.id,
      categoryId: categories[0].id,
    };

    await request(app).post("/pet").set("Authorization", token).send(newPet);

    const response = await request(app)
      .get(`/user/${user.id}/pets`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe("Santiagoo");
    expect(response.body.length).toBe(1);
  });

  test("/POST should creat a booking", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const userDataResponse = await request(app)
      .get("/user/profile")
      .set("Authorization", token);

    const id = userDataResponse.body.id;

    await request(app)
      .post("/admin/hotel")
      .set("Authorization", tokenADm)
      .send({ ...hotel1, managerId: id });

    const responseUserPets = await request(app)
      .get(`/user/${id}/pets`)
      .set("Authorization", token);

    const userPets = responseUserPets.body;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const response = await request(app)
      .post(`/user/booking/${userPets[0].id}`)
      .send({
        bookingDate: "2022/11/05",
        hotelId: hotels[0].id,
      })
      .set("Authorization", token);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("bookingDate");
    expect(response.body.dateCheckin).toBe(null);
    expect(response.body.dateCheckout).toBe(null);
    expect(response.body.checkin).toBe(false);
    expect(response.body.checkout).toBe(false);
    expect(response.body.pets.id).toBe(userPets[0].id);
    expect(response.body.hotel.id).toBe(hotels[0].id);
  });

  test("/POST should not creat a booking", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const userDataResponse = await request(app)
      .get("/user/profile")
      .set("Authorization", token);

    const id = userDataResponse.body.id;

    const responseUserPets = await request(app)
      .get(`/user/${id}/pets`)
      .set("Authorization", token);

    const userPets = responseUserPets.body;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const response = await request(app)
      .post(`/user/booking/${userPets[0].id}`)
      .send({
        bookingDate: "2022/11/05",
        petId: userPets[0].id,
        hotelId: hotels[0].id,
      })
      .set("Authorization", tokenADm);

    expect(response.status).toBe(401);
  });
});
