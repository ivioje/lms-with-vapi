import CompanionCard from '@/components/companionCard'
import CompanionsList from '@/components/CompanionsList'
import HeroSection from '@/components/Hero.jsx'
import CTA from '@/components/CTA'
import { getUserCompanions, getUserSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

const Page = async () => {
  const { userId } = await auth();

  // Fetch user-specific data only if the user is logged in
  const companions = userId ? await getUserCompanions(userId) : [];
  const recentSessionsCompanions = userId ? await getUserSessions(userId, 10) : [];

  return (
    <>
    <HeroSection />
    <main className='my-12'>
      {!userId && <h1 className='text-2xl underline text-center'>My Companions</h1>}
      {userId && (
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl underline'>My Companions</h1>
          <Link href="/companions" className='btn-primary'>View All</Link>
        </div>

        )}
      <section className='home-section pb-8'>
        {userId ? (
          companions.length ? (
            companions.slice(0, 3).map((companion) => (
              <CompanionCard
                key={companion.id}
                { ...companion }
                color={getSubjectColor(companion.subject)}
              />
            ))
          ) : (
            <p className='text-center w-full'>You don't have any companions yet.</p>
          )
        ) : (
          <p className='text-center w-full'>
            <Link href="/sign-in" className='underline'>Log in </Link> 
            to view your companions</p>
        )}
      </section>

      <section className='home-section flex justify-center'>
        {userId && recentSessionsCompanions.length > 0 && (
          <CompanionsList
            title="Recently completed sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
            slice={6}
          />
        )}
        <CTA />
      </section>
    </main>
    </>
  )
}

export default Page