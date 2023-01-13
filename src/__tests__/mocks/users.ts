interface IUserRequest {
  name: string;
  bornDate: string;
  whatsapp: string;
  email: string;
  cpf: string;
  password: string;
  address: IAddressRequest;
  isAdm?: Boolean;
}

interface IAddressRequest {
  street: string;
  number: string;
  code: string;
  state: string;
  country: string;
  city: string;
}

export const userADm: IUserRequest = {
  name: "ADM",
  bornDate: "1990/01/01",
  whatsapp: "(00)00000-0000",
  email: "ADM@kenzie.com",
  cpf: "00000000000",
  password: "123456",
  address: {
    street: "Rua 1",
    number: "00",
    code: "0000000",
    state: "AM",
    country: "Brasil",
    city: "Manaus",
  },
  isAdm: true,
};
export const notADM: IUserRequest = {
  name: "João",
  bornDate: "1990/01/01",
  whatsapp: "(00)99999-1000",
  email: "joao@kenzie.com",
  cpf: "10101010101010",
  password: "123456",
  address: {
    street: "Rua 1",
    number: "00",
    code: "0000000",
    state: "AM",
    country: "Brasil",
    city: "Manaus",
  },
  isAdm: false,
};

export const userADmCpf: IUserRequest = {
  name: "userADmCpf",
  bornDate: "1990/01/01",
  whatsapp: "(00)00000-0000",
  email: "ADM2@kenzie.com",
  cpf: "00000000000",
  password: "123456",
  address: {
    street: "Rua 1",
    number: "00",
    code: "0000000",
    state: "AM",
    country: "Brasil",
    city: "Manaus",
  },
  isAdm: true,
};

export const userADmWhats: IUserRequest = {
  name: "userADmWhats",
  bornDate: "1990/01/01",
  whatsapp: "(00)00000-0000",
  email: "ADM2@kenzie.com",
  cpf: "112123121",
  password: "123456",
  address: {
    street: "Rua 1",
    number: "00",
    code: "0000000",
    state: "AM",
    country: "Brasil",
    city: "Manaus",
  },
  isAdm: true,
};

export const userADmAge = {
  name: "userADmAge",
  bornDate: "2010/01/01",
  whatsapp: "(00)11454-1111",
  email: "ADM3@kenzie.com",
  cpf: "112123121",
  password: "123456",
  address: {
    street: "Rua 1",
    number: "00",
    code: "0000000",
    state: "AM",
    country: "Brasil",
    city: "Manaus",
  },
  isAdm: true,
};

interface ILogin {
  email: string;
  password: string;
}

export const loginADm: ILogin = {
  email: "ADM@kenzie.com",
  password: "123456",
};

export const loginNotADm: ILogin = {
  email: "joao@kenzie.com",
  password: "123456",
};

export const user2 = {
  name: "DeletaDo",
  bornDate: "1990/01/01",
  whatsapp: "(00)20000-1000",
  email: "deletado@kenzie.com",
  cpf: "00000000002",
  password: "123456",
  address: {
    street: "Rua 1",
    number: "00",
    code: "0000000",
    state: "AM",
    country: "Brasil",
    city: "Manaus",
  },
  isAdm: false,
};
