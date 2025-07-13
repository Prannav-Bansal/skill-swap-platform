"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchInput() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const doSearch = () => {
    router.push(`/protected/browse?q=${q}`);
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
        <Input
          onChange={(e) => setQ(e.target.value)}
          type="text"
          value={q}
          placeholder="Search for skills like 'Photography', 'Spanish', 'Coding'..."
          className="pl-10 pr-4 py-3 text-lg rounded-full border-2 focus:border-indigo-500"
        />
        <Button
          onClick={doSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
