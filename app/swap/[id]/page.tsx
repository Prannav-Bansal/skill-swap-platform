"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Profile = {
  id: string;
  full_name: string;
  avatar_url: string;
  user_skills: {
    id: number;
    skills: {
      name: string;
    };
  }[];
};

import { notFound, useParams } from "next/navigation";

// ... (rest of your imports and types)

export default function SwapRequestPage() {
  const supabase = createClient();
  const params = useParams();
  const responderId = params.id as string;

  const [requester, setRequester] = useState<Profile | null>(null);
  const [responder, setResponder] = useState<Profile | null>(null);
  const [requesterSkill, setRequesterSkill] = useState<string>("");
  const [responderSkill, setResponderSkill] = useState<string>("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be logged in to make a request.");
      setLoading(false);
      return;
    }

    const { data: requesterData, error: requesterError } = await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        avatar_url,
        user_skills (
          id,
          skills (name)
        )
      `
      )
      .eq("id", user.id)
      .eq("user_skills.type", "offered")
      .single();

    if (requesterError || !requesterData) {
      setError("Could not fetch your profile.");
    } else {
      setRequester(requesterData as unknown as Profile);
    }

    const { data: responderData, error: responderError } = await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        avatar_url,
        user_skills (
          id,
          skills (name)
        )
      `
      )
      .eq("id", responderId)
      .eq("user_skills.type", "offered")
      .single();

    if (responderError || !responderData) {
      setError("Could not fetch the other user's profile.");
    } else {
      setResponder(responderData as unknown as Profile);
    }

    setLoading(false);
  }, [supabase, params.id]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!requester || !responder || !requesterSkill || !responderSkill) {
      setError("Please select a skill from both users.");
      return;
    }

    const { error: insertError } = await supabase.from("swap_requests").insert({
      requester_id: requester.id,
      responder_id: responder.id,
      requester_skill_id: requesterSkill,
      responder_skill_id: responderSkill,
      message,
    });

    if (insertError) {
      setError("Could not create swap request. " + insertError.message);
    } else {
      // Redirect or show success message
      alert("Swap request sent!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!requester || !responder) return notFound();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Swap Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Requester Info */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={requester.avatar_url} />
                  <AvatarFallback>
                    {requester.full_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{requester.full_name}</h3>
                <Select
                  onValueChange={setRequesterSkill}
                  value={requesterSkill}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your skill to offer" />
                  </SelectTrigger>
                  <SelectContent>
                    {requester.user_skills.map((skill) => (
                      <SelectItem key={skill.id} value={skill.id.toString()}>
                        {skill.skills.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Responder Info */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={responder.avatar_url} />
                  <AvatarFallback>
                    {responder.full_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{responder.full_name}</h3>
                <Select
                  onValueChange={setResponderSkill}
                  value={responderSkill}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Select ${responder.full_name}'s skill`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {responder.user_skills.map((skill) => (
                      <SelectItem key={skill.id} value={skill.id.toString()}>
                        {skill.skills.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Textarea
              placeholder="Write a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button type="submit" className="w-full">
              Send Swap Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
