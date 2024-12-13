import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export default function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname === '/html') {
  //   const html = fs.readFileSync(
  //     path.join(process.cwd(), 'public/page.html'), 'utf8');

  //   return new NextResponse(html, {
  //     headers: {
  //       'content-type': 'text/html',
  //     },
  //   })
  // }
}