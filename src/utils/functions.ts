import Address from "../entities/addresses.entities";
import Hotel from "../entities/hotel.entities";
import User from "../entities/users.entities";

export class Utils {
  static removePassword(user: User): IUserNoPassword {
    const userNopassword: IUserNoPassword = { ...user } as IUserNoPassword;
    delete userNopassword.password;
    return userNopassword;
  }
}

export interface IUserNoPassword {
  id: string;

  name: string;

  bornDate: string;

  whatsapp: string;

  email: string;

  createdAt: Date;

  updatedAt: Date;

  isActive: boolean;

  isAdm: boolean;

  cpf: string;

  hotel: Hotel;

  address: Address;

  password?: string;
}
