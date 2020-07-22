import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const createdUser = await fakeUsersRepository.create({
      name: 'Gonçalo Teste',
      email: 'gonçaloteste@faketesting.com',
      password: 'gongasteste123',
    });

    const authenticatedUser = await authenticateUser.execute({
      email: 'gonçaloteste@faketesting.com',
      password: 'gongasteste123',
    });

    expect(authenticatedUser.user).toBe(createdUser);
    expect(authenticatedUser).toHaveProperty('token');
  });

  it('should not be able to authenticate user if email does not exist', async () => {
    await expect(
      authenticateUser.execute({
        email: 'gonçaloteste@faketesting.com',
        password: 'gongasteste123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user if password is incorrect', async () => {
    await fakeUsersRepository.create({
      name: 'Gonçalo Teste',
      email: 'gonçaloteste@faketesting.com',
      password: 'gongasteste123',
    });
    await expect(
      authenticateUser.execute({
        email: 'gonçaloteste@faketesting.com',
        password: 'gongasteste124',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
