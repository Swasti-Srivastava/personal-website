import { useId, type CSSProperties } from 'react'

// Climbing-flower clusters: [x, y, radius, color] on the 520×640 canvas.
const FLOWERS: readonly (readonly [number, number, number, string])[] = [
  // Up the left side of the booth.
  [168, 560, 9, '#c9a3dc'], [160, 530, 7, '#e7a6c1'], [172, 500, 8, '#b79fd6'], [158, 470, 6, '#d6c4ec'],
  [170, 440, 7, '#e7a6c1'], [160, 410, 6, '#b79fd6'], [168, 380, 5, '#c9a3dc'],
  // Around the base.
  [190, 600, 10, '#e7a6c1'], [214, 606, 8, '#c9a3dc'], [372, 604, 9, '#b79fd6'], [394, 598, 10, '#e7a6c1'],
  [410, 584, 7, '#d6c4ec'], [150, 596, 11, '#b79fd6'], [128, 604, 8, '#e7a6c1'],
]

// Wet-glass streaks: [x, y, length, seconds, delay].
const DRIPS: readonly (readonly [number, number, number, number, number])[] = [
  [214, 190, 26, 7, 0], [262, 230, 34, 9, 3], [318, 180, 22, 8, 5.5], [344, 300, 30, 10, 1.5],
  [230, 380, 28, 8.5, 6], [300, 440, 24, 9.5, 2.5], [352, 470, 26, 7.5, 4],
]

