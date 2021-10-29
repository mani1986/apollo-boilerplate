import { Client } from 'models/Client'
import { User, UserModel } from 'models/User'
class UserUtil {
  static async assignClient(user: User, client: Client): Promise<User> {
    if (user.clients.indexOf(client._id) === -1) {
      user.clients.push(client._id)
      await UserModel.updateOne({ _id: user._id }, user)
    }

    return user
  }
}

export default UserUtil
