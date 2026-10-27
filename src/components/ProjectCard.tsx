import type { Project } from '../data/projects'
import { ProjectIcon } from './ProjectIcon'

type ProjectCardProps = {
  project: Project
}

// A whole-card link to the project's repository. Colors and hover/focus
// treatment live in `.project-card` (styles/index.css).
export function ProjectCard({ project }: ProjectCardProps) {
  const { name, href, description, tags, icon } = project

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name}: view code on GitHub (opens in a new tab)`}
      className="project-card"
    >
      <div className="flex items-start justify-between gap-4">
        <ProjectIcon name={icon} className="project-icon size-12" />
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="project-arrow size-5"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </div>

      <h3 className="mt-6 font-display text-[clamp(1.6rem,1.35rem+0.6vw,1.95rem)] leading-tight">
        {name}
      </h3>
      <p className="mt-3 text-[0.96875rem] leading-[1.65]">{description}</p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-7">
        {tags.map((tag) => (
          <li key={tag} className="project-tag">
            {tag}
          </li>
        ))}
      </ul>
    </a>
  )
}
