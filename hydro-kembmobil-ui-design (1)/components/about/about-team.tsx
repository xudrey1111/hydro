"use client"

import { useState } from "react"
import Image from "next/image"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  photo: string | null
}

const members: TeamMember[] = [
  { id: 1, name: "Integrante 1", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
  { id: 2, name: "Integrante 2", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
  { id: 3, name: "Integrante 3", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
  { id: 4, name: "Integrante 4", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
  { id: 5, name: "Integrante 5", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
  { id: 6, name: "Integrante 6", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
  { id: 7, name: "Integrante 7", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
  { id: 8, name: "Integrante 8", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
  { id: 9, name: "Integrante 9", role: "Rol / Área", bio: "Descripción breve del integrante.", photo: null },
]

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div
      className="group flex flex-col items-center rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
      style={{ backgroundColor: "#f7faf8", border: "1px solid #c2d9cc" }}
    >
      {/* Photo placeholder */}
      <div
        className="relative w-28 h-28 rounded-full overflow-hidden flex items-center justify-center mb-4 shrink-0"
        style={{ backgroundColor: "#d4ede1" }}
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <span
            className="text-4xl font-bold font-serif select-none"
            style={{ color: "#1a6b3c" }}
          >
            {member.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <h3 className="text-base font-semibold text-foreground text-center">{member.name}</h3>
      <p className="mt-1 text-sm text-center" style={{ color: "#1a6b3c" }}>
        {member.role}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-center text-foreground/70">{member.bio}</p>
    </div>
  )
}

export function AboutTeam() {
  return (
    <section
      className="px-8 py-20 md:px-16 lg:px-24"
      style={{ backgroundColor: "#e8f2ec" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <h2 className="font-serif text-5xl font-bold text-foreground text-balance">
            Nuestro <span style={{ color: "#1a6b3c" }}>Equipo</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70 max-w-lg">
            9 mentes brillantes trabajando juntas para revolucionar la forma en que producimos alimentos en México.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
