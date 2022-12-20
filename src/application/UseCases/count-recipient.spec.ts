import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { Content } from '@applications/entities/content';
import { CountRecipientNotifications } from './count-notification';

describe('Count recipient Notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(notificationRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação'),
      recipientId: 'example-recipient-id',
    })
    await notificationRepository.create(notification);

     await countRecipientNotifications.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });
});
