import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import boot from './boot'
import { app } from 'modules/app'
import { getContext as context } from 'lib/Context'
import RequestUtil from 'utils/RequestUtil'

const schema = app.createSchemaForApollo()

export class App {
  public app: any
  public server: ApolloServer

  constructor() {
    this.app = express()
    boot.start()

    this.server = new ApolloServer({
      schema,
      context,
    })

    this.app.get('/health', RequestUtil.handleHealthRoute)
  }

  async start() {
    await this.server.start()
    this.server.applyMiddleware({ app: this.app, path: '/api' })
  }
}

export default new App()
