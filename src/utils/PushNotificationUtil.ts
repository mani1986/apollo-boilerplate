import PushNotifications from 'node-pushnotifications'
import { NotificationAlert, NotificationPayload } from 'types/global'

export class PushNotificationUtil {
  static async send(
    tokens: Array<string>,
    alert: NotificationAlert,
    custom: NotificationPayload,
    collapseId: string = undefined
  ): Promise<void> {
    const APNS_P8 = process.env.APNS_P8 || ''

    const settings = {
      gcm: {
        id: process.env.FCM_API_KEY,
        phonegap: false,
      },
      apn: {
        token: {
          key: APNS_P8.replace(/\\n/g, '\n'),
          keyId: process.env.APNS_KEY_ID,
          teamId: process.env.APNS_TEAM_ID,
        },
        production: true,
      },
    }

    const push = new PushNotifications(settings)
    const data = {
      title: alert.title,
      topic: process.env.TOPIC,
      body: alert.body,
      sound: 'default',
      custom,
      priority: 'high',
      contentAvailable: true, // gcm, apn. node-apn will translate true to 1 as required by apn.
      delayWhileIdle: true, // gcm for android
      dryRun: false, // gcm for android
      badge: 0,
      alert,
      collapseId,
      silent: false, // apn, will override badge, sound, alert and priority if set to true
      truncateAtWordEnd: true, // apn and gcm for ios
      pushType: 'alert',
    }

    try {
      await push.send(tokens, data)
    } catch (e) {
      console.error(e)
    }
  }
}
