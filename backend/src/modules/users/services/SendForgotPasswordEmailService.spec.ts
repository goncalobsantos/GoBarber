import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeEmailProvider: FakeEmailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Send forgot password email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeEmailProvider = new FakeEmailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send email to recover password for user', async () => {
    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Gonçalo teste',
      email: 'gonçaloteste@faketesting.com',
      password: 'teste123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'gonçaloteste@faketesting.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send email to recover password for a non existent user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'gonçaloteste@faketesting.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password user token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Gonçalo teste',
      email: 'gonçaloteste@faketesting.com',
      password: 'teste123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'gonçaloteste@faketesting.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
