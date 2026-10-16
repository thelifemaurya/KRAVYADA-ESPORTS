// Add players here and the "Roster" section appears on the home page.
// While this list is empty, the section is hidden.
//
// Example:
//   { name: 'Full Name', ign: 'InGameName', role: 'Rusher' },
export type Player = {
  name: string
  ign: string
  role?: string
}

export const roster: Player[] = []
