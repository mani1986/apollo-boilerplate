import { QueryResolvers } from '@models'
import _ from 'lodash'
import { ContextType } from 'lib/Context'
import { NoArguments } from 'types/global'

export const Query: QueryResolvers = {
  async getStatus(root: any, args: NoArguments, { user }: ContextType): Promise<any> {
    return {
      user,
    }
  },
}
