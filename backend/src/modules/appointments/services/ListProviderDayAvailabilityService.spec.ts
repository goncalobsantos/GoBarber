import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('List provider day availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from given provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 18, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 18, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 18, 17, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 18, 11, 0, 0).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider_1',
      year: 2020,
      month: 6,
      day: 18,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: false },
      ]),
    );
  });
});
