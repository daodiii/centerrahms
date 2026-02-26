import { NextResponse } from 'next/server';
import { fetchPrayerTimes } from '@/lib/mymasjid';

export const dynamic = 'force-dynamic'; // Always run server-side, never static

export async function GET() {
  try {
    const schedule = await fetchPrayerTimes();
    return NextResponse.json(schedule, {
      headers: {
        // Cache for 30 minutes on the edge/CDN, allow stale for up to 1 hour
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('[PrayerTimes] API route error:', error);
    const { MOCK_PRAYER_TIMES } = await import('@/lib/constants');
    return NextResponse.json(MOCK_PRAYER_TIMES);
  }
}
