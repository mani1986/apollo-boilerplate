#!/usr/bin/env ts-node
import boot from '../src/boot'
import { argv } from 'process'
import SeedUtil from 'utils/SeedUtil'
import { UserRole } from '@models'
import readline from 'readline'
import { UserModel } from 'models/User'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const seed = async () => {
  const type = argv[2]

  let payload: any, result

  switch (type) {
    case 'admin':
      payload = SeedUtil.seedUser({ role: UserRole.Admin })
      result = await payload.save()
      break
    case 'token':
      const user = await UserModel.findOne({ $or: [{ email: argv[3] }, { sourceId: argv[3] }] })
      if (user) {
        result = await user.createToken()
      }
      payload = user
      break
  }

  console.info(`Seed done ${type}:`)
  console.info('Payload:', payload)
  console.info('Result:', result)

  rl.close()
}

boot.db().then(seed)

rl.on('close', function () {
  process.exit(0)
})
