import { AboutNavbar } from "@/components/about/about-navbar"
import { AboutHero } from "@/components/about/about-hero"
import { AboutOrigin } from "@/components/about/about-origin"
import { AboutTeam } from "@/components/about/about-team"

export const metadata = {
  title: "Conócenos — HydroCore",
  description:
    "Descubre la historia detrás de HydroCore y conoce a los 9 innovadores que transforman la agricultura en México.",
}

export default function ConocenosPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f4f2" }}>
      <AboutNavbar />
      <main>
        <AboutHero />
        <AboutOrigin />
        <AboutTeam />
      </main>
    </div>
  )
}
