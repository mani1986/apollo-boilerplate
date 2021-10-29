// Admin
export const ADMIN_EMAIL = 'ADMIN_EMAIL'
export const ADMIN_PASSWORD = 'ADMIN_PASSWORD'

// Database
export const MONGO_STRING = 'MONGO_STRING'

// Security
export const SECRET = 'SECRET'
export const TOKEN_VALIDITY_MINUTES = 'TOKEN_VALIDITY_MINUTES'

// Misc
export const NODE_ENV = 'NODE_ENV'
export const PORT = 'PORT'
export const APP_URL = 'APP_URL'

// Push Notifications
export const TOPIC = 'TOPIC'
export const APNS_P8 = 'APNS_P8'
export const FCM_API_KEY = 'FCM_API_KEY'
export const APNS_KEY_ID = 'APNS_KEY_ID'
export const APNS_TEAM_ID = 'APNS_TEAM_ID'

// Environments
const ENV_PRODUCTION = 'production'

export const REQUIRED_CONFIG = [ADMIN_EMAIL, ADMIN_PASSWORD, SECRET, TOKEN_VALIDITY_MINUTES, NODE_ENV, PORT, APP_URL]

export default class Config {
  static assertConfig(): void | never {
    const missing: Array<string> = REQUIRED_CONFIG.filter((key: string) => {
      if (process.env[key]) {
        return false
      }

      return true
    })
    if (missing.length) {
      const errorMessage = `Missing config: ${missing.join(', ')}`

      if (process.env.NODE_ENV === ENV_PRODUCTION) {
        throw new Error(errorMessage)
      } else {
        console.warn(errorMessage)
      }
    }
  }
}
