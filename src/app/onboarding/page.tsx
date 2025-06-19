"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.grade) {
      // User already onboarded, redirect to wallet or dashboard
      router.replace("/wallet");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        Loading...
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 text-center">
        <p className="text-foreground text-lg">Please sign in to continue.</p>
        <button
          onClick={() => signIn("azure-ad")}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow hover:shadow-lg transition-all"
        >
          <LogIn className="w-5 h-5 mr-2" /> Sign in with Microsoft
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade.trim()) {
      setError("Please enter your grade level.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ grade }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      router.replace("/wallet");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-8 bg-card border border-border rounded-xl shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Complete Your Profile</h1>
        <p className="text-muted-foreground text-center">
          We need a bit more info to create your student card.
        </p>

        {error && (
          <p className="text-destructive text-center text-sm">{error}</p>
        )}

        <div className="space-y-2">
          <label htmlFor="grade" className="block text-sm font-medium">
            Grade Level
          </label>
          <input
            id="grade"
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="e.g. 9"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </main>
  );
} 