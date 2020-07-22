interface IEmailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.EMAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'geral@goncalobsantos.me',
      name: 'Gonçalo Santos',
    },
  },
} as IEmailConfig;
