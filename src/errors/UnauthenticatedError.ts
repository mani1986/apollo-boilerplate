export const ERROR_UNAUTHENTICATED_MESSAGE = 'unauthenticated'

class UnauthenticatedError extends Error {
  constructor(message = ERROR_UNAUTHENTICATED_MESSAGE) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default UnauthenticatedError
