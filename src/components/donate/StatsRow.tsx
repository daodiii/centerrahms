interface StatsRowProps {
  transparencyLabel: string;
  transparencyDesc: string;
  taxLabel: string;
  taxDesc: string;
  accessLabel: string;
  accessDesc: string;
  secureLabel: string;
  secureDesc: string;
  className?: string;
}

export default function StatsRow({
  transparencyLabel,
  transparencyDesc,
  taxLabel,
  taxDesc,
  accessLabel,
  accessDesc,
  secureLabel,
  secureDesc,
  className,
}: StatsRowProps) {
  const stats = [
    {
      label: transparencyLabel,
      description: transparencyDesc,
    },
    {
      label: taxLabel,
      description: taxDesc,
    },
    {
      label: accessLabel,
      description: accessDesc,
    },
    {
      label: secureLabel,
      description: secureDesc,
    },
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-2 mt-6 md:mt-0 ${className || ''}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-center hover:border-primary/30 transition-colors flex flex-col justify-center items-center"
        >
          <h3 className="font-bold text-[9px] md:text-[10px] mb-0.5">{stat.label}</h3>
          <p className="text-[8px] md:text-[9px] text-[var(--color-text-muted)] leading-tight">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
