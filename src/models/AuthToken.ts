import { AuthTokenKind } from '@models'
import { prop } from '@typegoose/typegoose'

export type TokenPayload = {
  type: string
  userId: string
  clientId: string
}

export class AuthToken {
  @prop()
  public accessToken: string

  @prop()
  public deviceId: string

  @prop({ type: String, enum: AuthTokenKind })
  public kind: AuthTokenKind

  @prop()
  public validUntil: Date
}
