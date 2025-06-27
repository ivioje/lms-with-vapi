import CompanionCard from "@/components/companionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions, getBookmarkedCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { SearchParams } from "@/types"
import { currentUser } from "@clerk/nextjs/server";
import AuthGuard from "../middleware/AuthGuard";
import { redirect } from "next/navigation";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic })
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const bookmarkedCompanions = user ? await getBookmarkedCompanions(user.id) : [];
  const bookmarkedIds = new Set(bookmarkedCompanions.map((c) => c.id));
  const authorised = true;

  return (
    <>
    <AuthGuard authorised={authorised} />
    <main className="min-h-screen pb-6">
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="gap-4 flex md:flex-row flex-col items-center">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard 
            key={companion.id} 
            {...companion} 
            color={getSubjectColor(companion.subject)}
            initialBookmarked={bookmarkedIds.has(companion.id)}
          />
        ))}
      </section>
    </main>
    </>
  )
}

export default CompanionsLibrary