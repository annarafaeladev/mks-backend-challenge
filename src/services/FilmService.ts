import { FIlmRequestDto } from "../dto/FilmRequestDto";
import { Film } from "../entities/Film";
import { BadRequestError } from "../helpers/api-errors";
import { filmRepository } from "../repositories/FilmRepository";
import { Not } from "typeorm";

class FilmService {
  async create(request: FIlmRequestDto): Promise<Film> {
    const createFilm = await this.buildCreateFilm(request);

    return await this.savedFilmDB(createFilm);
  }

  async list() {
    const films: Film[] = await filmRepository.find({
      relations: ["favorites"],
    });

    return films;
  }

  async getById(id: number): Promise<Film> {
    const filmExist = await this.findFilmById(id);

    return filmExist;
  }

  async update(id: number, { title, description }: FIlmRequestDto) {
    const filmExist = await this.findFilmById(id);

    await this.findFilmByTitle(title, id);

    filmExist.title = title;

    if (description) filmExist.description = description;

    await filmRepository.save(filmExist);
  }

  async delete(id: number): Promise<void> {
    const filmExist = await this.findFilmById(id);

    await filmRepository.delete(filmExist);
  }

  private async findFilmById(id: number): Promise<Film> {
    const filmExist = await filmRepository.findOneBy({ id });

    if (!filmExist) {
      throw new BadRequestError("filme não encontrado");
    }

    return filmExist;
  }

  private async buildCreateFilm({title , description}: FIlmRequestDto): Promise<Film> {
    await this.findFilmByTitle(title);

    const film = filmRepository.create({
      title,
      description,
    });

    return film;
  }

  private async savedFilmDB(film: Film): Promise<Film> {
    return await filmRepository.save(film);
  }

  private async findFilmByTitle(title: string, id: number | null = null): Promise<void> {
    let isExists: boolean = false;

    if (id != null) {
      const filmExistTitle = await filmRepository.findBy({
        id: Not(id),
        title: title,
      });

      isExists = filmExistTitle && filmExistTitle.length > 0;
    } else {
      const existsFilm = await filmRepository.findOneBy({ title });

      isExists = existsFilm != null;
    }

    if (isExists) {
      throw new BadRequestError("Titulo já cadastrado");
    }
  }
}

export const filmService = new FilmService();
