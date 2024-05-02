import { Request } from "express";
import { BadRequestError } from "../helpers/api-errors";
export class DefaultUtils {
  public static getIdRequestParam(req: Request): number {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("id invalid");
    }

    return DefaultUtils.convertStringToInt(id);
  }

  public static convertStringToInt(str: string): number {
    return str as unknown as number;
  }
}
