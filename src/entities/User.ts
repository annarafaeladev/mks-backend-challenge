import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FavoriteFilm } from "./FavoriteFilms";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "name",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({ name: "email", type: "varchar", length: 100, nullable: false, unique: true })
  email: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  @OneToMany(() => FavoriteFilm, (favoriteFilm) => favoriteFilm.user)
  favoriteFilms: FavoriteFilm[];

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
