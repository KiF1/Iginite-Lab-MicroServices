import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notifications';
import { Notification } from '../entities/notification';
import { Content } from '@applications/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação'),
      recipientId: 'example-recipient-id',
    })
    await notificationRepository.create(notification);

     await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('shoud not able to cancel a non existing notification', async () => {
      const notificationRepository = new InMemoryNotificationRepository();
      const cancelNotification = new CancelNotification(notificationRepository);
      
      expect(() => {
        return cancelNotification.execute({
          notificationId: 'fake-notification-id'
        });
      }).rejects.toThrow(NotificationNotFound);
    })
});
