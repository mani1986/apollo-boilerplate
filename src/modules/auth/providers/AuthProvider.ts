import { DeviceInput, NotificationStatus } from '@models'
import { DocumentType } from '@typegoose/typegoose'
import AuthenticationError from 'errors/AuthenticationError'
import UnauthenticatedError from 'errors/UnauthenticatedError'
import { Injectable } from 'graphql-modules'
import jwt from 'jsonwebtoken'
import { ContextType } from 'lib/Context'
import _ from 'lodash'
import { TokenPayload } from 'models/AuthToken'
import { User, UserModel } from 'models/User'
import { AuthObject } from 'types/global'

export type AuthenticationEntities = {
  user: User
}

@Injectable({
  global: true,
})
export class AuthProvider {
  async authenticateUser(username: string, password: string, device: DeviceInput): Promise<AuthObject> {
    const user: DocumentType<User> = await UserModel.findOne({ 'profile.email': username })

    if (!user || !(await user.comparePassword(password))) {
      throw new AuthenticationError()
    }

    const tokenObj = await user.createToken()
    // Check if there is a new device
    if (!user.device || user.device.id !== device.id) {
      user.device = { ...device, notificationStatus: NotificationStatus.Initial }
      user.tokens = []

      await UserModel.updateOne({ _id: user._id }, user)
    }

    return {
      user,
      accessToken: tokenObj.accessToken,
    }
  }

  // Get User and/or Client from context.
  async extractAuthFromContext(context: ContextType): Promise<AuthenticationEntities> {
    let user, client

    const headerToken = _.get(context, 'req.headers.authorization', null)

    if (!headerToken) {
      throw new UnauthenticatedError()
    }

    const headerTokenPart = headerToken.replace(/bearer/gi, '').trim()

    if (!headerTokenPart) {
      return {
        user: null,
      }
    }

    let token: TokenPayload
    try {
      try {
        token = jwt.verify(headerTokenPart, process.env.SECRET) as TokenPayload

        if (token.userId) {
          user = await await UserModel.findOne({ _id: token.userId })
        }
      } catch {
        user = null
      }

      return { user }
    } catch (e) {
      console.error(e)
      return { user: null }
    }
  }
}
