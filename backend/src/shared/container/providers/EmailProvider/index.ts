import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import EtherealEmailProvider from '@shared/container/providers/EmailProvider/implementations/EtherealEmailProvider';
import SESEmailProvider from '@shared/container/providers/EmailProvider/implementations/SESEmailProvider';

const providers = {
  ethereal: container.resolve(EtherealEmailProvider),
  ses: container.resolve(SESEmailProvider),
};

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  providers[mailConfig.driver],
);
