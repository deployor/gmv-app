"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Share2, IdCard } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionValue, useTransform } from "framer-motion";

// Dynamically import barcode and QR code to avoid SSR issues
const Barcode = dynamic(() => import("react-barcode"), { ssr: false });
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

export default function WalletPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Motion values for subtle 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const rotateX = useTransform(tiltY, [-50, 50], [4, -4]); // invert because Y axis
  const rotateY = useTransform(tiltX, [-50, 50], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Normalize to -50..50
    tiltX.set((x / rect.width) * 100 - 50);
    tiltY.set((y / rect.height) * 100 - 50);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // === Hooks must be declared before any conditional early returns ===

  // Redirect logic moved to effect to avoid state updates during render
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
      return;
    }

    if (status === "authenticated") {
      if (!session?.user?.studentId || !session?.user?.grade) {
        router.replace("/onboarding");
      }
    }
  }, [status, session, router]);

  const handleShare = useCallback(() => {
    if (!session?.user?.studentId) return;
    const data = {
      title: "My Student ID",
      text: `Name: ${session.user?.name ?? ""}\nStudent ID: ${session.user.studentId}`,
    } as ShareData;

    if (navigator.share) {
      navigator.share(data).catch((err) => console.error("Share failed", err));
    } else {
      navigator.clipboard.writeText(`${session.user.studentId}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [session?.user?.name, session?.user?.studentId]);

  const handleDownloadPdf = useCallback(async () => {
    try {
      const res = await fetch("/api/wallet/print", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to generate PDF");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "temporary-id.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Show loader after hooks are declared
  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground text-sm">Loading...</div>
      </main>
    );
  }

  // Determine readiness to render wallet card
  const ready =
    status === "authenticated" &&
    !!session?.user?.studentId &&
    !!session?.user?.grade;

  if (!ready) {
    return null; // Redirect effect will handle navigation
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-4 text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative overflow-hidden rounded-xl"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-slate-700 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <IdCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-extrabold tracking-tight">
                      Student ID
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Digital card for quick verification
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white h-fit">
                  Grade {session.user.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-8 relative z-10">
              {/* Profile photo */}
              <div className="relative">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile photo"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-slate-800 shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-3xl font-semibold">
                    {session.user.name?.[0] ?? "?"}
                  </div>
                )}
              </div>

              {/* Personal details */}
              <div className="text-center space-y-0.5">
                <div className="text-xl font-semibold tracking-wide">
                  {session.user.name}
                </div>
                <div className="text-sm text-slate-400">{session.user.email}</div>
                <div className="font-mono text-lg tracking-widest text-primary-foreground/90 mt-1">
                  #{session.user.studentId}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="bg-white p-2 rounded-md shadow-inner w-full flex justify-center">
                  <Barcode value={session.user.studentId!} format="CODE128" width={2} height={80} displayValue={false} />
                </div>
                <div className="bg-white p-4 rounded-md shadow-inner w-full flex justify-center">
                  <QRCode value={session.user.studentId!} size={128} fgColor="#000000" bgColor="#FFFFFF" />
                </div>
              </div>

              {/* Expiry & issuer */}
              <div className="flex items-center justify-between w-full text-xs text-slate-400 pt-2">
                <span>Valid until {new Date().getFullYear() + 1}</span>
                <span>Eduze Academy</span>
              </div>
            </CardContent>
            <CardFooter className="relative z-10">
              <Button onClick={handleShare} className="w-full gap-2">
                <Share2 className="w-4 h-4" /> {copied ? "Copied!" : "Share / Copy"}
              </Button>
            </CardFooter>
            <CardFooter className="relative z-10 pt-2">
              <Button variant="secondary" onClick={handleDownloadPdf} className="w-full gap-2">
                <IdCard className="w-4 h-4" />
                Download Temporary ID (PDF)
              </Button>
            </CardFooter>

            {/* Hologram overlay */}
            <div className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400 opacity-50 animate-spin-slow blur-sm" />
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
} 