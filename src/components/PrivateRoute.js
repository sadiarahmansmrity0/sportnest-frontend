"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
export default function PrivateRoute({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // If not authorized, return null (nothing will show while redirecting)
  if (!authorized) return <div className="text-white pt-28">Loading...</div>;
  
  return children;
}