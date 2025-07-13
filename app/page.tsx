// import { UserProfile } from "@/components/user-profile-card";
// import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import Header from "@/components/ui/header";
import { Award, Star, TrendingUp, Users } from "lucide-react";

export default async function Home() {
  // const supabase = await createClient();
  // const { data: profiles } = await supabase.from("profiles").select();

  // const users: UserProfile[] =
  //   profiles?.map((profile) => ({
  //     id: profile.id,
  //     full_name: profile.full_name,
  //     avatar_url: profile.avatar_url,
  //     skills_offered: ["Skill A", "Skill B"], // placeholder
  //     skills_wanted: ["Skill C", "Skill D"], // placeholder
  //     rating: 4.5, // placeholder
  //   })) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Trade Skills, Build Connections
          </h2>
          <p className="text-xl mb-8">
            Connect with others to exchange knowledge and learn new skills.
            Teach what you know, learn what you want.
          </p>

          {/* Search Bar */}
          <SearchInput />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-indigo-600 mr-2" />
                <span className="text-3xl font-bold">2,500+</span>
              </div>
              <p>Active Members</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-3xl font-bold">5,000+</span>
              </div>
              <p>Skills Exchanged</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-500 mr-2" />
                <span className="text-3xl font-bold">4.8</span>
              </div>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Start Swapping?
          </h3>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of learners and teachers in our community
          </p>
          <div className="space-x-4">
            <Link href="/protected">
              <Button size="lg" variant="secondary">
                Create Your Profile
              </Button>
            </Link>
            <Link href="/protected/browse">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-indigo-600 bg-transparent"
              >
                Browse Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-6 w-6" />
                <span className="text-xl font-bold">SkillSwap</span>
              </div>
              <p className="text-gray-400">
                Connecting learners and teachers worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/protected/browse" className="hover:text-white">
                    Browse Skills
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="https://github.com/PrakharSinghOnGit/Odoo-hackathon/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>Visit Github for source code</p>
            <a
              className="underline"
              href="https://github.com/PrakharSinghOnGit/Odoo-hackathon"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
