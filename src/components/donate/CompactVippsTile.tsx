interface CompactVippsTileProps {
  onClick: () => void;
}

export default function CompactVippsTile({ onClick }: CompactVippsTileProps) {
  return (
    <button
      onClick={onClick}
      className="glass-panel p-3.5 text-left w-full flex flex-col justify-between h-full
        hover:bg-[#ff5b24]/5 transition-colors duration-200 border-l-2 border-l-[#ff5b24]"
    >
      {/* Top half: Title & Circular Graphic */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-[14px] md:text-base font-bold text-[var(--color-text)] leading-snug">
          Vipps
        </h3>

        {/* Vipps "Progress" Circle (Full orange circle to match the style) */}
        <div className="flex-shrink-0 relative w-8 h-8 md:w-10 md:h-10 mt-1">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke="#ff5b24"
              strokeWidth="4"
              className="opacity-20"
            />
            <path
              className="text-[#ff5b24] transition-all duration-1000 ease-out"
              strokeDasharray={'100, 100'}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          {/* Custom Vipps Smiley or icon can go here, using text for now */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[12px] md:text-[14px] font-bold text-[#ff5b24]">
              V
            </span>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="mt-auto pt-2">
        <p className="text-[16px] md:text-lg font-bold text-[#ff5b24] tracking-wider leading-none">
          77811
        </p>
        <p className="text-[11px] md:text-xs text-[var(--color-text-muted)] mt-1">
          Velg kategori
        </p>
      </div>
    </button>
  );
}
