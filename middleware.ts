import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/va/script.js') {
    console.log(req.nextUrl.pathname)
    try {
      const response = await fetch('/va/script.js').then((res) => res.json())
      if (response) {
        console.log(response)
        return new Response(response, {
          headers: {
            'Content-Type': 'application/javascript',
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
