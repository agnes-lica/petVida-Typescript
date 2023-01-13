import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Address from "./addresses.entities";
import Hotel from "./hotel.entities";
import Pets from "./pets.entities";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  bornDate: string;

  @Column({ length: 15, unique: true })
  whatsapp: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ length: 11, unique: true })
  cpf: string;

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Pets, (pets) => pets.user)
  pets: Pets[];
}

export default User;
