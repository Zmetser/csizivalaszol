export opaque type UserId: string = string;

export function toUserId (id: string): UserId {
  return id
}
