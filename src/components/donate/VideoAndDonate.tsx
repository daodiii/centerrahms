'use client';

import DonationWidget from './DonationWidget';

interface VideoAndDonateProps {
    translations: {
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

export default function VideoAndDonate({ translations: t }: VideoAndDonateProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Left: Video Section */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full">
                <div className="glass-panel p-2 md:p-4 h-full flex flex-col">
                    <div className="relative w-full rounded-lg overflow-hidden bg-black/5 aspect-video flex-grow shadow-inner flex items-center justify-center">
                        <video
                            controls
                            className="absolute inset-0 w-full h-full object-cover"
                            poster="/nymoskeoversikt.png"
                        >
                            <source src="/NyRahmavideo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

            {/* Right: Donation Widget */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
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
    );
}
