import CompanionForm from "@/components/CompanionForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if(!userId) redirect("/sign-in");

  return (
    <main className="min-h-screen items-center justify-center mb-8 -mt-2" style={{ backgroundImage: "url('/images/pattern.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
    <div className="min-lg:w-2/4 min-md:w-10/12">
      <article className="w-full gap-4 flex flex-col">
        <h1>Companion Builder</h1>
        <CompanionForm />
      </article>
    </div>
    </main>
  )
}

export default NewCompanion