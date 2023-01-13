import Hotel from "../../entities/hotel.entities";

export const hotelDb: Hotel[] = [];

export const hotel1 = {
  corporateName: "Joao Pet acomodações LTDA",
  cnpj: "111.222.333/0000-10",
  fantasyName: "Hotel Pet",
  capacity: "10",
  address: {
    street: "Rua 1",
    number: "00",
    code: "0000000",
    state: "AM",
    country: "Brasil",
    city: "Manaus",
  },
  whatsapp: "(00)00000-0000",
  email: "hotelPet@kenzie.com",
};

export const hotel2 = {
  corporateName: "Joao Pet acomodações 2 LTDA",
  cnpj: "111.222.333/0000-10",
  fantasyName: "Hotel Pet 2",
  capacity: "10",
  address: {
    street: "Rua 2",
    number: "02",
    code: "0000001",
    state: "AM",
    country: "Brasil",
    city: "Manaus",
  },
  whatsapp: "(00)00000-1000",
  email: "hotelPet2@kenzie.com",
};
