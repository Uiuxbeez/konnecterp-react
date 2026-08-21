export function SquigglyArrow({ flip = false, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
      aria-hidden
    >
      {/* Hand-drawn squiggle: a loose double-curl wave, thick rounded stroke */}
      <path
        d="M18,14 C38,2 42,26 22,31 C4,36 6,56 28,53 C52,50 46,70 68,73"
        stroke="#7C4A6B"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Open chevron arrowhead */}
      <path
        d="M55,68 L70,75 L64,58"
        stroke="#7C4A6B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
