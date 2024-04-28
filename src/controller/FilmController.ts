import { Controller } from "@nestjs/common";
import { Request, Response } from "express";
import { filmRepository } from "../repositories/FilmRepository";
import { User } from "../entities/User";
import { Film } from "../entities/Film";
import { FilmUpdateDto } from "../dto/FilmUpdateDto";
import { Not, Equal } from "typeorm";

@Controller("films")
class FilmController {
  async create(req: Request, res: Response) {
    const { title, description, user_id } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Invalid title or description" });
    }

    const existsFilm = await filmRepository.findOneBy({ title });

    if (existsFilm) {
      return res.status(400).json({ message: "filme já cadastrado" });
    }

    try {
      const film = filmRepository.create({
        title,
        description,
      });

      const filmSaved = await filmRepository.save(film);

      return res.status(200).json(filmSaved);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const films: Film[] = await filmRepository.find({
        relations: ["favorites"],
      });

      return res.status(200).json(films);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "id invalid" });
      }

      const filmId = id as unknown as number | undefined;

      const filmExist = await filmRepository.findOneBy({ id: filmId });

      if (!filmExist) {
        return res.status(400).json({ message: "filme não encontrado" });
      }

      return res.status(200).json(filmExist);
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description }: FilmUpdateDto = req.body;

      const filmId = id as unknown as number | undefined;

      if (!id) {
        return res.status(400).json({ message: "id invalid" });
      }

      if (!title) {
        return res.status(400).json({ message: "propriedade title invalido" });
      }

      const filmExist = await filmRepository.findOneBy({ id: filmId });

      if (!filmExist) {
        return res.status(400).json({ message: "filme não encontrado" });
      }

      const filmExistTitle = await filmRepository.findBy({
        id: Not(filmExist.id),
        title: title
      });

      if (filmExistTitle && filmExistTitle.length > 0) {
        return res.status(400).json({ message: "titulo já cadastrado" });
      }

      filmExist.title = title;

      if (description) filmExist.description = description;

      await filmRepository.save(filmExist);

      return res.status(200).json(filmExist);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "id invalid" });
      }

      const filmId = id as unknown as number | undefined;

      const filmExist = await filmRepository.findOneBy({ id: filmId });

      if (!filmExist) {
        return res.status(404).json({ message: "filme não encontrado" });
      }

      await filmRepository.delete(filmExist);

      return res.sendStatus(204);

    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    }
  }
}

export const filmController = new FilmController();
