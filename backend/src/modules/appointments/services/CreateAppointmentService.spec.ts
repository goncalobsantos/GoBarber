import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 10, 13),
      user_id: 'gobarber_user_24081998',
      provider_id: 'gobarber_provider_24082020',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('gobarber_provider_24082020');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 5, 12, 12);

    await createAppointment.execute({
      provider_id: 'gobarber_provider_24082020',
      user_id: 'gobarber_user_24081998',
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        provider_id: 'gobarber_provider_24082020',
        user_id: 'gobarber_user_24081998',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create two appointments on the same date if provider is not the same', async () => {
    const appointmentDate = new Date(2020, 5, 12, 12);

    const appointment1 = await createAppointment.execute({
      provider_id: 'gobarber_provider_24082020',
      user_id: 'gobarber_user_24081998',
      date: appointmentDate,
    });

    const appointment2 = await createAppointment.execute({
      provider_id: 'gobarber_provider_27031995',
      user_id: 'gobarber_user_24081998',
      date: appointmentDate,
    });

    expect(appointment1).toHaveProperty('id');
    expect(appointment1.provider_id).toBe('gobarber_provider_24082020');
    expect(appointment2).toHaveProperty('id');
    expect(appointment2.provider_id).toBe('gobarber_provider_27031995');
  });

  it('should not be able to create an appointment on an old date', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 11),
        user_id: 'gobarber_user_24081998',
        provider_id: 'gobarber_provider_24082020',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same provider and user id', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 13),
        user_id: 'gobarber_user_24081998',
        provider_id: 'gobarber_user_24081998',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8h', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 7),
        user_id: 'gobarber_user_24081998',
        provider_id: 'gobarber_provider_24081998',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment after 17h', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 18),
        user_id: 'gobarber_user_24081998',
        provider_id: 'gobarber_provider_24081998',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
