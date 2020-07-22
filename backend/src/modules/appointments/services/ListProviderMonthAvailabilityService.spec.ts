import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('List provider month availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from given provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 18, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'provider_1',
      year: 2020,
      month: 6,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 15, available: false },
        { day: 16, available: true },
        { day: 17, available: true },
        { day: 18, available: true },
      ]),
    );
  });
});
