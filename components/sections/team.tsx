'use client'

import Image from 'next/image'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { team } from '@/lib/site'

export function Team() {
  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="The hands behind it"
            title="Two people, one sketchbook"
          />
        </ScrollReveal>

        <ul className="mt-10 grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} variant="scale-up" delay={i * 150}>
              <li>
                <article className="group pixel-box flex h-full flex-col bg-card">
                  <div className="art-ground relative aspect-square overflow-hidden border-b-4 border-border">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="pixel-zoom object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <h3 className="font-display text-sm uppercase transition-transform duration-200 group-hover:-translate-y-0.5">
                      {member.name}
                    </h3>
                    <p className="font-display text-[10px] uppercase text-primary">
                      {member.role}
                    </p>
                    <p className="text-pretty text-xl leading-snug text-muted-foreground">
                      {member.body}
                    </p>
                  </div>
                </article>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
