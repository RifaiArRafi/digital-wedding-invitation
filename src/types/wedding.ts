export interface GuestInfo {
  name: string
  seats: number
  table?: string
  personalizedMessage?: string
  isVip?: boolean
}

export interface ScheduleEvent {
  time: string
  title: string
  description?: string
  location?: string
}

export interface RsvpSubmission {
  guestName: string
  attendance: 'attending' | 'declining'
  guestCount: number
  dietaryRestrictions: string
  message: string
  submittedAt: string
}

export interface WishMessage {
  id: string
  name: string
  message: string
  date: string
}
