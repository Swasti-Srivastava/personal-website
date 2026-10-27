import type { ExperienceIconName } from '../components/ExperienceIcon'

export type Experience = {
  title: string
  company: string
  location: string
  dates: string
  points: readonly string[]
  icon: ExperienceIconName
}

// In timeline order; cards alternate left/right starting on the left.
export const EXPERIENCE: readonly Experience[] = [
  {
    title: 'Software Engineering Intern',
    company: 'InkaAI',
    location: 'Remote',
    dates: 'June 2026 – September 2026',
    points: [
      'Built an AI-powered customer relations agent using Python and LLM APIs to automate email conversations.',
      'Developed automation workflows for processing and responding to incoming customer messages.',
      'Contributed to the company’s website interface and user experience.',
    ],
    icon: 'laptop',
  },
  {
    title: 'Instructional Officer',
    company: 'Girls Who Code — UC Santa Cruz',
    location: 'Santa Cruz, CA',
    dates: 'May 2026 – Present',
    points: [
      'Help organize and lead technical workshops for students interested in computer science.',
      'Develop educational content covering programming, technical interview preparation, and cloud technologies.',
      'Support an inclusive community that encourages students to explore technology.',
    ],
    icon: 'book',
  },
  {
    title: 'Sales Advisor',
    company: 'Bunny’s Shoes',
    location: 'Santa Cruz, CA',
    dates: 'October 2026 – Present',
    points: [
      'Assist customers in finding footwear suited to their needs and preferences.',
      'Provide product guidance and personalized customer service.',
      'Support daily retail operations and maintain an organized sales floor.',
    ],
    icon: 'boots',
  },
  {
    title: 'Front Desk Associate',
    company: 'Tea House Spa',
    location: 'Santa Cruz, CA',
    dates: 'May 2026 – Present',
    points: [
      'Manage appointment scheduling, customer check-ins, and front desk operations.',
      'Assist guests with reservations, questions, and payments.',
      'Use scheduling and point-of-sale software to support daily operations.',
    ],
    icon: 'teacup',
  },
  {
    title: 'Sales Advisor',
    company: 'Best Buy',
    location: 'Princeton, NJ / Soquel, CA',
    dates: 'February 2024 – April 2026',
    points: [
      'Assisted customers with computers, mobile devices, home theater products, and appliances.',
      'Ranked among the top 10 sales advisors on the West Coast.',
      'Achieved #1 membership performance within my micromarket.',
    ],
    icon: 'tag',
  },
  {
    title: 'Robotics Mentor',
    company: 'LeapCoderz',
    location: 'West Windsor Township, NJ',
    dates: 'July 2023 – September 2023',
    points: [
      'Taught students introductory robotics and programming concepts.',
      'Guided hands-on projects to develop technical and problem-solving skills.',
      'Helped students explore STEM through interactive activities.',
    ],
    icon: 'robot',
  },
]
