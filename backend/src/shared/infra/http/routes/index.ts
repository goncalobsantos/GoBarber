import { Router, NextFunction } from 'express';
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/user.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/session.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import providerRoutes from '@modules/appointments/infra/http/routes/providers.routes';
const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/providers', providerRoutes);

export default routes;
