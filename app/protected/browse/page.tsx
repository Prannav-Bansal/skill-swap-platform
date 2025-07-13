"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Star, Filter, Award } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const users = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["React", "TypeScript", "UI/UX Design"],
    skillsWanted: ["Python", "Data Science"],
    rating: 4.9,
    swapsCompleted: 12,
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Mike Johnson",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Photography", "Video Editing", "Photoshop"],
    skillsWanted: ["Web Development", "Marketing"],
    rating: 4.8,
    swapsCompleted: 8,
    availability: "Evenings",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Spanish", "Guitar", "Cooking"],
    skillsWanted: ["Yoga", "Meditation"],
    rating: 5.0,
    swapsCompleted: 15,
    availability: "Flexible",
  },
  {
    id: 4,
    name: "David Kim",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Python", "Machine Learning", "Data Analysis"],
    skillsWanted: ["Frontend Development", "Design"],
    rating: 4.7,
    swapsCompleted: 6,
    availability: "Weekdays",
  },
  {
    id: 5,
    name: "Lisa Wang",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Marketing", "Content Writing", "Social Media"],
    skillsWanted: ["Photography", "Video Production"],
    rating: 4.9,
    swapsCompleted: 11,
    availability: "Weekends",
  },
  {
    id: 6,
    name: "Alex Thompson",
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Fitness Training", "Nutrition", "Yoga"],
    skillsWanted: ["Business Strategy", "Finance"],
    rating: 4.8,
    swapsCompleted: 9,
    availability: "Evenings",
  },
];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.skillsOffered.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          user.skillsWanted.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((user) =>
        user.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (availabilityFilter) {
      filtered = filtered.filter(
        (user) =>
          user.availability.toLowerCase() === availabilityFilter.toLowerCase()
      );
    }

    setFilteredUsers(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setAvailabilityFilter("");
    setFilteredUsers(users);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">SkillSwap</h1>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/browse" className="text-indigo-600 font-medium">
                Browse
              </Link>
              <Link
                href="/my-swaps"
                className="text-gray-700 hover:text-indigo-600"
              >
                My Swaps
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-indigo-600"
              >
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header> */}

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">Browse Skills</h1>
          <p className=" mt-2">Find people to swap skills with</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
                  <Input
                    placeholder="Search by skill or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleSearch}>Search</Button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="san francisco">
                        San Francisco, CA
                      </SelectItem>
                      <SelectItem value="new york">New York, NY</SelectItem>
                      <SelectItem value="austin">Austin, TX</SelectItem>
                      <SelectItem value="seattle">Seattle, WA</SelectItem>
                      <SelectItem value="los angeles">
                        Los Angeles, CA
                      </SelectItem>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Select
                    value={availabilityFilter}
                    onValueChange={setAvailabilityFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="evenings">Evenings</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" onClick={clearFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="">
            Showing {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "person" : "people"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <div className="flex items-center text-sm ">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium  mb-2">Offers:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsOffered.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium  mb-2">Wants:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsWanted.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Available: {user.availability}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{user.rating}</span>
                      <span>({user.swapsCompleted})</span>
                    </div>
                  </div>

                  <Button className="w-full">Request Swap</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className=" text-lg">No users found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mt-4 bg-transparent"
            >
              Clear filters to see all users
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
