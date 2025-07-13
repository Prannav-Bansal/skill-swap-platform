"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type RequestStatus = "pending" | "accepted" | "rejected";

interface SwapRequest {
  id: number;
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  status: RequestStatus;
  rating: number;
  imageUrl: string;
}

export default function SwapRequestsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState<RequestStatus>("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const requestsPerPage = 4;

  const swapRequests: SwapRequest[] = [
    {
      id: 1,
      name: "Marc Demo",
      skillsOffered: ["JavaScript", "React"],
      skillsWanted: ["Photoshop", "Illustration"],
      status: "pending",
      rating: 3.9,
      imageUrl: "",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      skillsOffered: ["TypeScript", "Next.js"],
      skillsWanted: ["UI/UX Design"],
      status: "accepted",
      rating: 4.2,
      imageUrl: "",
    },
    {
      id: 3,
      name: "Alex Thompson",
      skillsOffered: ["Node.js", "Express"],
      skillsWanted: ["3D Modeling"],
      status: "rejected",
      rating: 4.0,
      imageUrl: "",
    },
    {
      id: 4,
      name: "Emily Chen",
      skillsOffered: ["Vue.js", "Nuxt.js"],
      skillsWanted: ["Social Media Design"],
      status: "pending",
      rating: 4.5,
      imageUrl: "",
    },
  ];

  // Filter requests based on status and search query
  const filteredRequests = swapRequests.filter((request) => {
    const matchesStatus = request.status === activeStatus;
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      request.skillsWanted.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStatusChange = (status: RequestStatus) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  const handleRequestAction = (id: number, p0: string) => {
    // In a real app, you would update the request status in your database here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-800">
              Skill Swap Platform
            </h1>
          </div>
          <Button variant="outline" className="hover:bg-gray-100">
            Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Swap Requests</h2>
            <p className="text-gray-600 mt-1">
              Manage your incoming skill swap requests
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2 mb-6">
            <Button
              variant={activeStatus === "pending" ? "default" : "outline"}
              onClick={() => handleStatusChange("pending")}
            >
              Pending
            </Button>
            <Button
              variant={activeStatus === "accepted" ? "default" : "outline"}
              onClick={() => handleStatusChange("accepted")}
            >
              Accepted
            </Button>
            <Button
              variant={activeStatus === "rejected" ? "default" : "outline"}
              onClick={() => handleStatusChange("rejected")}
            >
              Rejected
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-8 max-w-md">
            <Input
              placeholder="Search requests by name or skill..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {currentRequests.length} of {filteredRequests.length}{" "}
            requests
          </div>

          {/* Requests List */}
          <div className="space-y-4 mb-8">
            {currentRequests.length > 0 ? (
              currentRequests.map((request) => (
                <Card
                  key={request.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-blue-100 text-blue-800 font-medium">
                            {request.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {request.name}
                          </CardTitle>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">
                              {request.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      {request.status !== "pending" && (
                        <Badge
                          variant={
                            request.status === "accepted"
                              ? "default"
                              : "destructive"
                          }
                          className="px-3 py-1 text-sm"
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">
                          Skills Offered
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {request.skillsOffered.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-blue-50 text-blue-700"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">
                          Skills Wanted
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {request.skillsWanted.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {request.status === "pending" ? (
                      <div className="flex space-x-3 mt-4">
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() =>
                            handleRequestAction(request.id, "accept")
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() =>
                            handleRequestAction(request.id, "reject")
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                          {request.status === "accepted"
                            ? "You accepted this request on " +
                              new Date().toLocaleDateString()
                            : "You rejected this request on " +
                              new Date().toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  No {activeStatus} requests found
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveStatus("pending");
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {currentRequests.length > 0 && (
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className="w-10 h-10 p-0"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
