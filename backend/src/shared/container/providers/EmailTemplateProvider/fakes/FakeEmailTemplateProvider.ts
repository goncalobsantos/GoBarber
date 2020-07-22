import IEmailTemplateProvider from '../models/IEmailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class FakeEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse({ file }: IParseEmailTemplateDTO): Promise<string> {
    return 'Mail content';
  }
}

export default FakeEmailTemplateProvider;
