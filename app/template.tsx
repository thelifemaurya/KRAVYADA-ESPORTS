// A template remounts on every navigation, so each page slides in softly like a screen in an app.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>
}
