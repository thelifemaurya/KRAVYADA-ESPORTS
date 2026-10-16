// Add upcoming scrims or tournaments here and they appear on the /scrims page.
// While this list is empty, the page tells visitors to follow Discord and Instagram.
//
// Example:
//   { when: 'Saturday, 9:00 pm IST', title: 'Open scrims', detail: 'Free entry. Room ID on Discord.' },
export type ScheduleItem = {
  when: string
  title: string
  detail?: string
}

export const schedule: ScheduleItem[] = []
