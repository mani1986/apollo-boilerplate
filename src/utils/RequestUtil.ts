import { Request, Response } from 'express'

// Status
const STATUS_NOT_FOUND = 404
const STATUS_OK = 200

// Header
const HEADER_CONTENT_TYPE = 'Content-Type'

class RequestUtil {
  static async handleHealthRoute(req: Request, res: Response): Promise<void> {
    res.status(STATUS_OK).send('OK')

    return
  }
}

export default RequestUtil
