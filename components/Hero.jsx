import { Button } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const HeroSection = async () => {
  const user = await currentUser()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
        style={{
          backgroundImage: `url('/images/converso-pattern.png')`,
        }}
      >
        <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-20"
        style={{
          backgroundImage: `url('/images/hero-bg.png')`,
        }}
      ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/80 via-purple-500/70 to-pink-400/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Converso
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed">
              The fun and interactive learning platform designed for students from kindergarten through high school
            </p>
          </div>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Build your personalized learning paths with voice companions that make education
            exciting and accessible for every student.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 cursor-pointer"
            >
              {user ? (
                <Link href="/my-journey">
                  My Journey
                </Link>
              ) : (
                <Link href="/sign-up">
                  Start Learning
                </Link>
              )}
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-8 pt-8">
            <div className="hidden sm:flex items-center space-x-2 text-white/70">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Interactive Lessons</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-white/70">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-100"></div>
              <span className="text-sm font-medium">Progress Tracking</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-white/70">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              <span className="text-sm font-medium">Learn in any Language</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300/20 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-pink-300/20 rounded-full blur-xl animate-bounce delay-300"></div>
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-blue-300/20 rounded-full blur-xl animate-bounce delay-500"></div>
      <div className="absolute bottom-20 right-10 w-14 h-14 bg-purple-300/20 rounded-full blur-xl animate-bounce delay-700"></div>
    </section>
  )
}

export default HeroSection;