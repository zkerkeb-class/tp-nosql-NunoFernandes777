"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.details || data?.error || "Registration failed");
      }

      router.push("/connexion");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
      >
        <h1 className="text-2xl font-bold text-white mb-5">Register</h1>

        <label className="block text-sm text-white/80 mb-2">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-11 rounded-xl border border-white/25 bg-black px-4 text-white mb-4 outline-none focus:border-cyan-300"
          required
        />

        <label className="block text-sm text-white/80 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 rounded-xl border border-white/25 bg-black px-4 text-white mb-4 outline-none focus:border-cyan-300"
          required
        />

        {error ? <p className="text-red-300 text-sm mb-4">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? "Registering..." : "Create account"}
        </button>

        <p className="text-white/70 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/connexion" className="text-cyan-300">
            Connexion
          </Link>
        </p>
      </form>
    </main>
  );
}
