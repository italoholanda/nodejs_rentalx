import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import UsersRepository from "../../../../modules/accounts/infra/typeorm/repositories/users.repository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("missing token", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "a2d10a3211b415832791a6bc6031f9ab"
    ) as IPayload;
    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) throw new AppError("user doesn't exists", 401);

    request.user = { id: user_id };
    next();
  } catch {
    throw new AppError("invalid token!", 401);
  }
}
