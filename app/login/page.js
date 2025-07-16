"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        try {
          const response = await fetch("/api/check-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const { exists } = await response.json();
          setEmailExists(exists);
        } catch (err) {
          setEmailExists(false);
        }
      } else {
        setEmailExists(false);
      }
    };
    checkEmail();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailExists || !password) {
      setError("Please fill in all fields correctly.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        document.cookie = `authToken=${responseData.token}; path=/; max-age=3600; SameSite=Strict;`;
        toast.success("Login successful!");
        if (responseData.isAdmin) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        setError(responseData.message || "Login failed");
        toast.error(responseData.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex justify-center items-center py-16">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Login
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                disabled={loading}
              />
              <label htmlFor="remember" className="ml-2 text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              disabled={loading || !emailExists || !password}
              className={`w-full py-3 rounded-lg transition duration-300 ${
                loading || !emailExists || !password
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            <div className="text-center mt-4">
              <Link
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Lost your password?
              </Link>
            </div>
          </form>
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link
              href="/register"
              className="text-blue-500 font-medium hover:underline"
            >
              Register now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}