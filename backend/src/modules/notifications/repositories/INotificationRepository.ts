import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