// The burgundy telephone booth on a wet street corner, with climbing flowers
// and a streetlamp. (The building behind it is part of MidnightStreet.) Decorative; the handwritten note
// inside is part of the picture, not a control.
export function TelephoneBooth({ className = '' }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const panes = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 3; col++) panes.push({ x: 202 + col * 52, y: 168 + row * 46 })
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 520 640" className={`telephone-booth ${className}`}>
      <defs>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5a1520" />
          <stop offset="40%" stopColor="#8a2433" />
          <stop offset="100%" stopColor="#4e121c" />
        </linearGradient>
        <radialGradient id={`${id}-pane`} cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#ffe6b8" />
          <stop offset="60%" stopColor="#f2bf78" />
          <stop offset="100%" stopColor="#c98a4c" />
        </radialGradient>
        <linearGradient id={`${id}-sign`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3d6" />
          <stop offset="100%" stopColor="#f3d29a" />
        </linearGradient>
        {/* Glows are radial gradients rather than blur filters: the booth
            redraws every frame while it rings, and gradients cost nothing to
            redraw while large blurs are expensive, especially on phones. */}
        <radialGradient id={`${id}-bloom`}>
          <stop offset="0%" stopColor="#f2b56e" stopOpacity="1" />
          <stop offset="55%" stopColor="#f2b56e" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f2b56e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-pool`}>
          <stop offset="0%" stopColor="#f2b56e" stopOpacity="1" />
          <stop offset="100%" stopColor="#f2b56e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-lampglow`}>
          <stop offset="0%" stopColor="#f5c27f" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#f5c27f" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#f5c27f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Warm light spilling from the booth. */}
      <ellipse className="booth-bloom" cx="285" cy="380" rx="200" ry="290" fill={`url(#${id}-bloom)`} opacity="0.28" />

      {/* Streetlamp to the right of the booth. */}
      <g>
        <rect x="452" y="170" width="7" height="440" fill="#1c2033" />
        <path d="M442 610h27l-4-14h-19Z" fill="#1c2033" />
        {/* Soft glow that fades out from the lamp; the flicker lives on the
            wrapper so it can't override the glow's own faintness. */}
        <g className="lamp-halo">
          <circle cx="455.5" cy="152" r="58" fill={`url(#${id}-lampglow)`} />
        </g>
        <path d="M440 138h31l-4 30h-23Z" fill="#ffd9a0" />
        <path d="M436 136h39l-8-14h-23Z M448 168h15v6h-15Z" fill="#1c2033" />
        <path d="M455.5 122v-8" stroke="#1c2033" strokeWidth="3" />
      </g>

      {/* The booth (shakes while a call is coming in). */}
      <g className="booth-body">
        {/* Crown and domed roof. */}
        <path d="M268 44l6-12 7 9 7-9 6 12Z" fill="#c9a24e" />
        <rect x="266" y="44" width="30" height="7" rx="2" fill="#b38b3e" />
        <path d="M170 104C170 72 220 54 281 54S392 72 392 104Z" fill={`url(#${id}-paint)`} />
        <path d="M182 100c18-24 60-36 99-36s81 12 99 36" fill="none" stroke="#a83a48" strokeWidth="2" opacity="0.6" />
        {/* Illuminated TELEPHONE sign. */}
        <rect x="178" y="104" width="206" height="36" rx="3" fill="#3a0e15" />
        <rect className="booth-sign" x="188" y="110" width="186" height="24" rx="2" fill={`url(#${id}-sign)`} />
        <text x="281" y="128" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="19" fontWeight="600" letterSpacing="2.5" fill="#3a1418">
          TELEPHONE
        </text>
        {/* Body and pilasters. */}
        <rect x="184" y="140" width="194" height="452" fill={`url(#${id}-paint)`} />
        <rect x="178" y="140" width="14" height="452" fill="#4e121c" />
        <rect x="370" y="140" width="14" height="452" fill="#4e121c" />
        {/* Glowing panes. */}
        {panes.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="46" height="40" rx="1.5" fill={`url(#${id}-pane)`} />
        ))}
        {/* Faint reflections on the glass. */}
        <path d="M206 172l30 34M258 220l28 30M310 172l22 26M206 360l26 30M310 410l26 28" stroke="#fff" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" />
        {/* The handwritten note, taped inside. */}
        <g transform="rotate(-6 236 236)">
          <rect x="208" y="200" width="60" height="70" fill="#fbf3e4" />
          <rect x="226" y="194" width="22" height="9" fill="#e7cfa8" opacity="0.85" />
          <text fontFamily="Caveat, cursive" fontSize="15" fill="#5a3b3b" textAnchor="middle">
            <tspan x="238" y="222">Pick up</tspan>
            <tspan x="238" y="240">the phone</tspan>
            <tspan x="238" y="258">♡</tspan>
          </text>
        </g>
        {/* Rotary telephone (rings on hover and click). */}
        <g className="booth-phone">
          <rect x="300" y="300" width="44" height="58" rx="5" fill="#1e1a22" />
          <circle cx="322" cy="324" r="13" fill="#2c2731" stroke="#d9b37a" strokeWidth="1.2" />
          <circle cx="322" cy="324" r="4" fill="#d9b37a" />
          <path d="M300 296c0-8 6-12 22-12s22 4 22 12" fill="none" stroke="#1e1a22" strokeWidth="7" strokeLinecap="round" />
          <path d="M344 340c10 6 8 22-2 30" fill="none" stroke="#1e1a22" strokeWidth="2" />
        </g>
        {/* Window bars over the glass. */}
        <path d="M200 166h162M200 534h162M200 166v368M362 166v368" stroke="#5a1520" strokeWidth="5" />
        <rect x="358" y="340" width="5" height="24" rx="2" fill="#c9a24e" />
        {/* Running drips on the glass. */}
        {DRIPS.map(([x, y, length, duration, delay], i) => (
          <path
            key={i}
            className="booth-drip"
            d={`M${x} ${y}v${length}`}
            stroke="#fff4dc"
            strokeOpacity="0.55"
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{ animationDuration: `${duration}s`, animationDelay: `${-delay}s` } as CSSProperties}
          />
        ))}
        {/* Plinth. */}
        <rect x="172" y="590" width="218" height="20" rx="2" fill="#3a0e15" />
      </g>

      {/* Climbing flowers and leaves. */}
      <g className="booth-flowers">
        <path d="M150 610C160 560 176 500 164 440S170 380 168 370M120 610c12-30 30-40 40-60" fill="none" stroke="#56653f" strokeWidth="2.4" strokeLinecap="round" />
        {[[150, 560, -30], [176, 520, 40], [154, 480, -40], [178, 450, 30], [156, 420, -20], [390, 596, 20], [204, 604, -60]].map(([x, y, a], i) => (
          <path key={`leaf${i}`} d="M0 0C5-4 13-5 18-3 13 1 6 3 0 0Z" transform={`translate(${x} ${y}) rotate(${a}) scale(1.4)`} fill="#6f7d55" />
        ))}
        {FLOWERS.map(([x, y, r, color], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy={-r * 0.55} rx={r * 0.45} ry={r * 0.6} transform={`rotate(${a})`} fill={color} opacity="0.95" />
            ))}
            <circle r={r * 0.22} fill="#f7e2a8" />
          </g>
        ))}
      </g>

      {/* Hanging shop sign on a wall bracket, left of the booth. */}
      <g>
        <path d="M0 262h128M24 262v12M112 262v12" stroke="#14152a" strokeWidth="4" fill="none" />
        <rect x="4" y="272" width="146" height="58" rx="8" fill="#3a2a22" stroke="#c9a24e" strokeWidth="2.4" />
        <rect x="11" y="278" width="132" height="46" rx="5" fill="none" stroke="#c9a24e" strokeOpacity="0.5" strokeWidth="1.2" />
        <text x="77" y="298" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="11" fontWeight="600" letterSpacing="0.4" fill="#f3d9a6">
          GOOD CONVERSATIONS
        </text>
        <text x="77" y="317" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="17" fill="#f3d9a6">
          Live Here
        </text>
      </g>

      {/* Old books and a cat asleep on them, bottom left. */}
      <g>
        <rect x="8" y="598" width="104" height="14" rx="2" fill="#6e3340" />
        <rect x="14" y="585" width="92" height="13" rx="2" fill="#3f4d6e" />
        <rect x="4" y="573" width="98" height="12" rx="2" fill="#8c6a47" />
        <path d="M12 605h96M18 591h84M8 579h90" stroke="#f3e2c4" strokeOpacity="0.4" />
        <path d="M20 573c0-18 18-28 42-28 22 0 38 10 38 22 0 4-3 6-8 6Z" fill="#4c4762" />
        <path d="M84 549c8-2 15 3 15 10 0 5-5 8-12 8-8 0-13-4-13-9s4-8 10-9Z" fill="#57516f" />
        <path d="M79 551l1-8 6 6M90 549l4-8 3 8" fill="#57516f" />
        <path d="M82 559c2 1.2 3.4 1.2 5 0M90 559c2 1.2 3.4 1.2 5 0" stroke="#b9b2cc" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M24 572c-8 0-10-7-5-10s11 2 19 3" fill="none" stroke="#4c4762" strokeWidth="6" strokeLinecap="round" />
        <path d="M32 560c10-7 26-9 40-5" fill="none" stroke="#e2b98a" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* Light pooled on the wet stones at the booth's feet. */}
      <ellipse cx="285" cy="626" rx="162" ry="16" fill={`url(#${id}-pool)`} opacity="0.4" />
    </svg>
  )
}
