import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Address from "./addresses.entities";
import Booking from "./booking.entities";
import User from "./users.entities";

@Entity("hotel")
class Hotel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, unique: true })
  corporateName: string;

  @Column({ length: 19 })
  cnpj: string;

  @Column({ length: 255, unique: true })
  fantasyName: string;

  @Column({ type: "integer" })
  capacity: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 15 })
  whatsapp: string;

  @Column({ length: 50 })
  email: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToOne(() => User)
  @JoinColumn()
  manager: User;

  @OneToMany(() => User, (users) => users.hotel)
  employers: User[];

  @OneToMany(() => Booking, (bookings) => bookings.hotel)
  bookings: Booking[];
}

export default Hotel;
