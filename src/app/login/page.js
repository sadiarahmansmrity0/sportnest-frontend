'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trophy, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); // Use the result of the fetch

    if (res.ok && data.success) {
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login crash:", err);
    alert("Server connection failed");
  }
};
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 pt-20">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
            <Trophy className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-black tracking-tight">
            Welcome Back
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            Sign in to your account
          </p>

        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-xs text-red-400">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>

            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
              Email Address
            </label>

            <div className="relative">

              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <Mail className="w-4 h-4" />
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="smrity@gmail.com"
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
              Password
            </label>

            <div className="relative">

              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-black text-sm rounded-xl transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center text-xs text-slate-400 mt-6">

          Don't have an account?{' '}

          <Link
            href="/register"
            className="text-emerald-400 font-bold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}