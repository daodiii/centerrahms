'use client';

import useSWR from 'swr';
import type { PrayerSchedule } from '@/types/prayer';
import { MOCK_PRAYER_TIMES } from '@/lib/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePrayerTimes(initialData?: PrayerSchedule) {
  const { data, error, isLoading } = useSWR<PrayerSchedule>(
    '/api/prayer-times',
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 1800000, // Refresh every 30 minutes
      revalidateOnFocus: true, // Re-fetch when user returns to tab
      revalidateOnReconnect: true, // Re-fetch on reconnect
      dedupingInterval: 60000, // Dedupe requests within 1 minute
    }
  );

  return {
    // Use API data when available, fall back to mock only as last resort
    schedule: data || MOCK_PRAYER_TIMES,
    error,
    isLoading,
  };
}
