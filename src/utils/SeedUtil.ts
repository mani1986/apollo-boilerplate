import { UserRole, DeviceInput, UserSource, OnboardingStatus } from '@models'
import { User, UserModel } from 'models/User'
import faker from 'faker'
import { DocumentType } from '@typegoose/typegoose'
import { v4 as uuidv4 } from 'uuid'
class SeedUtil {
  static seedUser(payload: User | any = {}): DocumentType<User> {
    return new UserModel({
      profile: this.seedUserProfile(),
      source: UserSource.Manual,
      dateActive: new Date(),
      role: UserRole.Admin,
      onboardingStatus: OnboardingStatus.Initial,
      tokens: [],
      password: 'seed',
      ...payload,
    })
  }

  static seedDevice(): DeviceInput {
    return {
      id: uuidv4(),
      os: 'iOS',
      type: 'iPhone c',
    }
  }

  static seedUserProfile(): any {
    return {
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      phoneNumber: faker.phone.phoneNumber,
      email: faker.internet.email,
    }
  }
}

export default SeedUtil
