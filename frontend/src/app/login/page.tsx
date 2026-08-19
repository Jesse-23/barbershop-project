"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Scissors, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT tokens securely in localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user_name", data.name);
        
        // Ensure email is also saved for admin authorization checks
        localStorage.setItem("user_email", email);

        // Redirect to the dashboard
        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Network error. Make sure the backend server is running.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 selection:bg-[#dfb771] selection:text-black">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-[#dfb771] mb-10 hover:opacity-80 transition-opacity">
        <Scissors size={28} />
        <span className="text-2xl font-serif tracking-wide">CutCraft</span>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#111111] border border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl">
        <h1 className="text-3xl font-serif mb-2">Welcome back</h1>
        <p className="text-gray-400 text-sm mb-8">Sign in to manage your chair.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#dfb771] focus:ring-1 focus:ring-[#dfb771] transition-all"
              required
            />
          </div>

          {/* Password with Visibility Toggle */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#dfb771] focus:ring-1 focus:ring-[#dfb771] transition-all"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#dfb771] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#dfb771] text-black font-medium text-base py-3.5 rounded-lg mt-4 hover:bg-[#cda661] transition-colors active:scale-[0.98]"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          New here?{" "}
          <Link href="/signup" className="text-[#dfb771] hover:text-[#cda661] transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}