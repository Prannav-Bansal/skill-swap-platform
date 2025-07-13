"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle, XCircle, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const swapRequests = {
  pending: [
    {
      id: 1,
      type: "received",
      user: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      skillOffered: "Photography",
      skillWanted: "React",
      message:
        "Hi! I'd love to learn React from you. I can teach you photography basics and advanced techniques.",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      type: "sent",
      user: {
        name: "Elena Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
      },
      skillOffered: "UI/UX Design",
      skillWanted: "Spanish",
      message:
        "I'm interested in learning Spanish! I can help you with UI/UX design in return.",
      date: "2024-01-14",
      status: "pending",
    },
  ],
  active: [
    {
      id: 3,
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      skillOffered: "Python",
      skillWanted: "TypeScript",
      startDate: "2024-01-10",
      status: "active",
      progress: 60,
    },
  ],
  completed: [
    {
      id: 4,
      user: {
        name: "Lisa Wang",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      skillOffered: "Marketing",
      skillWanted: "Web Development",
      completedDate: "2024-01-05",
      status: "completed",
      myRating: 5,
      theirRating: 4,
    },
    {
      id: 5,
      user: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      skillOffered: "Fitness Training",
      skillWanted: "UI Design",
      completedDate: "2023-12-20",
      status: "completed",
      myRating: 4,
      theirRating: 5,
    },
  ],
};

export default function MySwapsPage() {
  const [feedbackDialog, setFeedbackDialog] = useState<{
    open: boolean;
    swapId?: number;
  }>({ open: false });
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleAcceptRequest = (requestId: number) => {
    console.log("Accepting request:", requestId);
    // Handle accept logic
  };

  const handleRejectRequest = (requestId: number) => {
    console.log("Rejecting request:", requestId);
    // Handle reject logic
  };

  const handleDeleteRequest = (requestId: number) => {
    console.log("Deleting request:", requestId);
    // Handle delete logic
  };

  const handleSubmitFeedback = () => {
    console.log("Submitting feedback:", {
      swapId: feedbackDialog.swapId,
      rating,
      feedback,
    });
    setFeedbackDialog({ open: false });
    setFeedback("");
    setRating(0);
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRate?: (rating: number) => void
  ) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      {/* <header className=" shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold ">SkillSwap</h1>
            </Link>
            <nav className="flex space-x-8">
              <Link
                href="/browse"
                className="text-gray-700 hover:text-indigo-600"
              >
                Browse
              </Link>
              <Link href="/my-swaps" className="text-indigo-600 font-medium">
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

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">My Swaps</h1>
          <p className=" mt-2">
            Manage your skill exchange requests and activities
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="pending"
              className="flex items-center space-x-2"
            >
              <Clock className="h-4 w-4" />
              <span>Pending ({swapRequests.pending.length})</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Active ({swapRequests.active.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex items-center space-x-2"
            >
              <Star className="h-4 w-4" />
              <span>Completed ({swapRequests.completed.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {swapRequests.pending.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={request.user.avatar || "/placeholder.svg"}
                            alt={request.user.name}
                          />
                          <AvatarFallback>
                            {request.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {request.user.name}
                          </CardTitle>
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.floor(request.user.rating))}
                            <span className="text-sm ">
                              ({request.user.rating})
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          request.type === "received" ? "default" : "secondary"
                        }
                      >
                        {request.type === "received" ? "Received" : "Sent"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">
                            {request.skillOffered}
                          </Badge>
                          <span className="">↔</span>
                          <Badge variant="outline">{request.skillWanted}</Badge>
                        </div>
                      </div>

                      <div className=" p-3 rounded-lg">
                        <p className="text-sm ">{request.message}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm ">
                          Requested on{" "}
                          {new Date(request.date).toLocaleDateString()}
                        </span>

                        <div className="flex space-x-2">
                          {request.type === "received" ? (
                            <>
                              <Button
                                variant="outline"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                              <Button
                                onClick={() => handleAcceptRequest(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => handleDeleteRequest(request.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {swapRequests.pending.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No pending requests</p>
                    <Link href="/browse">
                      <Button className="mt-4">Browse Skills</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-4">
              {swapRequests.active.map((swap) => (
                <Card key={swap.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={swap.user.avatar || "/placeholder.svg"}
                          alt={swap.user.name}
                        />
                        <AvatarFallback>
                          {swap.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {swap.user.name}
                        </CardTitle>
                        <div className="flex items-center space-x-1">
                          {renderStars(Math.floor(swap.user.rating))}
                          <span className="text-sm text-gray-500">
                            ({swap.user.rating})
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">{swap.skillOffered}</Badge>
                          <span className="text-gray-500">↔</span>
                          <Badge variant="outline">{swap.skillWanted}</Badge>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-900">
                            Progress
                          </span>
                          <span className="text-sm text-blue-700">
                            {swap.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${swap.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Started on{" "}
                          {new Date(swap.startDate).toLocaleDateString()}
                        </span>

                        <div className="flex space-x-2">
                          <Button variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button>View Details</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {swapRequests.active.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No active swaps</p>
                    <Link href="/browse">
                      <Button className="mt-4">
                        Find Someone to Swap With
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {swapRequests.completed.map((swap) => (
                <Card key={swap.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={swap.user.avatar || "/placeholder.svg"}
                          alt={swap.user.name}
                        />
                        <AvatarFallback>
                          {swap.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {swap.user.name}
                        </CardTitle>
                        <div className="flex items-center space-x-1">
                          {renderStars(Math.floor(swap.user.rating))}
                          <span className="text-sm text-gray-500">
                            ({swap.user.rating})
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">{swap.skillOffered}</Badge>
                          <span className="text-gray-500">↔</span>
                          <Badge variant="outline">{swap.skillWanted}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-green-900">
                              Your Rating
                            </span>
                            {renderStars(swap.myRating)}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-blue-900">
                              Their Rating
                            </span>
                            {renderStars(swap.theirRating)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Completed on{" "}
                          {new Date(swap.completedDate).toLocaleDateString()}
                        </span>

                        <div className="flex space-x-2">
                          <Dialog
                            open={
                              feedbackDialog.open &&
                              feedbackDialog.swapId === swap.id
                            }
                            onOpenChange={(open) =>
                              setFeedbackDialog({
                                open,
                                swapId: open ? swap.id : undefined,
                              })
                            }
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline">Leave Feedback</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Leave Feedback for {swap.user.name}
                                </DialogTitle>
                                <DialogDescription>
                                  Share your experience with this skill swap
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Rating</Label>
                                  <div className="mt-2">
                                    {renderStars(rating, true, setRating)}
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="feedback">Feedback</Label>
                                  <Textarea
                                    id="feedback"
                                    placeholder="Share your thoughts about this skill swap..."
                                    value={feedback}
                                    onChange={(e) =>
                                      setFeedback(e.target.value)
                                    }
                                    rows={4}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    setFeedbackDialog({ open: false })
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleSubmitFeedback}>
                                  Submit Feedback
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline">Swap Again</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {swapRequests.completed.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No completed swaps yet</p>
                    <Link href="/browse">
                      <Button className="mt-4">Start Your First Swap</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
