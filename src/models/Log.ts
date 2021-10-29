import { User } from 'models/User'
import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

export class Log implements Base {
  _id: Types.ObjectId
  id: string

  @prop({ ref: 'User' })
  public user!: Ref<User>

  @prop({})
  public title?: string

  @prop({ required: true })
  public type!: string

  @prop()
  public data: any
}

export const LogModel = getModelForClass(Log, { schemaOptions: { timestamps: true } })
