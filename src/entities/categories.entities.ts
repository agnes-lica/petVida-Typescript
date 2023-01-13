import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Pets from "./pets.entities";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Pets, (pets) => pets.category)
  pets: Pets[];
}

export default Category;
