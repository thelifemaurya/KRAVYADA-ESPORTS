// Add real milestones here (first scrim, first tournament, player signings, wins) and a
// "Milestones" section appears on the About page. While this list is empty, the section is hidden.
//
// Example:
//   { date: 'March 2026', title: 'First community tournament', detail: 'Optional one-line detail.' },
export type Milestone = {
  date: string
  title: string
  detail?: string
}

export const milestones: Milestone[] = []
