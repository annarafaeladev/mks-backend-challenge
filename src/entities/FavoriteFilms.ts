import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./Film";
import { User } from "./User";

@Entity("favorite_films")
export class FavoriteFilm {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favoriteFilms)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Film, film => film.favorites)
  @JoinColumn({ name: "film_id" })
  film: Film;

  constructor(user: User, film: Film) {
    this.user = user;
    this.film = film;
  }
}