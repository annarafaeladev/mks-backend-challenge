import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FavoriteFilm } from "./FavoriteFilms";

@Entity("films")
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "title", type: "varchar", length: 255, nullable: false, unique: true})
  title: string;

  @Column({name: "description", type: "varchar",  length: 255, nullable: true})
  description: string;

  @OneToMany(() => FavoriteFilm, favoriteFilm => favoriteFilm.film)
  favorites: FavoriteFilm[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
