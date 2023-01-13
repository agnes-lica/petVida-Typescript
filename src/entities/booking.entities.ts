import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import Hotel from "./hotel.entities";
import Pets from "./pets.entities";

@Entity("booking")
class Booking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  bookingDate: Date;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ default: false })
  checkin: boolean;

  @Column({ default: false })
  checkout: boolean;

  @Column({ type: "date", default: null, nullable: true })
  dateCheckin?: Date;

  @Column({ type: "date", default: null, nullable: true })
  dateCheckout?: Date;

  @ManyToOne(() => Pets, { eager: true })
  pets: Pets;

  @ManyToOne(() => Hotel, { eager: true })
  hotel: Hotel;
}

export default Booking;
