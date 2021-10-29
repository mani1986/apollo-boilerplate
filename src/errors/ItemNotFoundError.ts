export const ITEM_NOT_FOUND_MESSAGE = 'item_not_found'

class ItemNotFoundError extends Error {
  constructor(message = ITEM_NOT_FOUND_MESSAGE) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default ItemNotFoundError
