import db from './lib/db'
import dotenv from 'dotenv'
import Config from './config'
import { UserRole, UserSource } from '@models'
import { UserModel } from 'models/User'
import AuthUtil from 'utils/AuthUtil'

// The boot class has static objects that are all called on boot. It has various methods
// that are required for the application to run properly.
// Database connection and data fetching.
class boot {
  static async start(): Promise<Array<any>> {
    console.info('Booting...')
    dotenv.config()
    Config.assertConfig()

    const items = [await db.connect(), await this.createAdminUser()]

    return Promise.all(items)
  }

  static async db(): Promise<Array<any>> {
    console.info('Booting db...')
    dotenv.config()
    Config.assertConfig()

    const items = [await db.connect()]

    return Promise.all(items)
  }

  static async createAdminUser(): Promise<void> {
    await UserModel.findOneAndUpdate(
      {
        profile: {
          fullName: 'Admin',
          email: process.env.ADMIN_EMAIL,
        },
      },
      {
        password: await AuthUtil.hashPassword(process.env.ADMIN_PASSWORD),
        role: UserRole.Admin,
        source: UserSource.Manual,
        profile: {
          email: process.env.ADMIN_EMAIL,
          fullName: 'Admin',
        },
      },
      { new: true, upsert: true }
    )
  }
}

export default boot
