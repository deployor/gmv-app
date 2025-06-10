"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-sm group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-200">
              E
            </div>
            <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Eduze
            </span>
          </Link>
        </div>
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {session ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex flex-col items-end">
                  <p className="text-sm font-medium">{session.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/api/auth/signout")}
                  className="bg-background/50 hover:bg-accent border-border/50"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => (window.location.href = "/api/auth/signin")}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-200"
              >
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 