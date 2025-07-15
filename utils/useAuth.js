"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import { getAuthToken, clearAuthToken } from "@/utils/auth";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) throw new Error("Invalid token");
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          toast.error("Session expired. Please log in again.");
          clearAuthToken();
          setIsAuthenticated(false);
          setUser(null);
          router.push("/login");
        } else {
          setIsAuthenticated(true);
          setUser({
            userId: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            phone: decoded.phone,
            isAdmin: decoded.isAdmin,
          });
        }
      } catch (error) {
        console.error("Token error:", error);
        clearAuthToken();
        setIsAuthenticated(false);
        setUser(null);
        router.push("/login");
      }
    }
  }, [router]);

  const logout = () => {
    clearAuthToken();
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return { isAuthenticated, user, logout };
}