import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksGrid from '@/components/home/QuickLinksGrid';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const baseUrl = 'https://masjidrahma.no';

  return {
    title: `Masjid Rahma Oslo — ${t('subtitle')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: { en: `${baseUrl}/en`, no: `${baseUrl}/no` },
    },
    openGraph: {
      title: 'Masjid Rahma Oslo',
      description: t('subtitle'),
      url: `${baseUrl}/${locale}`,
      siteName: 'Masjid Rahma',
      locale: locale === 'no' ? 'nb_NO' : 'en_US',
      type: 'website',
    },
  };
}

function MosqueJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Mosque',
    name: 'Masjid Rahma',
    alternateName: 'Masjid Rahma Oslo',
    url: 'https://masjidrahma.no',
    telephone: '+47 22 12 34 56',
    email: 'contact@masjidrahma.no',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gronland 12',
      addressLocality: 'Oslo',
      postalCode: '0188',
      addressCountry: 'NO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 59.9127,
      longitude: 10.7601,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '05:00',
      closes: '23:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <MosqueJsonLd />
      <HeroSection />
    </>
  );
}
