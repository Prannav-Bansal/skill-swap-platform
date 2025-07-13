
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export type UserProfile = {
  id: string;
  full_name: string;
  avatar_url: string;
  skills_offered: string[];
  skills_wanted: string[];
  rating: number;
};

export function UserProfileCard({ user }: { user: UserProfile }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar_url} alt={user.full_name} />
          <AvatarFallback>{user.full_name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.full_name}</CardTitle>
          <CardDescription>Rating: {user.rating}/5</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="font-semibold">Skills Offered</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skills_offered.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Skills Wanted</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skills_wanted.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/swap/request?responderId=${user.id}`} className="w-full">
          <Button className="w-full">Request Swap</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
