import { Award } from "lucide-react";
import { ModeToggle } from "../themeButton";
import { AuthButton } from "../auth-button";
import Link from "next/link";
import { Button } from "./button";
import { createClient } from "@/lib/supabase/server";

const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href={"/"} className="flex">
              <Award className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold">SkillSwap</h1>
            </Link>
            <nav className="pl-8">
              {user ? (
                <Link className="text-md font-medium" href="/protected/browse">
                  <Button variant="outline">Browse</Button>
                </Link>
              ) : (
                <Link className="text-md font-medium" href="/browse">
                  <Button variant="outline">Browse</Button>
                </Link>
              )}
              <Link
                href="/protected/my-swap"
                className=" hover:text-indigo-600"
              >
                <Button variant="outline">My Swaps</Button>
              </Link>
            </nav>
          </div>
          <nav className="hidden md:flex space-x-8"></nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
