import { NextResponse } from 'next/server';

// In-process memory (note: this will reset per Vercel edge instance, but still helps throttle aggressive bursts)
const ipRateLimitMap = new Map();

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 1. Basic Bot Detection via User-Agent
  const userAgent = request.headers.get('user-agent') || '';
  const blockedAgents = [
    'curl', 'wget', 'python-requests', 'postmanruntime', 'nikto', 'sqlmap', 'nmap', 'zmeu'
  ];
  
  const isBot = blockedAgents.some(agent => userAgent.toLowerCase().includes(agent));
  if (isBot && !pathname.includes('/api/github/stats')) {
    // We allow curl/python-requests if they are legitimately hitting the API if the user integrates it elsewhere, 
    // but typically we block typical scanner agents globally. 
    // Actually, let's block them strictly unless it's a known good bot.
    return new NextResponse(
      JSON.stringify({ error: 'Security systems engaged. Access denied.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Simple Edge Rate Limiting for the GitHub API Route
  if (pathname.startsWith('/api/github')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 30; // 30 requests per minute per IP

    if (ip !== 'unknown') {
      const rateData = ipRateLimitMap.get(ip) || { count: 0, startTime: now };

      // Reset window if time passed
      if (now - rateData.startTime > windowMs) {
        rateData.count = 1;
        rateData.startTime = now;
      } else {
        rateData.count++;
      }

      ipRateLimitMap.set(ip, rateData);

      if (rateData.count > maxRequests) {
        return new NextResponse(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
        );
      }
    }
    
    // 3. API Route CORS Protection
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'https://johnnietse.com'); // Replace with your actual domain when live, or keep restrictive locally.
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    // For local dev, allow localhost. In production, this should be tight.
    if (request.headers.get('origin')?.includes('localhost')) {
        response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin'));
    }
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
