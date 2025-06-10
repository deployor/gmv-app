"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Plus,
  Loader2,
  Frown,
  Send,
  Clock,
  Calendar,
  CalendarDays,
  Timer,
  Infinity,
  Trash2,
  Smile,
  Zap,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic import for emoji picker to avoid SSR issues
const EmojiPicker = dynamic(
  () => import('emoji-picker-react'),
  { 
    ssr: false,
    loading: () => <div className="h-80 w-72 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
  }
);

// Types
interface Post {
  id: string;
  title: string;
  content: string;
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
const timeFilters = [
  { key: "today", label: "Today", icon: Clock },
  { key: "week", label: "This Week", icon: Calendar },
  { key: "month", label: "This Month", icon: CalendarDays },
  { key: "year", label: "This Year", icon: Timer },
  { key: "all", label: "All Time", icon: Infinity },
];

const quickReactions = ["👍", "❤️", "😂", "😮", "😢", "😡", "🔥", "💯"];

// Main Component
export default function FeedPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("today");

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [timeFilter, session?.user?.id]);

  const fetchPosts = async () => {
    if (!session) {
        setLoading(false);
        return;
    };
    setLoading(true);
    try {
      const response = await fetch(`/api/posts?time=${timeFilter}`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        console.error("Failed to fetch posts:", data.error);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  if (!session && !loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background text-center p-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground max-w-sm">
            Please sign in to view the feed, create posts, and interact with the community.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/95 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="flex justify-between items-center mb-8">
            <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold tracking-tight"
            >
                Community Feed
            </motion.h1>
          <CreatePostDialog onPostCreated={fetchPosts} />
        </header>

        <div className="flex flex-wrap gap-2 mb-8">
          {timeFilters.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={timeFilter === key ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter(key)}
              className={`transition-all duration-200 rounded-full px-4 ${
                timeFilter === key
                  ? "shadow-primary/20 shadow-lg bg-primary text-primary-foreground"
                  : "bg-card/50 border-border/50 hover:bg-accent/80"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        <AnimatePresence>
          {loading ? (
            <PostSkeletonLoader />
          ) : posts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-card/50 border border-dashed border-border/50 rounded-lg"
            >
              <Frown className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No posts to show</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                There are no posts for this period. Why not be the first to create one?
              </p>
            </motion.div>
          ) : (
            <motion.div className="space-y-6">
              <AnimatePresence>
                {posts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={handleDeletePost}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                    transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Skeleton Loader
function PostSkeletonLoader() {
    return (
        <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="w-full bg-card/70 border border-border/50 p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="flex gap-4 mt-6">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                </Card>
            ))}
        </div>
    )
}

// Create Post Dialog
function CreatePostDialog({ onPostCreated }: { onPostCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCreatePost = async () => {
    if (!title.trim() || isPosting) return;
    setIsPosting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        setTitle("");
        setContent("");
        onPostCreated();
        setOpen(false);
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-primary/30 transition-shadow">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-card border-border/50 rounded-lg">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 bg-background"
              placeholder="Your post title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3 bg-background min-h-[120px]"
              placeholder="(Optional) Add more details..."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="rounded-full">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleCreatePost} disabled={!title.trim() || isPosting} className="rounded-full">
            {isPosting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Enhanced Post Card Component with Full Emoji Picker
const PostCard = motion(
  ({ post, onDelete, ...props }: { post: Post; onDelete: (postId: string) => void }) => {
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
      } catch (error) {
        console.error("Error toggling like:", error);
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
          // Refresh reactions
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
        className="w-full bg-card/70 border border-border/50 backdrop-blur-sm transition-all hover:border-border/80 hover:shadow-lg hover:shadow-primary/5 rounded-xl overflow-hidden"
      >
        <CardHeader className="flex flex-row items-start gap-4 p-5">
          <Avatar>
            <AvatarImage src={post.authorImage || undefined} />
            <AvatarFallback>
              {post.authorName?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">{post.authorName || "Anonymous"}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
          <PostOptionsDropdown post={post} onDelete={onDelete} />
        </CardHeader>
        <CardContent className="px-5 pb-4">
          <h3 className="text-xl font-bold mb-2 tracking-tight">{post.title}</h3>
          {post.content && (
            <p className="text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed">
              {post.content}
            </p>
          )}
        </CardContent>

        {/* Reactions */}
        <AnimatePresence>
          {reactions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 pb-2"
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
                            className="flex items-center gap-1 bg-background/50 hover:bg-background/80 rounded-full px-3 py-1 text-sm transition-all duration-200 shadow-sm hover:shadow-md border border-border/30 hover:border-border/60"
                          >
                            <motion.span 
                              className="text-base"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 0.5, repeat: 0 }}
                            >
                              {reaction.emoji}
                            </motion.span>
                            <span className="text-xs font-medium text-muted-foreground">
                              {reaction.count}
                            </span>
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-card border-border/50">
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

        <CardFooter className="flex justify-between items-center bg-background/30 px-5 py-3">
          <div className="flex gap-1">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLikeToggle}
                className={`flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-all rounded-full ${
                  isLiked ? "text-red-500" : ""
                }`}
              >
                <Heart
                  className={`w-4 h-4 transition-all ${isLiked ? "fill-current" : ""}`}
                />
                <span className="text-sm font-medium">{likeCount}</span>
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary rounded-full"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{post.commentCount}</span>
              </Button>
            </motion.div>
          </div>
          
          <Popover open={showReactionPicker} onOpenChange={setShowReactionPicker}>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-muted-foreground rounded-full hover:text-primary"
                >
                  <Smile className="w-4 h-4" />
                  <span className="text-xs">React</span>
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-card/95 border-border/50 backdrop-blur-sm rounded-xl overflow-hidden">
              <Tabs defaultValue="quick" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-background/50">
                  <TabsTrigger value="quick" className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Quick
                  </TabsTrigger>
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <Smile className="w-4 h-4" />
                    All
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="quick" className="p-4 space-y-3 m-0">
                  <h4 className="font-medium text-sm text-center">Quick Reactions</h4>
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
                        className="text-2xl p-2 hover:bg-accent/80 rounded-lg transition-all duration-200 relative group"
                      >
                        {emoji}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="all" className="p-0 m-0">
                  <div className="h-80 flex items-center justify-center">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      autoFocusSearch={false}
                      width="100%"
                      height="100%"
                      skinTonesDisabled
                      searchDisabled={false}
                      previewConfig={{
                        showPreview: false
                      }}
                      lazyLoadEmojis={true}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>
        </CardFooter>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-background/20"
            >
              <Separator />
              <CommentSection postId={post.id} />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  }
);

// Enhanced Post Options Dropdown with Smooth Delete
function PostOptionsDropdown({ post, onDelete }: { post: Post; onDelete: (postId: string) => void }) {
  const { data: session } = useSession();
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(post.id);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
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
      alert("Link copied to clipboard!");
    }
  };

  const isAuthor = session?.user?.id === post.authorId;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border/50 rounded-lg">
        <DropdownMenuItem className="cursor-pointer" onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" /> Share
        </DropdownMenuItem>
        {isAuthor && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 hover:text-red-700 focus:text-red-700" 
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border/50">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this post? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 rounded-full"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Comment Section (simplified for space)
function CommentSection({
  postId,
}: {
  postId: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
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
  };

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
    <div className="p-5 space-y-4">
      <form onSubmit={handleAddComment} className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
            <AvatarImage src={useSession().data?.user?.image || undefined} />
            <AvatarFallback>{useSession().data?.user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-background flex-1 rounded-full px-4 py-2 resize-none"
          rows={1}
        />
        <Button type="submit" size="icon" disabled={!newComment.trim()} className="rounded-full">
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.authorImage || undefined} />
                <AvatarFallback>
                  {comment.authorName?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-background/50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{comment.authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="text-sm mt-1 leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center text-muted-foreground py-4">
          Be the first to comment!
        </p>
      )}
    </div>
  );
} 