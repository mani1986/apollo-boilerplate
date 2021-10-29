export const ERROR_AUTHENTICATION_MESSAGE = 'invalid_credentials'

class AuthenticationError extends Error {
  constructor(message = ERROR_AUTHENTICATION_MESSAGE) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default AuthenticationError
