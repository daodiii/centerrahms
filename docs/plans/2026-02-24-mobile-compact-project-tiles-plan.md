# Mobile Compact Project Tiles — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace oversized mobile project cards with compact 2-column tiles that fit all 8 items on one screen, with tap-to-donate behavior.

**Architecture:** New `CompactProjectTile` component rendered on mobile via Tailwind responsive `hidden`/`block` classes. Page becomes a client component to manage selected project state and scroll behavior. DonationWidget gets an `id` for scroll targeting.

**Tech Stack:** Next.js, React, Tailwind CSS, next-intl

---

### Task 1: Create `CompactProjectTile` component

**Files:**
- Create: `src/components/donate/CompactProjectTile.tsx`

**Step 1: Create the compact tile component**

```tsx
import type { DonationProject } from '@/types/donation';
import { formatCurrency } from '@/lib/format';

interface CompactProjectTileProps {
  project: DonationProject;
  title: string;
  targetLabel: string;
  onClick: () => void;
}

export default function CompactProjectTile({
  project,
  title,
  targetLabel,
  onClick,
}: CompactProjectTileProps) {
  return (
    <button
      onClick={onClick}
      className={`glass-panel p-4 text-left w-full flex flex-col justify-between h-full
        hover:bg-[rgba(var(--color-primary-rgb),0.05)] transition-colors duration-200
        ${project.badge === 'urgent' ? 'border-l-2 border-l-red-500' : ''}`}
    >
      {/* Title */}
      <h3 className="text-sm font-semibold leading-tight mb-3 line-clamp-2">
        {title}
      </h3>

      {/* Progress bar + percentage */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-primary">{project.percentage}%</span>
        </div>
        <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${project.percentage}%` }}
          />
        </div>
      </div>

      {/* Target amount */}
      <p className="text-xs text-[var(--color-text-muted)]">
        {targetLabel}: {formatCurrency(project.target)} kr
      </p>
    </button>
  );
}
```

**Step 2: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds (component not imported yet, so no impact)

**Step 3: Commit**

```bash
git add src/components/donate/CompactProjectTile.tsx
git commit -m "feat: add CompactProjectTile component for mobile layout"
```

---

### Task 2: Create `CompactVippsTile` component

**Files:**
- Create: `src/components/donate/CompactVippsTile.tsx`

**Step 1: Create the compact Vipps tile**

```tsx
interface CompactVippsTileProps {
  onClick: () => void;
}

