import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { loginADm, loginNotADm, notADM, userADm } from "../../mocks/users";
import { pet1, pet2, pet3 } from "../../mocks/pets";
import { hotel1 } from "../../mocks/hotel";
import Booking from "../../../entities/booking.entities";

describe("/booking", () => {
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
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const userResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", tokenADm);

    await request(app)
      .post("/admin/hotel")
      .set("Authorization", tokenADm)
      .send({ ...hotel1, managerId: userResponse.body[1].id });

    await request(app)
      .post("/admin/category")
      .set("Authorization", tokenADm)
      .send({ name: "Cachorro" });

    await request(app)
      .post("/admin/category")
      .set("Authorization", tokenADm)
      .send({ name: "Gato" });

    const categoiresResponse = await request(app)
      .get("/admin/categories")
      .set("Authorization", tokenADm);

    const categories = categoiresResponse.body;

    const newPet = {
      ...pet1,
      categoryId: categories[0].id,
    };

    await request(app).post("/pet").set("Authorization", token).send(newPet);
    const newPet2 = {
      ...pet2,
      categoryId: categories[0].id,
    };

    await request(app).post("/pet").set("Authorization", token).send(newPet2);
    const newPet3 = {
      ...pet3,
      categoryId: categories[0].id,
    };

    await request(app)
      .post("/pet")
      .set("Authorization", tokenADm)
      .send(newPet3);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("/POST should confirm booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const userResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", tokenADm);

    const user = userResponse.body;

    const UserPetsReponse = await request(app)
      .get(`/user/${user[1].id}/pets`)
      .set("Authorization", token);

    const userPets = UserPetsReponse.body;

    await request(app)
      .post(`/user/booking/${userPets[0].id}`)
      .send({
        bookingDate: "2022/11/05",
        hotelId: hotels[0].id,
      })
      .set("Authorization", token);

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseconfirm = await request(app)
      .patch(`/booking/confirm/${bookingsResponse.body[0].id}`)
      .set("Authorization", token);

    expect(responseconfirm.status).toBe(200);
    expect(responseconfirm.body).toHaveProperty("message");

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    expect(bookingsResponseUpdate.body[0].isConfirmed).toBe(true);
  });

  test("/POST should checkin booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const userResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", tokenADm);

    const user = userResponse.body;

    const UserPetsReponse = await request(app)
      .get(`/user/${user[1].id}/pets`)
      .set("Authorization", token);

    const userPets = UserPetsReponse.body;

    await request(app)
      .post(`/user/booking/${userPets[0].id}`)
      .send({
        bookingDate: "2022/11/09",
        hotelId: hotels[0].id,
      })
      .set("Authorization", token);

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseCheckin = await request(app)
      .patch(`/booking/checkin/${bookingsResponse.body[0].id}`)
      .set("Authorization", token);

    expect(responseCheckin.status).toBe(200);
    expect(responseCheckin.body).toHaveProperty("message");

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);
    expect(bookingsResponseUpdate.body[0].checkin).toBe(true);
    expect(bookingsResponseUpdate.body[0]).toHaveProperty("dateCheckin");
  });

  test("/POST should not checkin booking if confirm is false ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseCheckin = await request(app)
      .patch(`/booking/checkin/${bookingsResponse.body[1].id}`)
      .set("Authorization", token);

    expect(responseCheckin.status).toBe(400);
    expect(responseCheckin.body).toHaveProperty("message");

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    expect(bookingsResponseUpdate.body[1].checkin).toBe(false);
    expect(bookingsResponseUpdate.body[1].dateCheckin).toBe(null);
  });

  test("/POST should checkout booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseCheckin = await request(app)
      .patch(`/booking/checkout/${bookingsResponse.body[0].id}`)
      .set("Authorization", token);

    expect(responseCheckin.status).toBe(200);
    expect(responseCheckin.body).toHaveProperty("message");

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    expect(bookingsResponseUpdate.body[0].checkout).toBe(true);
    expect(bookingsResponseUpdate.body[0].dateCheckout).not.toBe(null);
  });

  test("/POST should not checkout booking if checkin is false ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseCheckin = await request(app)
      .patch(`/booking/checkout/${bookingsResponse.body[1].id}`)
      .set("Authorization", token);

    expect(responseCheckin.status).toBe(403);
    expect(responseCheckin.body).toHaveProperty("message");

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    expect(bookingsResponseUpdate.body[1].checkout).toBe(false);
    expect(bookingsResponseUpdate.body[1].dateCheckout).toBe(null);
  });

  test("/POST should list a hotel bookings ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const responseListbooking = await request(app)
      .get(`/booking/confirm/${hotels[0].id}`)
      .set("Authorization", token);

    expect(responseListbooking.status).toBe(200);
  });

  test("/POST should list a specific hotel booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseListbooking = await request(app)
      .get(`/booking/confirm/${hotels[0].id}/${bookingsResponse.body[0].id}`)
      .set("Authorization", token);

    expect(responseListbooking.status).toBe(200);
  });

  test("/POST should cancel booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseconfirm = await request(app)
      .patch(`/booking/confirm/${bookingsResponse.body[1].id}`)
      .set("Authorization", token);

    const responseDelete = await request(app)
      .delete(`/booking/confirm/${bookingsResponse.body[1].id}`)
      .set("Authorization", token);

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    expect(responseDelete.status).toBe(204);
    expect(bookingsResponseUpdate.body[1].isConfirmed).toBe(false);
  });

  test("/POST should not cancel booking if checkin is true ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const userResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", tokenADm);

    const user = userResponse.body;

    const UserPetsReponse = await request(app)
      .get(`/user/${user[1].id}/pets`)
      .set("Authorization", token);

    const userPets = UserPetsReponse.body;

    await request(app)
      .post(`/user/booking/${userPets[0].id}`)
      .send({
        bookingDate: "2022/11/10",
        hotelId: hotels[0].id,
      })
      .set("Authorization", token);

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    await request(app)
      .patch(`/booking/confirm/${bookingsResponse.body[2].id}`)
      .set("Authorization", token);

    await request(app)
      .patch(`/booking/checkin/${bookingsResponse.body[2].id}`)
      .set("Authorization", token);

    const responseDelete = await request(app)
      .delete(`/booking/confirm/${bookingsResponse.body[0].id}`)
      .set("Authorization", token);

    expect(responseDelete.status).toBe(400);

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    expect(bookingsResponseUpdate.body[0].isConfirmed).toBe(true);
  });

  test("/POST should not delete booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseconfirm = await request(app)
      .patch(`/booking/confirm/${bookingsResponse.body[1].id}`)
      .set("Authorization", token);

    const responseDelete = await request(app)
      .delete(`/booking/${bookingsResponse.body[1].id}`)
      .set("Authorization", token);

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const bookings = bookingsResponseUpdate.body;

    expect(responseDelete.status).toBe(400);
    expect(bookings.length).toBe(3);
  });

  test("/POST should delete booking ", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseCancel = await request(app)
      .delete(`/booking/confirm/${bookingsResponse.body[1].id}`)
      .set("Authorization", token);

    const responseDelete = await request(app)
      .delete(`/booking/${bookingsResponse.body[1].id}`)
      .set("Authorization", token);

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const bookings = bookingsResponseUpdate.body;
    expect(responseDelete.status).toBe(204);
    expect(bookings.length).toBe(2);
  });

  test("/POST must not confirm the booking of the same pet on the same day", async () => {
    const responseLoginADM = await request(app).post("/login").send(loginADm);
    const tokenADm = `Barear ${responseLoginADM.body.token}`;
    const responseLogin = await request(app).post("/login").send(loginNotADm);
    const token = `Barear ${responseLogin.body.token}`;

    const hotelsResponse = await request(app)
      .get("/admin/hotels")
      .set("Authorization", tokenADm);

    const hotels = hotelsResponse.body;

    const userResponse = await request(app)
      .get("/admin/users")
      .set("Authorization", tokenADm);

    const user = userResponse.body;

    const UserPetsReponse = await request(app)
      .get(`/user/${user[1].id}/pets`)
      .set("Authorization", token);

    const userPets = UserPetsReponse.body;

    await request(app)
      .post(`/user/booking/${userPets[0].id}`)
      .send({
        bookingDate: "2022/11/05",
        hotelId: hotels[0].id,
      })
      .set("Authorization", token);

    const bookingsResponse = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);

    const responseCheckin = await request(app)
      .patch(`/booking/confirm/${bookingsResponse.body[2].id}`)
      .set("Authorization", token);

    expect(responseCheckin.status).toBe(400);
    expect(responseCheckin.body).toHaveProperty("message");

    const bookingsResponseUpdate = await request(app)
      .get(`/hotel/${hotels[0].id}/bookings`)
      .set("Authorization", token);
    expect(bookingsResponseUpdate.body[2].isConfirmed).toBe(false);
  });
});
