import { MutationResolvers, UserLoginResponse, MutationLoginArgs } from '@models'
import { ContextType } from 'lib/Context'
import { AuthProvider } from '../providers/AuthProvider'

export const Mutation: MutationResolvers<ContextType> = {
  async login(parent: any, args: MutationLoginArgs, { injector }): Promise<UserLoginResponse> {
    return await injector.get(AuthProvider).authenticateUser(args.username, args.password, args.device)
  },
}
