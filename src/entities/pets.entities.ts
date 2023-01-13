import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Booking from "./booking.entities";
import Category from "./categories.entities";
import User from "./users.entities";

@Entity("pet")
class Pets {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Booking, (bookings) => bookings.pets)
  bookings: Booking[];
}

export default Pets;
