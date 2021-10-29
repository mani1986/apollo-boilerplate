import bcrypt from 'bcrypt'
import { User, UserModel } from 'models/User'

// Auth related utility methods
class AuthUtil {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hashSync(password, 10)
  }

  static async getSystemAdmin(): Promise<User> {
    return await UserModel.findOne({ email: process.env.ADMIN_EMAIL })
  }
}

export default AuthUtil
