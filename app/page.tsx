import CompanionCard from '@/components/companionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard
          id='123'
          name='Neura the Brainy Explorer'
          topic='Neural Network of the Brain'
          subject='science'
          duration={45}
          color='#4A90E2'
         />
        <CompanionCard
          id='456'
          name='Luna the Creative Thinker'
          topic='art'
          subject='arts'
          duration={30}
          color='#E94E77'
        />
        <CompanionCard
          id='789'
          name='Atlas the Knowledge Seeker'
          topic='history'
          subject='history'
          duration={60}
          color='#F5A623'
        />
      </section>

      <section className='home-section'>
        <CompanionsList 
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page