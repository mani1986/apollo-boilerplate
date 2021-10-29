import _ from 'lodash'
import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from 'models/User'
import { UploadType } from '@models'
import { Types } from 'mongoose'

export class File implements Base {
  _id: Types.ObjectId
  id: string

  @prop({ ref: 'User', required: true })
  public user!: Ref<User>

  @prop({ required: true })
  public filename!: string

  @prop({})
  public name?: string

  @prop({ required: true })
  public mimetype!: string

  @prop({ type: String, enum: UploadType, required: true })
  public type!: UploadType

  @prop({ required: true })
  public location!: string
}

export const FileModel = getModelForClass(File, { schemaOptions: { timestamps: true } })
