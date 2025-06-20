import CompanionCard from '@/components/companionCard'
import CompanionsList from '@/components/CompanionsList'
import HeroSection from '@/components/Hero.jsx'
import CTA from '@/components/CTA'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10)
  return (
    <>
    <HeroSection />
    <main className='pb-12'>
      <h1 className='text-2xl underline'>Popular Companions</h1>
      <section className='home-section'>
        {
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              { ...companion }
              color={getSubjectColor(companion.subject)}
            />
          ))
         }
      </section>

      <section className='home-section'>
        <CompanionsList 
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
          slice={6}
        />
        <CTA />
      </section>
    </main>
    </>
  )
}

export default Page