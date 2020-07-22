import { Router } from 'express';
import logRequests from '@shared/infra/http/middlewares/logRequests';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import { celebrate, Segments, Joi } from 'celebrate';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.use(logRequests);

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
