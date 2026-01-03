export interface Task {
  id: number
  title: string
  description: string
  dateStart?: string
  dateEnd?: string
  completed?: boolean
  createdAt?: Date
  userId?: number
}
