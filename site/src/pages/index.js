import * as React from "react"
import LandingHero from "../components/LandingHero"
import Popular from "../components/Popular"
import Bestselling from "../components/Bestselling-Carousel"
import CtaSection from "../components/CtaSection"

export default function IndexPage() {
  return (
    <>
      <LandingHero />
      <Popular />
      <CtaSection />
      <Bestselling />
    </>
  )
}

