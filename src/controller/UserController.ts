import { Controller } from "@nestjs/common";
import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import { CreateUserDto } from "../dto/CreateUserDto";

@Controller("users")
class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password }: CreateUserDto = req.body;

    const user = await userRepository.findOneBy({ email });

    if (user != null) {
      return res.status(400).json({ message: "usuario já cadatrado" });
    }

    const newUser = userRepository.create({
      email,
      name,
      password,
    });

    const userSaved = await userRepository.save(newUser);

    return res.status(201).json(userSaved);
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;      

      if (!id) {
        return res.status(400).json({ message: "id invalid" });
      }

      const userId = id as unknown as number | undefined;

      const user   = await userRepository.findOneBy({id: userId});

      return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
  }
}

export const userController = new UserController();
