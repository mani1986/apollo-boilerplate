export const ERROR_UNAUTHORIZED_MESSAGE = 'unauthorized'

class UnauthorizedError extends Error {
  constructor(message = ERROR_UNAUTHORIZED_MESSAGE) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default UnauthorizedError
