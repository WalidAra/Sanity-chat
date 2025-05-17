import {
  ArrowRight,
  MessageSquare,
  Shield,
  Zap,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export default function AppLanding() {

  const {accessToken} = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center transition-transform hover:scale-105">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="font-semibold text-black tracking-tight text-lg">
              Sanity Chat
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <Link
              to={""}
              className="text-sm font-medium text-black hover:text-gray-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to={""}
              className="text-sm font-medium text-gray-600 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              Features
            </Link>
            <Link
              to={""}
              className="text-sm font-medium text-gray-600 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              Pricing
            </Link>
            <Link
              to={""}
              className="text-sm font-medium text-gray-600 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              Help
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {accessToken ? (
              <Link to={"home"}>
                <Button className="rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 px-6 py-2 font-medium shadow-sm hover:shadow-md">
                  Home
                </Button>
              </Link>
            ) : (
              <>
                {" "}
                <Link
                  to={"/auth/sign-in"}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  Sign In
                </Link>
                <Link to={"auth/sign-up"}>
                  <Button className="rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 px-6 py-2 font-medium shadow-sm hover:shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 relative">
        {/* Background gradient effect - using gray instead of blue */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl -z-10 opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl -z-10 opacity-80"></div>

        {/* Update notification */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full px-5 py-2.5 inline-flex items-center gap-2 shadow-sm hover:shadow transition-shadow duration-300 cursor-pointer group">
            <span className="font-semibold text-sm bg-black text-white px-3 py-1 rounded-full">
              New Release!
            </span>
            <span className="text-sm font-medium group-hover:text-black transition-colors">
              Sanity Chat v2.0 is now available!
            </span>
          </div>
        </div>

        {/* Hero section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Messaging Made{" "}
            <MessageSquare className="inline h-8 w-8 text-black animate-pulse" />{" "}
            Simple
            <span className="block mt-1">For Teams & Individuals</span>
          </h1>
          <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            A secure, lightning-fast chat platform for businesses, remote teams,
            communities, and friends. Stay connected with crystal-clear
            communication.
          </p>
          <Link to={accessToken ? "/home" : "/auth/sign-up"}>
            <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-8 py-7 h-auto text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              Try Sanity Chat Free{" "}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Rating section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm transition-transform hover:scale-110 hover:z-10"
                style={{ zIndex: 5 - i }}
              >
                <img
                  src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                  alt={`User ${i}`}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
            <Star className="h-5 w-5 fill-black text-black" />
            <span className="font-semibold text-lg">4.9/5</span>
            <span className="text-gray-600 text-sm font-medium">
              Rated by over 10,000 users
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
          {[
            { icon: Zap, text: "Lightning-fast messaging" },
            { icon: Shield, text: "End-to-end encryption" },
            { icon: Users, text: "Unlimited team members" },
            { icon: MessageSquare, text: "24/7 Support" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="bg-gray-100 p-2 rounded-full group-hover:bg-black transition-colors duration-300">
                <feature.icon className="h-5 w-5 text-gray-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Stats and graphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Message activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative border border-gray-100">
            <div className="absolute -top-6 left-6 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md border border-gray-100">
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">
                New message from Alex!{" "}
                <span className="inline-block animate-bounce">💬</span>
              </span>
            </div>

            <div className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Weekly Message Activity
                  </p>
                  <p className="text-3xl font-bold tracking-tight mt-1">
                    5,280
                  </p>
                </div>
                <button className="text-gray-400 hover:text-black transition-colors p-1 hover:bg-gray-100 rounded-full">
                  •••
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Active Channel
                </span>
                <span className="text-sm font-semibold">+32% growth</span>
              </div>

              <div className="h-32 mb-2">
                {/* Enhanced line chart representation */}
                <div className="h-full w-full relative">
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
                  <div className="absolute left-0 bottom-1/4 right-0 h-px bg-gray-100"></div>
                  <div className="absolute left-0 bottom-2/4 right-0 h-px bg-gray-100"></div>
                  <div className="absolute left-0 bottom-3/4 right-0 h-px bg-gray-100"></div>

                  <svg viewBox="0 0 100 32" className="h-full w-full">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,24 L20,22 L40,12 L60,14 L80,8 L100,16"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,24 L20,22 L40,12 L60,14 L80,8 L100,16 L100,32 L0,32 Z"
                      fill="url(#gradient)"
                    />
                    <circle
                      cx="20"
                      cy="22"
                      r="2"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <circle
                      cx="40"
                      cy="12"
                      r="2"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <circle
                      cx="60"
                      cy="14"
                      r="2"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <circle
                      cx="80"
                      cy="8"
                      r="2"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-500 pt-2 font-medium">
                <span>Monday</span>
                <span>Tuesday</span>
                <span>Wednesday</span>
                <span>Thursday</span>
                <span>Friday</span>
              </div>
            </div>
          </div>

          {/* Center content - intentionally left empty to match layout */}
          <div className="hidden md:block"></div>

          {/* Chat status */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Design Team</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                  8 members
                </span>
              </div>
              <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-medium">
                Active Now
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-semibold">Sarah Johnson</span>
              <div className="h-2 w-2 rounded-full bg-black"></div>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full mb-10 overflow-hidden">
              <div className="h-full w-3/4 bg-black rounded-full relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-gray-400 opacity-20"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 group">
                <span className="text-base font-semibold group-hover:text-black transition-colors">
                  Website Redesign Project
                </span>
                <div className="p-1 rounded-full bg-gray-100 group-hover:bg-black transition-colors">
                  <ArrowRight className="h-4 w-4 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Messages Today
              </p>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-3xl font-bold tracking-tight">128</p>
                <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded-sm font-medium">
                  +24%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* App preview section */}
        <div className="max-w-5xl mx-auto mb-20 bg-gray-50 rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">
                Experience seamless communication
              </h2>
              <p className="text-gray-600 mb-6">
                Sanity Chat brings your team together with organized
                conversations, file sharing, and powerful integrations - all in
                a clean, distraction-free interface.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Real-time messaging with typing indicators",
                  "Secure file sharing and storage",
                  "Voice and video calls with screen sharing",
                  "Powerful search across all conversations",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-black flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-6 py-2">
                Get Started Free
              </Button>
            </div>
            <div className="md:w-1/2 bg-white rounded-xl shadow-md p-4 border border-gray-200">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      Chat application preview
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 border-t border-gray-100 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-black flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="font-medium text-sm text-gray-600">
              © 2025 Sanity Chat. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to={""}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Terms
            </Link>
            <Link
              to={""}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Privacy
            </Link>
            <Link
              to={""}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
