import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gonçalo Teste',
      email: 'gonçaloteste@faketesting.com',
      password: 'gongasteste123',
    });

    expect(user).toHaveProperty('id');
    // expect(user).not.toHaveProperty('password')
  });

  it('should not be able to create a user with the same email', async () => {
    await createUser.execute({
      name: 'Gonçalo Teste',
      email: 'gonçaloteste@faketesting.com',
      password: 'gongasteste123',
    });

    await expect(
      createUser.execute({
        name: 'Gonçalo Teste 2',
        email: 'gonçaloteste@faketesting.com',
        password: 'gongasteste234',
      }),
    ).rejects.toBeInstanceOf(AppError);
    // expect(user).not.toHaveProperty('password')
  });
});
