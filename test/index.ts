import 'source-map-support/register'
import boot from '../src/boot'
import chaiAsPromised from 'chai-as-promised'
import 'graphql-import-node'
import chai from 'chai'
import { UserModel } from 'models/User'

chai.use(chaiAsPromised)

before(function () {
  this.timeout(5000)
  delete process.env.MONGO_STRING
  return boot.start()
})

after(async () => {
  return await Promise.all([await UserModel.deleteMany({})])
})

require('./auth.module.test.ts')
require('./user.module.test.ts')
