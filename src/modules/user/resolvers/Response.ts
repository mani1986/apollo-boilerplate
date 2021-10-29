import { OnboardingStatus } from '@models'
import { User } from 'models/User'

export const UserResponse: any = {
  onboardingStatus: (doc: User) => doc.onboardingStatus || OnboardingStatus.Initial,
}
