/**
 * @flow
 */
import type { BlockNode } from '../../messageBody/types'
import type { PublishTime } from '../types'
import type { UserId } from './UserId'
import { toUserId } from './UserId'

type UserJSON = {
  id: string,
  username: string,
  firstName?: string,
  lastName?: string
}

export default class User {
  id: UserId
  username: string
  firstName: ?string
  lastName: ?string

  constructor (user: UserJSON) {
    this.id = toUserId(user.id)
    this.username = user.username
    this.firstName = user.firstName || null
    this.lastName = user.lastName || null
  }
}
