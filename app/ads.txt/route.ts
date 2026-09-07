import { NextResponse } from 'next/server'

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  if (!client) {
    return new NextResponse('AdSense is not configured yet.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  return new NextResponse(
    `google.com, ${client.replace(/^ca-/, '')}, f08c47fec0942fa0, DIRECT, f08c47fec0942fa0\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  )
}
