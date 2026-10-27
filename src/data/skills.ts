// Logos live in src/assets/skills as SVG files: brand logos from Devicon
// (MIT) and Simple Icons (CC0), plus drawn marks for Photon and Cartesia.
// They are bundled by Vite and referenced by file name.
const LOGOS = import.meta.glob<string>('../assets/skills/*.svg', { eager: true, query: '?url', import: 'default' })

const logo = (file: string) => {
  const url = LOGOS[`../assets/skills/${file}.svg`]
  if (!url) throw new Error(`Missing skill logo: ${file}.svg`)
  return url
}

export type Skill = {
  name: string
  logo: string
  /** AI services get a slightly stronger lavender hover glow. */
  ai?: boolean
}

export type SkillCategory = {
  title: string
  /** Illustration on the category's parchment label. */
  emblem: 'sprig' | 'book' | 'compass'
  /** Most icons per row on wide screens; rows wrap and center below that. */
  columns: number
  skills: readonly Skill[]
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    title: 'Languages',
    emblem: 'sprig',
    columns: 10,
    skills: [
      { name: 'Python', logo: logo('python') },
      { name: 'Java', logo: logo('java') },
      { name: 'C', logo: logo('c') },
      { name: 'C++', logo: logo('cplusplus') },
      { name: 'C#', logo: logo('csharp') },
      { name: 'JavaScript', logo: logo('javascript') },
      { name: 'TypeScript', logo: logo('typescript') },
      { name: 'Swift', logo: logo('swift') },
      { name: 'HTML', logo: logo('html5') },
      { name: 'CSS', logo: logo('css3') },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    emblem: 'book',
    columns: 11,
    skills: [
      { name: 'OpenCV', logo: logo('opencv') },
      { name: 'MediaPipe', logo: logo('mediapipe') },
      { name: 'FastAPI', logo: logo('fastapi') },
      { name: 'React', logo: logo('react') },
      { name: 'Next.js', logo: logo('nextjs') },
      { name: 'Express', logo: logo('express') },
      { name: 'Tailwind CSS', logo: logo('tailwindcss') },
      { name: 'Node.js', logo: logo('nodejs') },
      { name: 'Unity', logo: logo('unity') },
      { name: 'SteamVR', logo: logo('steam') },
      { name: 'Photon', logo: logo('photon') },
    ],
  },
  {
    title: 'Tools & Platforms',
    emblem: 'compass',
    columns: 8,
    skills: [
      { name: 'Git', logo: logo('git') },
      { name: 'GitHub', logo: logo('github') },
      { name: 'AWS', logo: logo('amazonwebservices') },
      { name: 'Docker', logo: logo('docker') },
      { name: 'Supabase', logo: logo('supabase') },
      { name: 'SQLite', logo: logo('sqlite') },
      { name: 'IntelliJ IDEA', logo: logo('intellij') },
      { name: 'Xcode', logo: logo('xcode') },
      { name: 'Android SDK', logo: logo('android') },
      { name: 'Vercel', logo: logo('vercel') },
      { name: 'Cartesia API', logo: logo('cartesia'), ai: true },
      { name: 'Anthropic Claude API', logo: logo('claude'), ai: true },
      { name: 'NVIDIA Nemotron', logo: logo('nvidia'), ai: true },
    ],
  },
]
