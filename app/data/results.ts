// Add tournament results here and the "Results" section appears on the home page.
// While this list is empty, the section is hidden.
//
// Example:
//   { event: 'Tournament name', placement: '1st place', date: 'March 2026' },
export type Result = {
  event: string
  placement: string
  date?: string
}

export const results: Result[] = []
