import type { SectionId } from '../config/sections'
import { Divider } from './Divider'
import { HandNote } from './HandNote'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  id: SectionId
  number: string
  title: string
  note?: string
}

export function SectionHeading({ id, number, title, note }: SectionHeadingProps) {
  return (
    <Reveal>
      <header className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="text-eyebrow uppercase">{number}</p>
          <h2 id={`${id}-heading`} className="mt-4 text-title">
            {title}
          </h2>
        </div>
        {note && <HandNote className="lg:col-span-4 lg:justify-self-end">{note}</HandNote>}
        <Divider className="lg:col-span-12" />
      </header>
    </Reveal>
  )
}
