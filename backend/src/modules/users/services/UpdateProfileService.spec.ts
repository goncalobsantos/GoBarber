import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('Update User Avatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gonçalo Teste',
      email: 'goncalotesting@testing.com',
      password: 'teste123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Gonçalo Teste 2',
      email: 'goncalotesting2@testing.com',
    });

    expect(updatedUser.name).toBe('Gonçalo Teste 2');
    expect(updatedUser.email).toBe('goncalotesting2@testing.com');
  });

  it('should not be able to update the user profile of non-existent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existent-user-id',
        name: 'Gonçalo Teste 2',
        email: 'goncalotesting2@testing.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to an email already in use', async () => {
    await fakeUsersRepository.create({
      name: 'Gonçalo Testing',
      email: 'goncalotestes@testing.com',
      password: 'teste123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Gonçalo Teste',
      email: 'goncalotesting@testing.com',
      password: 'teste123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gonçalo Teste 2',
        email: 'goncalotestes@testing.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gonçalo Teste',
      email: 'goncalotesting@testing.com',
      password: 'teste123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Gonçalo Teste 2',
      email: 'goncalotesting2@testing.com',
      old_password: 'teste123',
      password: 'teste456',
    });

    expect(updatedUser.password).toBe('teste456');
  });

  it('should not be able to update the user password if the old password was not given', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gonçalo Teste',
      email: 'goncalotesting@testing.com',
      password: 'teste123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gonçalo Teste 2',
        email: 'goncalotesting2@testing.com',
        password: 'teste456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user password if the old password is wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gonçalo Teste',
      email: 'goncalotesting@testing.com',
      password: 'teste123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gonçalo Teste 2',
        email: 'goncalotesting2@testing.com',
        old_password: 'teste12',
        password: 'teste456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
