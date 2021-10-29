import moment, { DurationInputArg2 } from 'moment'
import { Client } from 'models/Client'
import { User } from 'models/User'
import { NotificationType } from '@models'

export type KeyValueObject = {
  [name: string]: any
}

export type AuthObject = {
  accessToken: string
  user?: User
  client?: Client
}

export type NotificationAlert = {
  title: string
  body: string
}

export type NotificationPayload = {
  type: NotificationType
  linkSourceId: string
}

export type NoArguments = {}
