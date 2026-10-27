import type { ProjectIconName } from '../components/ProjectIcon'

export type Project = {
  name: string
  href: string
  description: string
  tags: readonly string[]
  icon: ProjectIconName
}

// In page order. The grid lays these out 3 / 2 / 2 on desktop, so the first
// three are the narrower cards.
export const PROJECTS: readonly Project[] = [
  {
    name: 'Tellr',
    href: 'https://github.com/psharm40/Tellr',
    description:
      'A voice-first shopping companion Chrome extension that makes online shopping more accessible. It helps shoppers navigate and understand listings, evaluate sellers, and check purchases for unexpected charges, subscriptions, and other issues before checkout.',
    // Verified from the repository's package.json and extension manifest;
    // Cartesia API added per Savi (voice was a major part of the project).
    tags: ['Chrome Extension', 'TypeScript', 'Next.js', 'Convex', 'Claude API', 'Cartesia API'],
    icon: 'voice-bag',
  },
  {
    name: 'Sentinel AI',
    href: 'https://github.com/calebmitchelllll/Sentinel-AI',
    description:
      'An AI-powered AWS incident-response platform where LLM agents investigate simulated cloud attacks using CloudTrail logs. I worked on the Meta Agent’s false-positive fixes, scope rules, and hallucination scoring, and on the Reporter’s structured output.',
    tags: ['TypeScript', 'Next.js', 'NVIDIA Nemotron', 'Supabase', 'AWS CloudTrail'],
    icon: 'shield',
  },
  {
    name: 'DriveGuard',
    href: 'https://github.com/Swasti-Srivastava/DriveGuard',
    description:
      'An edge AI driver monitor that detects drowsiness through eye closure, yawning, and head tilt. I set up the project and built the scoring system using eye and mouth aspect ratios and a per-driver baseline.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'FastAPI'],
    icon: 'car',
  },
  {
    name: 'TiltProject',
    href: 'https://github.com/Swasti-Srivastava/TiltProject',
    description:
      'A Phineas and Ferb-inspired Android game where players tilt their phones to catch Doofenshmirtz before he falls. Features accelerometer controls, collision detection, and a custom threaded game loop.',
    tags: ['Java', 'Android', 'Sensors'],
    icon: 'phone',
  },
  {
    name: 'SB Spotter',
    href: 'https://github.com/Swasti-Srivastava/SBSpotter2',
    description:
      'A GeoGuessr-style high school location game built with Esha Vigneswaran. Players guess where photos were taken on a floor map and earn points based on distance. Includes hashed-password sign-in and a leaderboard.',
    tags: ['React', 'Express', 'SQLite'],
    icon: 'map',
  },
  {
    name: 'MyFits',
    href: 'https://github.com/Swasti-Srivastava/MyFits',
    description:
      'An Android closet app to add tops and bottoms from a camera or gallery, swipe to build outfits, and save favorite combinations on-device.',
    tags: ['Java', 'Android', 'Gson'],
    icon: 'hanger',
  },
  {
    name: 'WeatherProject',
    href: 'https://github.com/Swasti-Srivastava/WeatherProject',
    description:
      'An Android weather app that retrieves temperature, conditions, and forecast by ZIP code from OpenWeatherMap and includes a weather joke matching the conditions.',
    tags: ['Java', 'Android', 'REST API'],
    icon: 'weather',
  },
]
