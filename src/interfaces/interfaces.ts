export interface IAddress {
  id: string;
}

export interface IHotelRequest {}

export interface IAddressRequest {
  street: string;
  number: string;
  state: string;
  country: string;
  city: string;
  code: string;
}
export interface IUserRequest {
  name: string;
  born_date: string;
  whatsapp: string;
  email: string;
  password: string;
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isAdm: boolean;
  cpf: string;
  hotel_id: string;
}

export interface IUserCreateRequest {
  name: string;
  bornDate: string;
  whatsapp: string;
  email: string;
  cpf: string;
  password: string;
  address: IAddressRequest;
  isAdm: boolean;
}

export interface IUserUpdateRequest {
  name: string;
  whatsapp: string;
  bornDate: string;
  cpf: string;
  addressId: string;
  password: string;
}

export interface IHotelCreateRequest {
  corporateName: string;
  address: IAddress;
  cnpj: string;
  fantasyName: string;
  capacity: number;
  whatsapp: string;
  email: string;
  managerId: string;
}
export interface IHotelUpdateRequest {
  corporateName?: string;
  cnpj?: string;
  fantasyName?: string;
  capacity?: number;
  address: IAddressRequest;
  hotel: IHotelRequest;
}
