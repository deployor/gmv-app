"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Search,
  Edit,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic imports
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { 
  ssr: false,
  loading: () => <div className="h-80 w-72 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
});

// Types
interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  authorId: string;
  authorName: string | null;
  authorImage: string | null;
  likeCount: number;
  commentCount: number;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string | null;
  authorImage: string | null;
  parentId: string | null;
}

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
  userIds: string[];
}

// Constants
const quickReactions = ["👍", "❤️", "😂", "😮", "😢", "😡", "🔥", "💯"];

interface TrendingTopic {
  name: string;
  count: number;
  icon: string;
  color: string;
}

interface CommunityStats {
  activeUsers: number;
  postsToday: number;
  totalReactions: number;
  totalUsers: number;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  createdAt: Date;
}


return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
    {/* Background Effects */}
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
    <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Discover
          </h1>
          <p className="text-gray-400 mt-1">What&apos;s happening in your world</p>
        </div>
        i
        <div className="flex items-center gap-4">
          {/* Search */}
          <div classeName="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 transition-all"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        

} 