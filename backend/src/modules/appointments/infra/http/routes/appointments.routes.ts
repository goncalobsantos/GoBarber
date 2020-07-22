import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import logRequests from '@shared/infra/http/middlewares/logRequests';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(logRequests);
appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
