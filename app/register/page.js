"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, phone }),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow flex justify-center items-center py-16">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-text text-center mb-8">
            Register
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-text mb-2">Username *</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-text mb-2">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-text mb-2">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-text mb-2">Phone Number *</label>
              <PhoneInput
                international
                defaultCountry="NG"
                value={phone}
                onChange={setPhone}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter your phone number"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-secondary text-white py-3 rounded-lg hover:bg-primary transition duration-300 ${
                loading ? "bg-gray-300 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-text">Already have an account?</p>
            <Link
              href="/login"
              className="text-secondary font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}