"use client";

import { useState, useEffect, useCallback } from "react";
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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
  MoreVertical,
  Plus,
  Loader2,
  Send,
  Trash2,
  Smile,
  Zap,
  TrendingUp,
  Users,
  Sparkles,
  Flame,
  Star,
  Globe,
  BookOpen,
  Camera,
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

const timeFilters = [
  { key: "today", label: "Today", color: "from-blue-500 to-blue-600" },
  { key: "week", label: "Week", color: "from-purple-500 to-purple-600" },
  { key: "month", label: "Month", color: "from-green-500 to-green-600" },
  { key: "year", label: "Year", color: "from-orange-500 to-orange-600" },
  { key: "all", label: "All", color: "from-gray-500 to-gray-600" },
];

export default function FeedPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    activeUsers: 0,
    postsToday: 0,
    totalReactions: 0,
    totalUsers: 0,
  });
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const fetchTrendingTopics = useCallback(async () => {
    try {
      const response = await fetch('/api/trending');
      if (response.ok) {
        const data = await response.json();
        setTrendingTopics(data);
      }
    } catch (error) {
      console.error('Failed to fetch trending topics:', error);
    }
  }, []);

  const fetchCommunityStats = useCallback(async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setCommunityStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch community stats:', error);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    if (!session) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/posts?time=${timeFilter}`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [session, timeFilter]);

  useEffect(() => {
    if (session) {
      fetchPosts();
      fetchTrendingTopics();
      fetchCommunityStats();
    }
  }, [session, fetchPosts, fetchTrendingTopics, fetchCommunityStats]);

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowEditDialog(true);
  };

  if (!session && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Join the Community
          </h2>
          <p className="text-gray-300 max-w-sm mx-auto">
            Sign in to discover amazing content, connect with others, and share your thoughts with the world.
          </p>
        </motion.div>
      </div>
    );
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
            <p className="text-gray-400 mt-1">What&apos;s going on in ya school rn?</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
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
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Time Filters */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Timeline
              </h3>
              <div className="space-y-2">
                {timeFilters.map(({ key, label, color }) => (
                  <button
                    key={key}
                    onClick={() => setTimeFilter(key)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                      timeFilter === key 
                        ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105` 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="font-medium">{label}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Trending */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5" />
                Trending
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic) => {
                  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
                    "Sparkles": Sparkles,
                    "Camera": Camera,
                    "Star": Star,
                    "Flame": Flame,
                    "Zap": Zap,
                    "MessageCircle": MessageCircle,
                    "Users": Users,
                  };
                  const IconComponent = iconMap[topic.icon] || Sparkles;
                  return (
                    <motion.div
                      key={topic.name}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{topic.name}</div>
                        <div className="text-gray-400 text-xs">{topic.count} posts</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Stats */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Community
              </h3>
                              <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Users</span>
                    <span className="text-white font-semibold">{communityStats.activeUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Posts Today</span>
                    <span className="text-white font-semibold">{communityStats.postsToday.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Reactions</span>
                    <span className="text-white font-semibold">{communityStats.totalReactions.toLocaleString()}</span>
                  </div>
                </div>
            </Card>
          </motion.div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <AnimatePresence>
              {loading ? (
                <PostSkeletonLoader />
              ) : posts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No posts yet</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">
                    Be the first to share something amazing with the community!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {posts.map((post, index) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onDelete={handleDeletePost}
                        onEdit={handleEditPost}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, scale: 0.95, transition: { duration: 0.3 } }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <CreatePostFAB onPostCreated={fetchPosts} />
      
      {/* Edit Post Dialog */}
      {editingPost && (
        <EditPostDialog
          post={editingPost}
          open={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingPost(null);
          }}
          onSave={fetchPosts}
        />
      )}
    </div>
  );
}

// Floating Action Button for Creating Posts
function CreatePostFAB({ onPostCreated }: { onPostCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCreatePost = async () => {
    if (!title.trim() || isPosting) return;
    setIsPosting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category: category || "General" }),
      });
      if (response.ok) {
        setTitle("");
        setContent("");
        setCategory("");
        onPostCreated();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      fetchCategories();
    }
  };

      return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-purple-500/25 transition-all duration-300"
          >
            <Plus className="w-8 h-8" />
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-gray-900/95 backdrop-blur-xl border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Share your thoughts
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 text-lg"
            />
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Category</label>
              <Select value={category} onValueChange={setCategory} disabled={loadingCategories}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select a category"} />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="General" className="text-white hover:bg-gray-700">
                    General
                  </SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name} className="text-white hover:bg-gray-700">
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Tell us more... (optional)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[120px] resize-none"
            />
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)} className="flex-1 border-white/20 text-gray-300 hover:text-white">
                Cancel
              </Button>
              <Button 
                onClick={handleCreatePost} 
                disabled={!title.trim() || isPosting}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isPosting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
}

// Edit Post Dialog
function EditPostDialog({ 
  post, 
  open, 
  onClose, 
  onSave 
}: { 
  post: Post; 
  open: boolean; 
  onClose: () => void; 
  onSave: () => void; 
}) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content || "");
  const [category, setCategory] = useState(post.category || "General");
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || isSaving) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });
      if (response.ok) {
        onSave();
        onClose();
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose();
    } else {
      fetchCategories();
    }
  };

  useEffect(() => {
    if (open) {
      setTitle(post.title);
      setContent(post.content || "");
      setCategory(post.category || "General");
      fetchCategories();
    }
  }, [open, post]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900/95 backdrop-blur-xl border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Edit your post
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="What's on your mind?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 text-lg"
          />
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory} disabled={loadingCategories}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select a category"} />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="General" className="text-white hover:bg-gray-700">
                  General
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name} className="text-white hover:bg-gray-700">
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder="Tell us more... (optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[120px] resize-none"
          />
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 border-white/20 text-gray-300 hover:text-white">
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!title.trim() || isSaving}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Enhanced Post Card with Modern Design
const PostCard = motion(
  ({ post, onDelete, onEdit, ...props }: { post: Post; onDelete: (postId: string) => void; onEdit?: (post: Post) => void }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(Number(post.likeCount) || 0);
    const [showComments, setShowComments] = useState(false);
    const [reactions, setReactions] = useState<Reaction[]>([]);
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    useEffect(() => {
      const checkLikeStatus = async () => {
        try {
          const res = await fetch(`/api/posts/${post.id}/like`);
          const data = await res.json();
          if (res.ok) setIsLiked(data.liked);
        } catch (error) {
          console.error("Failed to check like status", error);
        }
      };
      
      const fetchReactions = async () => {
        try {
          const res = await fetch(`/api/posts/${post.id}/reactions`);
          const data = await res.json();
          if (res.ok) setReactions(data);
        } catch (error) {
          console.error("Failed to fetch reactions", error);
        }
      };
      
      checkLikeStatus();
      fetchReactions();
    }, [post.id]);

    const handleLikeToggle = async () => {
      const originalLiked = isLiked;
      const originalLikeCount = likeCount;

      setIsLiked(!originalLiked);
      setLikeCount(originalLikeCount + (!originalLiked ? 1 : -1));

      try {
        const response = await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
        if (!response.ok) {
          setIsLiked(originalLiked);
          setLikeCount(originalLikeCount);
        }
      } catch {
        setIsLiked(originalLiked);
        setLikeCount(originalLikeCount);
      }
    };

    const handleReaction = async (emoji: string) => {
      try {
        const response = await fetch(`/api/posts/${post.id}/reactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emoji }),
        });
        
        if (response.ok) {
          const res = await fetch(`/api/posts/${post.id}/reactions`);
          const data = await res.json();
          if (res.ok) setReactions(data);
        }
      } catch (error) {
        console.error("Error adding reaction:", error);
      }
      setShowReactionPicker(false);
    };

    const onEmojiClick = (emojiData: { emoji: string }) => {
      handleReaction(emojiData.emoji);
    };

    return (
      <Card
        {...props}
        className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group"
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-12 h-12 ring-2 ring-purple-500/20">
              <AvatarImage src={post.authorImage || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {post.authorName?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-white">{post.authorName || "Anonymous"}</h4>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-0">
                  Author
                </Badge>
              </div>
              <p className="text-gray-400 text-sm">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
                            <PostOptionsDropdown post={post} onDelete={onDelete} onEdit={onEdit} />
          </div>

          {/* Content */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3 leading-tight">
              {post.title}
            </h3>
            {post.content && (
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            )}
          </div>

          {/* Reactions */}
          <AnimatePresence>
            {reactions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="flex flex-wrap gap-2">
                  <TooltipProvider>
                    <AnimatePresence>
                      {reactions.map((reaction, index) => (
                        <Tooltip key={reaction.emoji}>
                          <TooltipTrigger asChild>
                            <motion.button
                              initial={{ opacity: 0, scale: 0, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0, y: -20 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleReaction(reaction.emoji)}
                              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 text-sm transition-all duration-200 border border-white/10"
                            >
                              <span className="text-lg">{reaction.emoji}</span>
                              <span className="text-white font-medium">{reaction.count}</span>
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 border-gray-700">
                            <p className="text-sm max-w-xs">
                              {reaction.users?.slice(0, 3).join(", ")}
                              {reaction.users?.length > 3 && ` and ${reaction.users.length - 3} more`} reacted with {reaction.emoji}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </AnimatePresence>
                  </TooltipProvider>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-1">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLikeToggle}
                  className={`text-gray-400 hover:text-red-400 hover:bg-red-500/10 ${
                    isLiked ? "text-red-400 bg-red-500/10" : ""
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  {likeCount}
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {post.commentCount}
                </Button>
              </motion.div>
            </div>
            
            <div className="flex items-center gap-2">
              <Popover open={showReactionPicker} onOpenChange={setShowReactionPicker}>
                <PopoverTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                    >
                      <Smile className="w-5 h-5 mr-2" />
                      React
                    </Button>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 bg-gray-800/95 border-gray-700 backdrop-blur-xl">
                  <Tabs defaultValue="quick" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-700/50">
                      <TabsTrigger value="quick" className="flex items-center gap-2 text-white">
                        <Zap className="w-4 h-4" />
                        Quick
                      </TabsTrigger>
                      <TabsTrigger value="all" className="flex items-center gap-2 text-white">
                        <Smile className="w-4 h-4" />
                        All
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="quick" className="p-4 space-y-3 m-0">
                      <div className="grid grid-cols-4 gap-2">
                        {quickReactions.map((emoji, index) => (
                          <motion.button
                            key={emoji}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.3, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleReaction(emoji)}
                            className="text-2xl p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                          >
                            {emoji}
                          </motion.button>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="all" className="p-0 m-0">
                      <div className="h-80">
                        <EmojiPicker
                          onEmojiClick={onEmojiClick}
                          width="100%"
                          height="100%"
                          searchDisabled={false}
                          skinTonesDisabled
                          previewConfig={{ showPreview: false }}
                          lazyLoadEmojis={true}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/10 pt-4 mt-4"
              >
                <CommentSection postId={post.id} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    );
  }
);

// Post Options Dropdown
function PostOptionsDropdown({ post, onDelete, onEdit }: { 
  post: Post; 
  onDelete: (postId: string) => void;
  onEdit?: (post: Post) => void;
}) {
  const { data: session } = useSession();
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      if (response.ok) {
        onDelete(post.id);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const isAuthor = session?.user?.id === post.authorId;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800/95 border-gray-700 backdrop-blur-xl">
        <DropdownMenuItem onClick={handleShare} className="text-gray-300 hover:text-white focus:text-white">
          <Share2 className="w-4 h-4 mr-2" /> Share
        </DropdownMenuItem>
        {isAuthor && (
          <>
            <DropdownMenuItem onClick={handleEdit} className="text-gray-300 hover:text-white focus:text-white">
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem 
                  className="text-red-400 hover:text-red-300 focus:text-red-300" 
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900/95 border-gray-700 backdrop-blur-xl text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Post</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    Are you sure you want to delete this post? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Skeleton Loader
function PostSkeletonLoader() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/4 bg-white/10" />
              <Skeleton className="h-3 w-1/2 bg-white/10" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4 bg-white/10" />
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-5/6 bg-white/10" />
          </div>
          <div className="flex gap-4 mt-6">
            <Skeleton className="h-8 w-16 bg-white/10" />
            <Skeleton className="h-8 w-16 bg-white/10" />
          </div>
        </Card>
      ))}
    </div>
  );
}

// Comment Section
function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const { data: session } = useSession();

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`);
      if (res.ok) {
        setComments(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      if (res.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddComment} className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={session?.user?.image || undefined} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
            {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none"
            rows={1}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!newComment.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.authorImage || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                  {comment.authorName?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white text-sm">{comment.authorName}</span>
                  <span className="text-gray-400 text-xs">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{comment.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-6">
          Be the first to comment! 💬
        </p>
      )}
    </div>
  );
} 