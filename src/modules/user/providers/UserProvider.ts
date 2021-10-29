import { User, UserModel } from 'models/User'
import { UpdateUserInput } from '@models'
import { Injectable } from 'graphql-modules'

@Injectable()
export class UserProvider {
  async updateUser(user: User, input: UpdateUserInput): Promise<User> {
    if (input.onboardingStatus) {
      user.onboardingStatus = input.onboardingStatus
    }

    if (input.profile?.phoneNumber) {
      user.profile.phoneNumber = input.profile.phoneNumber
    }

    await UserModel.updateOne({ _id: user._id }, user)

    return user
  }
}
