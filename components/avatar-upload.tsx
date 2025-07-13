"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

export function AvatarUpload({
  uid,
  onUpload,
}: {
  uid: string;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      onUpload(publicUrl);
    } catch {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label htmlFor="single" className="cursor-pointer">
        <Button variant="outline" className="mb-2 bg-transparent" asChild>
          <span>
            <Camera className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Change Photo"}
          </span>
        </Button>
      </Label>
      <Input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
       <p className="text-sm text-muted-foreground">
          JPG, GIF or PNG. 1MB max.
        </p>
    </div>
  );
}
