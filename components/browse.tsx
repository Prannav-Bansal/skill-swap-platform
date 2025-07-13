"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SetStateAction, useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Marc Demo",
    rating: 3.9,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Designer"],
  },
  {
    id: 2,
    name: "Michell",
    rating: 2.5,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Designer"],
  },
  {
    id: 3,
    name: "Joe Wills",
    rating: 4.0,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Designer"],
    imageUrl: "",
  },
];

export default function Browse({ q }: { q: string | undefined }) {
  const [query, setQuery] = useState(q);

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <Select
          onValueChange={(value: SetStateAction<string>) =>
            setAvailability(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="evenings">Evenings</SelectItem>
            <SelectItem value="any">Any</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={query ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills..."
        />
      </div>

      {/* User Cards */}
      <div className="space-y-6">
        {mockUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-green-600 mt-1">
                  Skills Offered ⇒{" "}
                  {user.skillsOffered.map((s, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 m-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-blue-600">
                  Skills Wanted ⇒{" "}
                  {user.skillsWanted.map((s, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 m-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </p>
              </div>
              <div className="text-right">
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Request
                </button>
                <div className="text-sm mt-1 text-gray-500">
                  Rating: {user.rating}/5
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button>Request</Button>
              <span className="text-sm text-muted-foreground">
                rating {user.rating}/5
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2 text-sm font-medium">
        {["<", 1, 2, 3, 4, 5, 6, 7, ">"].map((item, index) => (
          <Button
            key={index}
            variant={item === 1 ? "default" : "ghost"}
            size="sm"
            className="w-8 h-8 rounded-full p-0"
          >
            {item}
          </Button>
        ))}
      </div>
    </>
  );
}
