import CompanionCard from '@/components/companionCard'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { getArchivedCompanions, getBookmarkedCompanions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import Link from 'next/link'

const ArchivesPage = async () => {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const archivedCompanions = await getArchivedCompanions(user.id)
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id)
  const bookmarkedIds = new Set(bookmarkedCompanions.map((c) => c.id))

  return (
    <main className="min-h-screen pb-6">
      <h1 className="text-2xl underline mb-6">Archived Companions</h1>
      {archivedCompanions.length === 0 && (
        <p className="text-center text-gray-500">You have no archived companions</p>
      )}
      <section className="companions-grid">
        {archivedCompanions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
            initialBookmarked={bookmarkedIds.has(companion.id)}
          />
        ))}
      </section>
      <div className="mt-8 text-center">
        <Link href="/companions" className="btn-primary">Back to My Companions</Link>
      </div>
    </main>
  )
}

export default ArchivesPage 