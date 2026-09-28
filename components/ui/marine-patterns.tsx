/** Small horizontal wave strokes - used as accent ornament */
export function WavePattern({ className = "text-sky-300" }: { className?: string }) {
  return (
    <svg className={className} width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8C8 4 12 4 16 8C20 12 24 12 28 8C32 4 36 4 40 8C44 12 48 12 52 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 22C8 18 12 18 16 22C20 26 24 26 28 22C32 18 36 18 40 22C44 26 48 26 52 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 36C8 32 12 32 16 36C20 40 24 40 28 36C32 32 36 32 40 36C44 40 48 40 52 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 50C8 46 12 46 16 50C20 54 24 54 28 50C32 46 36 46 40 50C44 54 48 54 52 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Fish-scale arc pattern - used as left-side decorative ornament */
export function ScalePattern({ className = "text-orange-400" }: { className?: string }) {
  return (
    <svg className={className} width="42" height="96" viewBox="0 0 42 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14C4 22 17 22 17 14M17 14C17 22 30 22 30 14M30 14C30 22 43 22 43 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 34C4 42 17 42 17 34M17 34C17 42 30 42 30 34M30 34C30 42 43 42 43 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 54C4 62 17 62 17 54M17 54C17 62 30 62 30 54M30 54C30 62 43 62 43 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 74C4 82 17 82 17 74M17 74C17 82 30 82 30 74M30 74C30 82 43 82 43 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Large tiled wave grid - used as full-background texture overlay */
export function WaveTilePattern({ className = "text-sky-400" }: { className?: string }) {
  return (
    <svg className={className} width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 30, 60, 90, 120, 150, 180].map((y) => (
        <path
          key={y}
          d={`M0 ${y + 10}C20 ${y + 2} 40 ${y + 2} 60 ${y + 10}C80 ${y + 18} 100 ${y + 18} 120 ${y + 10}C140 ${y + 2} 160 ${y + 2} 180 ${y + 10}C200 ${y + 18} 220 ${y + 18} 240 ${y + 10}C260 ${y + 2} 280 ${y + 2} 300 ${y + 10}C320 ${y + 18} 340 ${y + 18} 360 ${y + 10}`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** Dot grid pattern for subtle depth */
export function DotGridPattern({ className = "text-sky-200" }: { className?: string }) {
  return (
    <svg className={className} width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0,1,2,3,4,5,6,7,8,9].map((row) =>
        [0,1,2,3,4,5,6,7,8,9].map((col) => (
          <circle key={`${row}-${col}`} cx={col * 22 + 11} cy={row * 22 + 11} r="2" fill="currentColor" />
        ))
      )}
    </svg>
  );
}

/** Wave divider SVG - bottom of ocean-blue header sections */
export function WaveDivider({ className = "text-slate-50" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
    >
      <path
        fill="currentColor"
        d="M0,30 C120,55 240,10 360,30 C480,50 600,10 720,30 C840,50 960,10 1080,30 C1200,50 1320,10 1440,30 L1440,60 L0,60 Z"
      />
    </svg>
  );
}
