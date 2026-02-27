import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import VideoAndDonate from '@/components/donate/VideoAndDonate';
import GallerySection from '@/components/new-mosque/GallerySection';
import { PROJECTS } from '@/lib/constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'no', namespace: 'donate' });
  const baseUrl = 'https://masjidrahma.no';

  return {
    title: `${t('sectionTitle')} — Masjid Rahma`,
    description: t('pageSubtitle'),
    alternates: {
      canonical: `${baseUrl}/new-mosque`,
    },
    openGraph: {
      title: `${t('sectionTitle')} — Masjid Rahma`,
      description: t('pageSubtitle'),
      url: `${baseUrl}/new-mosque`,
      siteName: 'Masjid Rahma',
      locale: 'nb_NO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('sectionTitle')} — Masjid Rahma`,
      description: t('pageSubtitle'),
    },
  };
}

export default function NewMosquePage() {
  const t = useTranslations();

  // Build translations object to pass to client component
  const projectTitles: Record<string, string> = {};
  for (const project of PROJECTS) {
    projectTitles[project.id] = t(project.titleKey);
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Header — mobile: text above image; desktop: text overlaid on image */}
      <header className="mb-0 md:mb-8 relative w-full">
        {/* MOBILE: Text in grey area above the image */}
        <div className="md:hidden">
          <div className="bg-[var(--color-bg)] px-4 pt-4 pb-5 text-center">
            <h1 className="text-3xl font-bold tracking-tight leading-[1.1] font-[family-name:var(--font-display)] text-center text-[var(--color-text)]">
              Nye Masjid Rahma
            </h1>
            <p className="font-[family-name:var(--font-jakarta)] text-[var(--color-text-muted)] text-sm max-w-md text-center mt-2 mx-auto font-normal">
              Invest in your Akhira.
            </p>
          </div>
          <div className="w-full relative h-[40vh] min-h-[300px] overflow-hidden">
            <Image
              src="/nymoskeoversikt.png"
              alt="3D oversikt over nye Masjid Rahma"
              fill
              className="object-cover"
              priority
            />
            {/* Elegant fade to content */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
          </div>
        </div>

        {/* DESKTOP: Text above the image to show full uncropped picture */}
        <div className="hidden md:block w-full">
          <div className="bg-[var(--color-bg)] w-full py-8 text-center flex flex-col items-center justify-center">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1] font-[family-name:var(--font-display)] text-[var(--color-text)] mb-2">
              Nye Masjid Rahma
            </h1>
            <p className="font-[family-name:var(--font-jakarta)] text-[var(--color-text-muted)] text-lg lg:text-xl font-medium tracking-wide">
              Invest in your Akhira.
            </p>
          </div>
          <div className="relative w-full">
            {/* Show the image fully without cropping via responsive Next/Image */}
            <Image
              src="/nymoskeoversikt.png"
              alt="3D oversikt over nye Masjid Rahma"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </header>

      {/* Main Content Areas */}
      <Container className="mt-8 md:-mt-12 relative z-10">

        {/* Video and Donate Side by Side */}
        <VideoAndDonate
          projects={PROJECTS}
          translations={{
            makeADonation: t('donate.makeADonation'),
            donationSubtitle: t('donate.donationSubtitle'),
            oneTimeLabel: t('donate.oneTime'),
            monthlyLabel: t('donate.monthly'),
            customAmountLabel: t('donate.customAmount'),
            confirmLabel: t('donate.confirmDonation'),
            securityNote: t('donate.securityNote'),
            processingLabel: t('donate.processing'),
            projectTitles,
            targetLabel: t('donate.target'),
          }}
          statsRowProps={{
            transparencyLabel: t('donate.transparency'),
            transparencyDesc: t('donate.transparencyDesc'),
            taxLabel: t('donate.taxDeductible'),
            taxDesc: t('donate.taxDeductibleDesc'),
            accessLabel: t('donate.access'),
            accessDesc: t('donate.accessDesc'),
            secureLabel: t('donate.securePayments'),
            secureDesc: t('donate.securePaymentsDesc')
          }}
        />

        {/* Masonry Image Gallery */}
        <GallerySection
          title="Sniktitt av Fremtiden"
          subtitle="Slik vil nye Masjid Rahma se ut, insha'Allah."
        />
      </Container>
    </main>
  );
}
