"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvatarUpload } from "@/components/avatar-upload";
import { MapPin, Plus, X, Star } from "lucide-react";

export default function ProfilePage() {
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  useEffect(() => {
    const fetchProfileAndSkills = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        // Fetch profile data
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (profileData) {
          setProfileData(profileData);
        }

        // Fetch user skills
        const { data: userSkillsData } = await supabase
          .from("user_skills")
          .select("*, skills(name)")
          .eq("user_id", user.id);

        if (userSkillsData) {
          setSkillsOffered(
            userSkillsData
              .filter((s) => s.type === "offered")
              .map((s) => s.skills.name)
          );
          setSkillsWanted(
            userSkillsData
              .filter((s) => s.type === "wanted")
              .map((s) => s.skills.name)
          );
        }
        setLoading(false);
      }
    };
    fetchProfileAndSkills();
  }, [supabase]);

  const addSkillOffered = () => {
    if (
      newSkillOffered.trim() &&
      !skillsOffered.includes(newSkillOffered.trim())
    ) {
      setSkillsOffered([...skillsOffered, newSkillOffered.trim()]);
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (
      newSkillWanted.trim() &&
      !skillsWanted.includes(newSkillWanted.trim())
    ) {
      setSkillsWanted([...skillsWanted, newSkillWanted.trim()]);
      setNewSkillWanted("");
    }
  };

  const removeSkillOffered = (skill: string) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill));
  };

  const removeSkillWanted = (skill: string) => {
    setSkillsWanted(skillsWanted.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      // Update profile data
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: profileData.full_name,
          location: profileData.location,
          availability: profileData.availability,
          is_public: profileData.is_public,
          bio: profileData.bio,
          avatar_url: profileData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Fetch all available skills to get their IDs
      const { data: allSkills, error: allSkillsError } = await supabase
        .from("skills")
        .select("id, name");

      if (allSkillsError) throw allSkillsError;

      const skillNameToIdMap = new Map(
        allSkills.map((skill) => [skill.name, skill.id])
      );

      // Identify new skills to be added to the 'skills' table
      const newSkillNames = [...skillsOffered, ...skillsWanted].filter(
        (skillName) => !skillNameToIdMap.has(skillName)
      );

      if (newSkillNames.length > 0) {
        const newSkills = newSkillNames.map((name) => ({ name }));
        const { data: insertedSkills, error: insertSkillsError } =
          await supabase.from("skills").insert(newSkills).select("id, name");

        if (insertSkillsError) throw insertSkillsError;

        // Add the newly created skills to the map
        for (const newSkill of insertedSkills) {
          skillNameToIdMap.set(newSkill.name, newSkill.id);
        }
      }

      // Fetch current user skills from DB
      const { data: currentUserSkills, error: currentUserSkillsError } =
        await supabase
          .from("user_skills")
          .select("skill_id, type, skills(name)")
          .eq("user_id", user.id);

      if (currentUserSkillsError) throw currentUserSkillsError;

      const currentOfferedSkillNames = currentUserSkills
        .filter((s) => s.type === "offered")
        .map((s) => s.skills.name);
      const currentWantedSkillNames = currentUserSkills
        .filter((s) => s.type === "wanted")
        .map((s) => s.skills.name);

      // Determine skills to add and remove
      const skillsToAdd: { user_id: string; skill_id: number; type: string }[] =
        [];
      const skillsToRemove: number[] = []; // skill_ids to remove

      // Skills Offered
      for (const skillName of skillsOffered) {
        if (!currentOfferedSkillNames.includes(skillName)) {
          const skillId = skillNameToIdMap.get(skillName);
          if (skillId) {
            skillsToAdd.push({
              user_id: user.id,
              skill_id: skillId,
              type: "offered",
            });
          }
        }
      }
      for (const skillName of currentOfferedSkillNames) {
        if (!skillsOffered.includes(skillName)) {
          const skillToRemove = currentUserSkills.find(
            (s) => s.skills.name === skillName && s.type === "offered"
          );
          if (skillToRemove) {
            skillsToRemove.push(skillToRemove.skill_id);
          }
        }
      }

      // Skills Wanted
      for (const skillName of skillsWanted) {
        if (!currentWantedSkillNames.includes(skillName)) {
          const skillId = skillNameToIdMap.get(skillName);
          if (skillId) {
            skillsToAdd.push({
              user_id: user.id,
              skill_id: skillId,
              type: "wanted",
            });
          }
        }
      }
      for (const skillName of currentWantedSkillNames) {
        if (!skillsWanted.includes(skillName)) {
          const skillToRemove = currentUserSkills.find(
            (s) => s.skills.name === skillName && s.type === "wanted"
          );
          if (skillToRemove) {
            skillsToRemove.push(skillToRemove.skill_id);
          }
        }
      }

      // Execute skill changes
      if (skillsToAdd.length > 0) {
        const { error: insertError } = await supabase
          .from("user_skills")
          .insert(skillsToAdd);
        if (insertError) {
          console.error("Insert Error:", insertError);
          throw insertError;
        }
      }

      if (skillsToRemove.length > 0) {
        const { error: deleteError } = await supabase
          .from("user_skills")
          .delete()
          .in("skill_id", skillsToRemove)
          .eq("user_id", user.id);
        if (deleteError) {
          console.error("Delete Error:", deleteError);
          throw deleteError;
        }
      }

      alert("Profile and skills updated successfully!");
    } catch (error) {
      console.error("Error saving profile or skills:", error);
      alert("Error saving profile or skills.");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile information and skills
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and bio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={profileData?.avatar_url || "/placeholder.svg"}
                      alt={profileData?.full_name}
                    />
                    <AvatarFallback className="text-2xl">
                      {profileData?.full_name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <AvatarUpload
                      uid={user.id}
                      onUpload={(url) => {
                        setProfileData({ ...profileData, avatar_url: url });
                        handleSave();
                      }}
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData?.full_name || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          full_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="location"
                      placeholder="City, State/Country"
                      className="pl-10"
                      value={profileData?.location || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself, your experience, and what you're passionate about..."
                    rows={4}
                    value={profileData?.bio || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={profileData?.availability || ""}
                    onValueChange={(value) =>
                      setProfileData({ ...profileData, availability: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="evenings">Evenings</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <div className="space-y-6">
              {/* Skills Offered */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills I Offer</CardTitle>
                  <CardDescription>
                    Add skills you can teach or help others with
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {skillsOffered.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="px-3 py-1"
                        >
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeSkillOffered(skill)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill you can offer..."
                        value={newSkillOffered}
                        onChange={(e) => setNewSkillOffered(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && addSkillOffered()
                        }
                      />
                      <Button onClick={addSkillOffered}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Wanted */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills I Want to Learn</CardTitle>
                  <CardDescription>
                    Add skills you want to learn from others
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {skillsWanted.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeSkillWanted(skill)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill you want to learn..."
                        value={newSkillWanted}
                        onChange={(e) => setNewSkillWanted(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && addSkillWanted()
                        }
                      />
                      <Button onClick={addSkillWanted}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your privacy and account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to other users for skill
                      matching
                    </p>
                  </div>
                  <Switch
                    checked={profileData?.is_public || false}
                    onCheckedChange={(checked) =>
                      setProfileData({ ...profileData, is_public: checked })
                    }
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Account Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">
                        {profileData?.swaps || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Swaps Completed
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                        <span className="text-2xl font-bold text-yellow-600">
                          {profileData?.rating || 0}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average Rating
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {profileData?.activeSwap || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active Swaps
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end space-x-4 mt-8">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
