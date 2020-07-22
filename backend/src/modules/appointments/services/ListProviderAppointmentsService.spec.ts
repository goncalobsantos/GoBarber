import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('List provider appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments of a provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 14, 0, 0),
    });

    const appointment3 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_1',
      user_id: 'gobarber_user_24081998',
      date: new Date(2020, 5, 15, 17, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_1',
      year: 2020,
      month: 6,
      day: 15,
    });

    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});
