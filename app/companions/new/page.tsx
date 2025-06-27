import CompanionForm from "@/components/CompanionForm"
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const NewCompanion = async () => {
  const canCreateCompanion = await newCompanionPermissions();
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <>
    <main className="min-h-screen items-center justify-center mb-8 -mt-2" style={{ backgroundImage: "url('/images/pattern.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
    <div className="min-lg:w-2/4 min-md:w-10/12">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
        <h1>Companion Builder</h1>
        <CompanionForm />
      </article>
      ) : (
      <article className="companion-limit -mt-14">
        <Image src="/images/limit.svg" alt="Limit Reached" width={360} height={230} />
        <div className="cta-badge">Upgrade your plan</div>
        <h1>You&apos;ve Reached Your Limit</h1>
        <p>You&apos;ve reached your companion limit. <br />Upgrade to create more companions and premium features.</p>
        <Link href="/subscription" className="btn-primary w-full justify-center">
          Upgrade My Plan
        </Link>
      </article>
    )}
    </div>
    </main>
    </>
  )
}

export default NewCompanion