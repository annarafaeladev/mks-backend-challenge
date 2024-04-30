import { Controller } from "@nestjs/common";
import { Request, Response } from "express";
import { FIlmRequestDto } from "../dto/FilmRequestDto";
import { filmService } from "../services/FilmService";
import { BadRequestError } from "../helpers/api-errors";

@Controller("films")
class FilmController {
  async create(req: Request, res: Response) {
    const body: FIlmRequestDto = this.getPayloadRequestBodyFilmDto(req);

    const filmSaved = await filmService.create(body);

    return res.status(200).json(filmSaved);
  }

  async list(req: Request, res: Response) {
    const films = await filmService.list();
    return res.status(200).json(films);
  }

  async getById(req: Request, res: Response) {
    const id: number = this.getIdRequestParam(req);

    const film = await filmService.getById(id);

    return res.status(200).json(film);
  }

  async update(req: Request, res: Response) {
    const id: number = this.getIdRequestParam(req);
    const body = this.getPayloadRequestBodyFilmDto(req);

    const filmExist = await filmService.update(id, body);

    return res.status(200).json(filmExist);
  }

  async delete(req: Request, res: Response) {
    const id: number = this.getIdRequestParam(req);

    await filmService.delete(id);

    return res.sendStatus(204);
  }

  private getIdRequestParam(req: Request): number {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("id invalid");
    }

    return DefaultUtils.convertStringToInt(id);
  }

  private getPayloadRequestBodyFilmDto(req: Request): FIlmRequestDto {
    const body: FIlmRequestDto = req.body;

    if (!body.title) {
      throw new BadRequestError("propriedade title invalido");
    }

    return body;
  }
}

export const filmController = new FilmController();
