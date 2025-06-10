"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container px-4 py-24 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground font-bold text-4xl shadow-2xl shadow-primary/25 mb-8">
            E
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Eduze
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Free open school platform for the community, not your teacher...
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 pt-8">
            {session ? (
              <div className="space-y-4 text-center">
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 shadow-lg">
                  <p className="text-lg font-medium text-foreground mb-2">
                    Welcome back, {session.user?.name}!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 hover:scale-105"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/api/auth/signout"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-card hover:bg-accent text-card-foreground border border-border/50 font-medium transition-all duration-200 hover:scale-105"
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div className="p-8 rounded-2xl bg-card/30 backdrop-blur border border-border/30 shadow-xl max-w-md mx-auto">
                  <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                  <p className="text-muted-foreground mb-6">
                    Sign in with your Microsoft account to access your dashboard.
                  </p>
                  <button
                    onClick={() => signIn("azure-ad")}
                    className="inline-flex items-center justify-center w-full px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group"
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    Sign in with Microsoft
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
