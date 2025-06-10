import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container px-4 py-8 mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Welcome back, {session.user?.name}!
            </h1>
            <p className="text-muted-foreground text-lg">
              Here is your learning dashboard overview.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border/50 hover:bg-card/60 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-muted-foreground text-sm">Active Courses</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border/50 hover:bg-card/60 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-muted-foreground text-sm">Completed</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border/50 hover:bg-card/60 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-muted-foreground text-sm">Due Soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-card/30 backdrop-blur border border-border/30 hover:bg-card/40 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Mathematics Assignment 3</p>
                    <p className="text-sm text-muted-foreground">Due: Tomorrow at 11:59 PM</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-medium">
                    Pending
                  </span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-card/30 backdrop-blur border border-border/30 hover:bg-card/40 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Science Lab Report</p>
                    <p className="text-sm text-muted-foreground">Submitted: 2 days ago</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-medium">
                    Completed
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card/30 backdrop-blur border border-border/30 hover:bg-card/40 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">History Essay</p>
                    <p className="text-sm text-muted-foreground">Due: Next week</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-500 text-xs font-medium">
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 