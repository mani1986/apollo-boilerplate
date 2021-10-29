import { NotificationStatus, OnboardingStatus, UserSource } from '@models'
import { DocumentType, getModelForClass, pre, prop } from '@typegoose/typegoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { Types } from 'mongoose'
import { AuthTokenKind, UserRole } from '../generated/models'
import { AuthToken } from './AuthToken'
import { Device } from './Device'

export class UserProfile {
  @prop({ required: true })
  public email: string

  @prop({ required: true })
  public fullName: string

  @prop({ required: false })
  public phoneNumber?: string
}

@pre<User>('save', async function (next) {
  const user = this as User
  if (!this.isModified('password')) {
    return next()
  }
  const hash = await bcrypt.hashSync(user.password, 10)
  user.password = hash
  next()
})
export class User {
  _id: Types.ObjectId
  id: string

  @prop({ required: true })
  public password!: string

  @prop({})
  public dateActive: Date = new Date()

  @prop({ _id: false, required: true })
  public profile!: UserProfile

  @prop({ type: String, enum: UserRole, required: true })
  public role!: UserRole

  @prop({ type: String, enum: OnboardingStatus, required: true, default: OnboardingStatus.Initial })
  public onboardingStatus: OnboardingStatus

  @prop({ type: () => [AuthToken] })
  public tokens: Array<AuthToken> = []

  @prop({ _id: false })
  public device?: Device

  @prop({ type: String, enum: UserSource, required: true })
  public source: UserSource

  // Push notifications
  @prop({})
  public notificationToken!: string

  @prop({ type: String, enum: NotificationStatus, default: NotificationStatus.Initial })
  public notificationStatus!: NotificationStatus

  public async comparePassword(this: DocumentType<User>, candidatePassword: string): Promise<any> {
    return bcrypt.compareSync(candidatePassword, this.password)
  }

  public async createToken(this: DocumentType<User>): Promise<AuthToken> {
    const TOKEN_VALIDITY_MINUTES = process.env.TOKEN_VALIDITY_MINUTES || 180

    const tokenObj: AuthToken = {
      kind: AuthTokenKind.Auth,
      deviceId: null,
      accessToken: jwt.sign({ userId: this._id, type: 'user' }, process.env.SECRET),
      validUntil: moment().add(TOKEN_VALIDITY_MINUTES, 'minutes').toDate(),
    }

    this.tokens.push(tokenObj)
    await this.save()

    return tokenObj
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})
