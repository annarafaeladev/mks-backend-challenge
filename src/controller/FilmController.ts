import { Controller } from "@nestjs/common";
import { Request, Response } from "express";
import { filmRepository } from "../repositories/FilmRepository";
import { User } from "../entities/User";

@Controller("films")
class FilmController {
  async create(req: Request, res: Response) {
    const { title, description, user_id } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Invalid title or description" });
    }

    try { const film = filmRepository.create({
        title,
        description,
        user: { id: user_id },
      });

      const filmSave = await filmRepository.save(film);

      return res.status(200).json(filmSave);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const filmController =  new FilmController();