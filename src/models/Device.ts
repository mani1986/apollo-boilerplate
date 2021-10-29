import { prop } from '@typegoose/typegoose'
import { NotificationStatus } from '@models'

export class Device {
  @prop()
  public id: string

  @prop()
  public token?: string

  @prop()
  public type?: string

  @prop()
  public os?: string

  @prop({ type: String, enum: NotificationStatus, default: NotificationStatus.Initial })
  public notificationStatus: NotificationStatus
}
