import 'reflect-metadata'
import 'graphql-import-node'
import App from './App'

interface CorsOptions {
  [key: string]: any
}

const corsOptions: CorsOptions = {
  credentials: true,
  origin: process.env.APP_URL,
}

App.app.listen(
  {
    cors: corsOptions,
    port: process.env.PORT || 80,
    playground: process.env.NODE_ENV === 'production' ? false : '/',
  },
  () => {
    console.info(`Server started: ${process.env.PORT} on ${process.env.NODE_ENV}`)
  }
)

App.start()
