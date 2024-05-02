import { CreateUserDto } from "../dto/CreateUserDto";
import { FIlmRequestDto } from "../dto/FilmRequestDto";
import { Film } from "../entities/Film";
import { BadRequestError } from "../helpers/api-errors";
import { filmRepository } from "../repositories/FilmRepository";
import { Not } from "typeorm";
import { userRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

class UserService {
  async createUser({ email, password, name }: CreateUserDto): Promise<User> {
    const user: User | null = await this.findByEmail(email);

    if (user != null) {
      throw new BadRequestError("usuario já cadatrado");
    }

    const newUser = this.buildCreateUser(email, name, password);

    const userSaved = await this.saveUserDB(newUser);

    return userSaved;
  }

  async getById(id: number): Promise<User> {
    const userExist = await this.findUserById(id);

    return userExist;
  }

  async delete(id: number): Promise<void> {
    const filmExist = await this.findUserById(id);

    await filmRepository.delete(filmExist);
  }

  private async saveUserDB(newUser: User): Promise<User> {
    return await userRepository.save(newUser);
  }

  private buildCreateUser(email: string, name: string, password: string): User {
    return userRepository.create({
      email,
      name,
      password,
    });
  }

  private async findByEmail(email: string): Promise<User | null> {
    const user = await userRepository.findOneBy({ email });

    return user;
  }

  private async findUserById(id: number): Promise<User> {
    const userExists = await userRepository.findOneBy({ id });

    if (!userExists) {
      throw new BadRequestError("Usuario não encontrado");
    }

    return userExists;
  }
}

export const userService = new UserService();
