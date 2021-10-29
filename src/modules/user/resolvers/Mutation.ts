import { UserProvider } from './../providers/UserProvider'
import {
  MutationResolvers,
  MutationUpdateUserArgs,
  NotificationStatus,
  MutationSendPushNotificationArgs,
  NotificationType,
} from '@models'
import { ContextType } from 'lib/Context'
import { PushNotificationUtil } from 'utils/PushNotificationUtil'
import { NotificationAlert, NotificationPayload } from 'types/global'

export const Mutation: MutationResolvers = {
  async updateUser(root: any, args: MutationUpdateUserArgs, { injector, user }: ContextType): Promise<any> {
    user = await injector.get(UserProvider).updateUser(user, args.input)

    return user
  },

  async sendPushNotification(
    root: any,
    args: MutationSendPushNotificationArgs,
    { injector, user }: ContextType
  ): Promise<any> {
    if (user.notificationToken && user.notificationStatus === NotificationStatus.Approved) {
      await PushNotificationUtil.send(
        [user.notificationToken],
        args as NotificationAlert,
        {
          type: NotificationType.Manual,
        } as NotificationPayload
      )

      return 'sent'
    }

    return 'no-token'
  },
}
