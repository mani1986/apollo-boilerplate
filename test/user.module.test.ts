import { expect } from 'chai'
import { testkit } from 'graphql-modules'
import { gql } from 'apollo-server-express'
import SeedUtil from 'utils/SeedUtil'
import { CommonModule } from 'modules/common'
import { AuthProvider } from 'modules/auth/providers/AuthProvider'
import { MockAuthProvider } from './mock/MockAuthProvider'
import { UserModule } from 'modules/user'
import { AuthModule } from 'modules/auth'
import { OnboardingStatus, Route } from '@models'
import UserUtil from 'utils/UserUtil'

describe('UserModule', () => {
  let app: any

  beforeEach(() => {
    app = testkit.testModule(UserModule, {
      replaceExtensions: true,
      inheritTypeDefs: [CommonModule, AuthModule],
      providers: [
        AuthProvider,
        {
          provide: AuthProvider,
          useClass: MockAuthProvider,
        },
      ],
    })
  })

  it('get status user', async () => {
    const user = await SeedUtil.seedUser()

    const result = await testkit.execute(app, {
      document: gql`
        query {
          getStatus {
            user {
              id
              profile {
                email
                phoneNumber
                fullName
              }
            }
          }
        }
      `,
      contextValue: {
        mock: {
          user,
        },
      },
    })

    expect(result).to.have.property('data')
    expect(result?.data).to.have.property('getStatus')
    const {
      data: { getStatus },
    } = result
    expect(getStatus).to.have.property('user')
    expect(getStatus?.user).to.have.property('id')
    expect(getStatus?.user).to.have.property('profile')
    expect(getStatus?.user?.id).to.eq(user._id.toHexString())
    expect(getStatus?.user?.profile).to.have.property('fullName')
  })

  it('updateUser', async () => {
    const user = await SeedUtil.seedUser()
    expect(user.onboardingStatus).to.eq(OnboardingStatus.Initial)

    const result = await testkit.execute(app, {
      document: gql`
        mutation ($input: UpdateUserInput!) {
          updateUser(input: $input) {
            onboardingStatus
            profile {
              phoneNumber
            }
          }
        }
      `,
      variableValues: {
        input: {
          onboardingStatus: OnboardingStatus.Onboarded,
          profile: {
            phoneNumber: '777777777',
          },
        },
      },
      contextValue: {
        mock: {
          user,
        },
      },
    })

    expect(result).to.have.property('data')
    expect(result?.data).to.have.property('updateUser')
    expect(result?.data?.updateUser).to.have.property('onboardingStatus')
    expect(result?.data?.updateUser.onboardingStatus).to.eq(OnboardingStatus.Onboarded)
    expect(result?.data?.updateUser?.profile).to.have.property('phoneNumber')
    expect(result?.data?.updateUser?.profile.phoneNumber).to.eq('777777777')
  })
})