export default function CompactVippsTile({ onClick }: CompactVippsTileProps) {
  return (
    <button
      onClick={onClick}
      className="glass-panel p-4 text-left w-full flex flex-col justify-center items-center h-full
        hover:bg-[rgba(var(--color-primary-rgb),0.05)] transition-colors duration-200"
    >
      <h3 className="text-lg font-bold text-white mb-1">Vipps</h3>
      <p className="text-2xl font-bold text-primary tracking-wider">77811</p>
      <p className="text-xs text-[var(--color-text-muted)] mt-2">Velg kategori</p>
    </button>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/donate/CompactVippsTile.tsx
git commit -m "feat: add CompactVippsTile component for mobile layout"
```

---

### Task 3: Convert new-mosque page to client component with mobile/desktop split

**Files:**
- Modify: `src/app/new-mosque/page.tsx`

This is the main task. The page needs to:
1. Show `CompactProjectTile` grid on mobile (`md:hidden`)
2. Show existing `ProjectCard` grid on desktop (`hidden md:block`)
3. Manage selected project state
4. Smooth-scroll to DonationWidget on tile tap

**Step 1: Rewrite the page with responsive layouts**

The page is currently a server component using `useTranslations` (which works in server components via next-intl). We need to extract the interactive card grid into a client component wrapper while keeping metadata generation as a server function.

Create a new client component `src/components/donate/ProjectGridWithDonation.tsx` that contains:
- The mobile compact tile grid (`md:hidden`)
- The desktop ProjectCard grid (`hidden md:grid`)
- The Vipps card (both mobile and desktop variants)
- The DonationWidget
- State management for selected project + scroll behavior

```tsx
'use client';

import { useRef } from 'react';
import type { DonationProject } from '@/types/donation';
import ProjectCard from '@/components/donate/ProjectCard';
import CompactProjectTile from '@/components/donate/CompactProjectTile';
import CompactVippsTile from '@/components/donate/CompactVippsTile';
import DonationWidget from '@/components/donate/DonationWidget';

interface ProjectGridWithDonationProps {
  projects: DonationProject[];
  translations: {
    projectTitles: Record<string, string>;
    raisedLabel: string;
    targetLabel: string;
    fundedLabel: string;
    donorsLabel: string;
    vsLastMonthLabel: string;
    raisedThisMonthLabel: string;
    makeADonation: string;
    donationSubtitle: string;
    oneTimeLabel: string;
    monthlyLabel: string;
    customAmountLabel: string;
    confirmLabel: string;
    securityNote: string;
    processingLabel: string;
  };
}

export default function ProjectGridWithDonation({
  projects,
  translations: t,
}: ProjectGridWithDonationProps) {
  const donationRef = useRef<HTMLDivElement>(null);

  const scrollToDonation = () => {
    donationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const projectsWithoutMihrab = projects.filter(p => p.id !== 'mihrab');
  const mihrab = projects.find(p => p.id === 'mihrab');

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
      {/* Left column: project cards */}
      <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">

        {/* ===== MOBILE: Compact 2-col grid ===== */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {projectsWithoutMihrab.map((project, index) => (
            <>
              {/* Insert Vipps tile after first project */}
              {index === 1 && (
                <CompactVippsTile key="vipps-compact" onClick={scrollToDonation} />
              )}
              <CompactProjectTile
                key={project.id}
                project={project}
                title={t.projectTitles[project.id] ?? project.titleKey}
                targetLabel={t.targetLabel}
                onClick={scrollToDonation}
              />
            </>
          ))}
          {mihrab && (
            <CompactProjectTile
              key={mihrab.id}
              project={mihrab}
              title={t.projectTitles[mihrab.id] ?? mihrab.titleKey}
              targetLabel={t.targetLabel}
              onClick={scrollToDonation}
            />
          )}
        </div>

        {/* ===== DESKTOP: Existing bento grid ===== */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectsWithoutMihrab.map((project, index) => (
            <>
              {index === 1 && (
                <div key="vipps-desktop" className="glass-panel bento-card p-6 relative overflow-hidden flex flex-col justify-center items-center h-full group hover:bg-[rgba(var(--color-primary-rgb),0.05)] transition-colors duration-300 text-center">
                  <div className="flex flex-col items-center justify-center flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2">Vipps</h3>
                    <p className="text-5xl font-bold text-primary tracking-wider">77811</p>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-muted)] mt-4">
                    Pick the category you want to donate to
                  </p>
                </div>
              )}
              <ProjectCard
                key={project.id}
                project={project}
                title={t.projectTitles[project.id] ?? project.titleKey}
                raisedLabel={t.raisedLabel}
                targetLabel={t.targetLabel}
                fundedLabel={t.fundedLabel}
                donorsLabel={t.donorsLabel}
                vsLastMonthLabel={t.vsLastMonthLabel}
                raisedThisMonthLabel={t.raisedThisMonthLabel}
              />
            </>
          ))}
          {mihrab && (
            <ProjectCard
              key={mihrab.id}
              project={mihrab}
              title={t.projectTitles[mihrab.id] ?? mihrab.titleKey}
              raisedLabel={t.raisedLabel}
              targetLabel={t.targetLabel}
              fundedLabel={t.fundedLabel}
              donorsLabel={t.donorsLabel}
              vsLastMonthLabel={t.vsLastMonthLabel}
              raisedThisMonthLabel={t.raisedThisMonthLabel}
            />
          )}
        </div>
      </div>

      {/* Right column: Donation widget */}
      <div className="md:col-span-5 lg:col-span-4">
        <div ref={donationRef} className="sticky top-24">
          <DonationWidget
            title={t.makeADonation}
            subtitle={t.donationSubtitle}
            oneTimeLabel={t.oneTimeLabel}
            monthlyLabel={t.monthlyLabel}
            customAmountLabel={t.customAmountLabel}
            confirmLabel={t.confirmLabel}
            securityNote={t.securityNote}
            processingLabel={t.processingLabel}
          />
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Update `src/app/new-mosque/page.tsx`**

Replace the bento grid section with the new `ProjectGridWithDonation` component. The page stays a server component — only the grid is client-side.

```tsx
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import ProjectGridWithDonation from '@/components/donate/ProjectGridWithDonation';
import StatsRow from '@/components/donate/StatsRow';
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
    <main className="min-h-screen pt-32 pb-20">
      {/* Header — full-width hero image with overlaid title */}
      <header className="mb-8 relative w-full">
        {/* ... existing header unchanged ... */}
      </header>

      <Container>
        <ProjectGridWithDonation
          projects={PROJECTS}
          translations={{
            projectTitles,
            raisedLabel: t('donate.raised'),
            targetLabel: t('donate.target'),
            fundedLabel: t('donate.funded'),
            donorsLabel: t('donate.donors'),
            vsLastMonthLabel: t('donate.vsLastMonth'),
            raisedThisMonthLabel: t('donate.raisedThisMonth'),
            makeADonation: t('donate.makeADonation'),
            donationSubtitle: t('donate.donationSubtitle'),
            oneTimeLabel: t('donate.oneTime'),
            monthlyLabel: t('donate.monthly'),
            customAmountLabel: t('donate.customAmount'),
            confirmLabel: t('donate.confirmDonation'),
            securityNote: t('donate.securityNote'),
            processingLabel: t('donate.processing'),
          }}
        />

        <StatsRow
          transparencyLabel={t('donate.transparency')}
          transparencyDesc={t('donate.transparencyDesc')}
          taxLabel={t('donate.taxDeductible')}
          taxDesc={t('donate.taxDeductibleDesc')}
          accessLabel={t('donate.access')}
          accessDesc={t('donate.accessDesc')}
          secureLabel={t('donate.securePayments')}
          secureDesc={t('donate.securePaymentsDesc')}
        />
      </Container>
    </main>
  );
}
```

Note: Keep the full header JSX from the existing file — the `{/* ... existing header unchanged ... */}` above is just for plan brevity.

**Step 3: Verify build**

Run: `npx next build 2>&1 | tail -30`
Expected: Build succeeds with no errors

**Step 4: Commit**

```bash
git add src/components/donate/ProjectGridWithDonation.tsx src/app/new-mosque/page.tsx
git commit -m "feat: responsive mobile compact tiles with desktop bento grid"
```

---

### Task 4: Visual verification on mobile

**Step 1: Start dev server and verify mobile layout**

Run: `npx next dev`

Check at `localhost:3000/new-mosque`:
- On mobile viewport (< 768px): 2-column grid of compact tiles, all 8 visible in ~one screen
- On desktop viewport (>= 768px): Existing bento layout unchanged
- Tapping a tile on mobile scrolls to DonationWidget

**Step 2: Fix any visual issues found during verification**

Adjust padding, font sizes, or spacing as needed.

**Step 3: Final commit if adjustments were made**

```bash
git add -u
git commit -m "fix: adjust mobile tile spacing after visual verification"
```
