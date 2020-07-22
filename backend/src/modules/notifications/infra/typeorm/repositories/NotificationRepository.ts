import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import { MongoRepository, getMongoRepository } from 'typeorm';

class NotificationRepository implements INotificationRepository {
  private mongoRepository: MongoRepository<Notification>;

  constructor() {
    this.mongoRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.mongoRepository.create({
      recipient_id,
      content,
    });

    await this.mongoRepository.save(notification);
    return notification;
  }
}

export default NotificationRepository;
