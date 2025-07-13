"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoggedIN() {
  const router = useRouter();
  useEffect(() => {
    router.push("/protected/profile");
  }, [router]);
}
