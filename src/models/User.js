import type { UserId } from './UserId'
import { toUserId } from './UserId'

export default class User {
  uid: UserId
  displayName: ?string

  constructor (user: $npm$firebase$auth$User) {
    this.uid = toUserId(user.uid)
    this.displayName = user.displayName || null
  }
}
