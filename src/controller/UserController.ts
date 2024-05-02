import { Controller } from "@nestjs/common";
import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import { CreateUserDto } from "../dto/CreateUserDto";
import { BadRequestError } from "../helpers/api-errors";
import { userService } from "../services/UserService";
import { DefaultUtils } from "../utils/DefaultUtils";

@Controller("users")
class UserController {
  async create(req: Request, res: Response) {
    const body: CreateUserDto = this.getPayloadRequestBodyCreateUserDto(req);

    const userSaved = await userService.createUser(body);

    return res.status(201).json(userSaved);
  }

  async getById(req: Request, res: Response) {
    const id: number = DefaultUtils.getIdRequestParam(req);

    const user = await userService.getById(id);

    return res.status(200).json(user);
  }

  private getPayloadRequestBodyCreateUserDto(req: Request): CreateUserDto {
    const body: CreateUserDto = req.body;

    if (!body.email || !body.name || !body.password) {
      throw new BadRequestError("Campos obrigatorios: email, name, password");
    }

    return body;
  }
}

export const userController = new UserController();
