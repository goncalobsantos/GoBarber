import { Router } from 'express';
import logRequests from '@shared/infra/http/middlewares/logRequests';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';
import { celebrate, Segments, Joi } from 'celebrate';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(logRequests);
profileRouter.use(ensureAuthentication);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
