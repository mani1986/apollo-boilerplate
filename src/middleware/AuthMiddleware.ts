import _ from 'lodash'
import UnauthorizedError from 'errors/UnauthorizedError'
import UnauthenticatedError from 'errors/UnauthenticatedError'
import { ContextType } from 'lib/Context'
import { MiddlewareContext } from 'graphql-modules'
import { UserRole } from '@models'
import { AuthProvider } from 'modules/auth/providers/AuthProvider'

export type MiddlewareArgs = {
  context: ContextType
} & MiddlewareContext

type Next<T = any> = () => Promise<T>

export default class AuthMiddleware {
  // This function is called with resolversComposition from the graphql-modules library.
  static async isAuthenticated({ context }: MiddlewareArgs, next: Next): Promise<any> {
    const { user } = await context.injector.get(AuthProvider).extractAuthFromContext(context)

    if (!user) {
      throw new UnauthenticatedError()
    }

    context.user = user

    return next()
  }

  static isAdmin({ context }: MiddlewareArgs, next: Next): Promise<any> {
    if (context.user.role !== UserRole.Admin) {
      throw new UnauthorizedError()
    }

    return next()
  }
}
