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
      className={`glass-panel p-3.5 text-left w-full flex flex-col justify-between h-full
        hover:bg-[rgba(var(--color-primary-rgb),0.05)] transition-colors duration-200
        ${project.badge === 'urgent' ? 'border-l-2 border-l-red-500' : ''}`}
    >
      {/* Title */}
      <h3 className="text-sm font-semibold leading-tight mb-2 line-clamp-2">
        {title}
      </h3>

      {/* Progress bar + percentage */}
      <div className="mb-1.5">
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
