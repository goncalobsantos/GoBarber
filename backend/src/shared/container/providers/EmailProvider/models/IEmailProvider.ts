import ISendEmailDTO from '../dtos/ISendEMailDTO';

export default interface IEmailProvider {
  sendMail(data: ISendEmailDTO): Promise<void>;
}
