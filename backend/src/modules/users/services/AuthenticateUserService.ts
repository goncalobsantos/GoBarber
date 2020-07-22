import User from '@modules/users/infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const validUser = await this.usersRepository.findByEmail(email);

    if (!validUser) {
      throw new AppError('Email or password are incorrect', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      validUser.password,
    );

    if (!passwordMatched) {
      throw new AppError('Email or password are incorrect', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: validUser.id,
      expiresIn: expiresIn,
    });

    return {
      user: validUser,
      token,
    };
  }
}

export default AuthenticateUserService;
