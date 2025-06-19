"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Star,
  Camera,
  Upload,
  ChefHat,
  StarHalf,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Users,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

// Types
interface CanteenMeal {
  id: string;
  name: string;
  description: string | null;
  category: string;
  allergens: string[];
  nutritionInfo: Record<string, unknown> | null;
  price: number | null;
  availableDate: string;
  dayOfWeek: string;
  createdAt: string;
  avgRating: number;
  ratingCount: number;
  photoCount: number;
  photos: Photo[];
  mealType?: string;
  externalMealId?: string;
  isAvailable?: boolean;
}

interface Photo {
  id: string;
  photoUrl: string;
  caption: string | null;
  isOfficial: number;
  userName: string | null;
  userImage: string | null;
  userId: string;
  createdAt: string;
}

interface Rating {
  id: string;
  rating: number;
  review: string | null;
  taste: number | null;
  presentation: number | null;
  value: number | null;
  createdAt: string;
  userName: string | null;
  userImage: string | null;
  userId: string;
}

interface MealHistory {
  date: string;
  dayOfWeek: string;
  avgRating: number;
  ratingCount: number;
  photoCount: number;
}

export default function MealDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const mealId = params.mealId as string;

  const [meal, setMeal] = useState<CanteenMeal | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [mealHistory, setMealHistory] = useState<MealHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Rating form state
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [taste, setTaste] = useState(0);
  const [presentation, setPresentation] = useState(0);
  const [value, setValue] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  // Photo upload state
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);

  const fetchMealData = useCallback(async () => {
    if (!session || !mealId) return;

    try {
      console.log("Fetching meal with ID:", mealId);
      
      // Fetch meal details from external API using meal ID
      const externalResponse = await fetch(`/api/canteen/external?mealId=${mealId}`);
      let foundMeal: CanteenMeal | null = null;
      
      if (externalResponse.ok) {
        const externalData = await externalResponse.json();
        console.log("External API response:", externalData);
        // Should return only the matching meal
        foundMeal = externalData.meals[0] || null;
        console.log("Found meal:", foundMeal);
      } else {
        console.error("External API error:", externalResponse.status, externalResponse.statusText);
      }

      // Fetch ratings, photos, and sync meal data in parallel
      const [ratingsResponse, photosResponse] = await Promise.all([
        fetch(`/api/canteen/${mealId}/ratings`),
        fetch(`/api/canteen/${mealId}/photos`),
        // Sync meal to database if we found it
        foundMeal ? fetch('/api/canteen/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ meal: foundMeal }),
        }).catch(() => {}) : Promise.resolve(), // Ignore sync errors
      ]);

      let ratingsData: Rating[] = [];
      let photosData: Photo[] = [];

      if (ratingsResponse.ok) {
        ratingsData = await ratingsResponse.json();
        setRatings(ratingsData);

        // Set user's existing rating if any
        const userRating = ratingsData.find((r: Rating) => r.userId === session.user?.id);
        if (userRating) {
          setRating(userRating.rating);
          setReview(userRating.review || "");
          setTaste(userRating.taste || 0);
          setPresentation(userRating.presentation || 0);
          setValue(userRating.value || 0);
        }
      }

      if (photosResponse.ok) {
        photosData = await photosResponse.json();
        setPhotos(photosData);
      }

      if (foundMeal) {
        // Calculate average rating from fetched ratings
        const avgRating = ratingsData.length > 0 
          ? ratingsData.reduce((sum: number, r: Rating) => sum + r.rating, 0) / ratingsData.length 
          : 0;

        setMeal({
          ...foundMeal,
          avgRating,
          ratingCount: ratingsData.length,
          photoCount: photosData.length,
          photos: photosData.slice(0, 3), // Preview photos
        });

        // Try to fetch meal history (previous instances of the same meal name)
        try {
          const historyResponse = await fetch(`/api/canteen/external?mealName=${encodeURIComponent(foundMeal.name)}`);
          if (historyResponse.ok) {
            const historyData = await historyResponse.json();
            const historicalMeals = historyData.meals.filter((meal: CanteenMeal) => 
              meal.name === foundMeal.name && meal.id !== mealId
            );
            
            // Create history entries (this would be enhanced with actual historical rating data)
            const history = historicalMeals.map((meal: CanteenMeal) => ({
              date: meal.availableDate,
              dayOfWeek: meal.dayOfWeek,
              avgRating: 0, // Would need to fetch historical ratings
              ratingCount: 0,
              photoCount: 0,
            }));
            
            setMealHistory(history);
          }
        } catch (error) {
          console.error("Failed to fetch meal history:", error);
          setMealHistory([]);
        }
      } else {
        // Meal not found in external API, try to create from database or show error
        setMeal(null);
      }

    } catch (error) {
      console.error("Failed to fetch meal data:", error);
      setMeal(null);
    } finally {
      setLoading(false);
    }
  }, [session, mealId]);

  useEffect(() => {
    fetchMealData();
  }, [fetchMealData]);

  const handleRatingSubmit = async () => {
    if (rating === 0) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/canteen/${mealId}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, review, taste, presentation, value }),
      });

      if (response.ok) {
        setShowRatingDialog(false);
        fetchMealData();
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
    setSubmitting(false);
  };

  const handlePhotoUpload = async () => {
    setUploading(true);
    try {
      const response = await fetch(`/api/canteen/${mealId}/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption }),
      });

      if (response.ok) {
        setCaption("");
        setShowPhotoDialog(false);
        fetchMealData();
      }
    } catch (error) {
      console.error("Failed to upload photo:", error);
    }
    setUploading(false);
  };

  const renderStars = (rating: number, size = "w-4 h-4") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className={`${size} fill-yellow-400 text-yellow-400`} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`${size} text-slate-600`} />);
    }

    return stars;
  };



  const StarRating = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: number; 
    onChange: (value: number) => void; 
    label: string; 
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-colors hover:scale-110"
          >
            <Star 
              className={`w-6 h-6 ${
                star <= value 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-slate-600 hover:text-yellow-300"
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Access Required</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Please sign in to view meal details.
            </p>
            <Button 
              onClick={() => router.push("/api/auth/signin")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <Skeleton className="h-8 w-32 mb-4 bg-slate-800" />
            <Skeleton className="h-12 w-2/3 mb-2 bg-slate-800" />
            <Skeleton className="h-6 w-1/2 bg-slate-800" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full bg-slate-800" />
              <Skeleton className="h-64 w-full bg-slate-800" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full bg-slate-800" />
              <Skeleton className="h-32 w-full bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Meal Not Found</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              The meal you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button 
              onClick={() => router.push("/canteen")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
            >
              Back to Canteen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userRating = ratings.find(r => r.userId === session.user?.id);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/canteen")}
            className="mb-6 text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Canteen
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`bg-gradient-to-r ${meal.category.toLowerCase() === 'vollkost' ? 'from-red-500 to-orange-500' : meal.category.toLowerCase() === 'vegetarisch' ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-purple-500'} text-white border-0 px-3 py-1`}>
                  {meal.category}
                </Badge>
                {meal.price && (
                  <Badge className="bg-slate-800 text-green-400 border-slate-700 px-3 py-1">
                    €{(meal.price / 100).toFixed(2)}
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{meal.name}</h1>
              {meal.description && (
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">{meal.description}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-5 h-5 text-orange-500" />
                  <span className="text-slate-300">Category: <span className="text-white font-medium">{meal.category}</span></span>
                </div>
                {meal.availableDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span className="text-slate-300">Served on: <span className="text-white font-medium">{format(parseISO(meal.availableDate), "PPP", { locale: de })}</span></span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {renderStars(meal.avgRating, "w-5 h-5")}
                  </div>
                  <span className="font-bold text-xl text-white">{meal.avgRating.toFixed(1)}</span>
                  <span className="text-slate-400">({meal.ratingCount} ratings)</span>
                </div>
                
                <div className="flex items-center gap-6 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{meal.ratingCount} reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    <span>{meal.photoCount} photos</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                    <Star className="w-4 h-4 mr-2" />
                    {userRating ? "Update Rating" : "Rate Meal"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-slate-900 border-slate-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">Rate {meal.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <StarRating value={rating} onChange={setRating} label="Overall Rating *" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <StarRating value={taste} onChange={setTaste} label="Taste" />
                      <StarRating value={presentation} onChange={setPresentation} label="Presentation" />
                      <StarRating value={value} onChange={setValue} label="Value" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Review (optional)</label>
                      <Textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your thoughts about this meal..."
                        rows={3}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleRatingSubmit} 
                      disabled={rating === 0 || submitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                    >
                      {submitting ? "Submitting..." : userRating ? "Update Rating" : "Submit Rating"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add Photo of {meal.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center bg-slate-800/30">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-400">
                        Photo upload UI would go here. For now, we&apos;ll create a placeholder.
                      </p>
                    </div>
                    <Textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Add a caption (optional)..."
                      rows={2}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                    />
                    <Button 
                      onClick={handlePhotoUpload} 
                      disabled={uploading}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                    >
                      {uploading ? "Adding Photo..." : "Add Photo (Placeholder)"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border-slate-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-slate-400">Overview</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-slate-400">Reviews ({meal.ratingCount})</TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-slate-400">Photos ({meal.photoCount})</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-slate-400">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Photos Grid */}
                {photos.length > 0 && (
                  <Card className="mb-6 bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-white">Photos</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {photos.slice(0, 6).map((photo) => (
                          <div key={photo.id} className="aspect-square rounded-lg overflow-hidden ring-1 ring-slate-700">
                            <img 
                              src={photo.photoUrl} 
                              alt={photo.caption || meal.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                            />
                          </div>
                        ))}
                        {photos.length > 6 && (
                          <div className="aspect-square rounded-lg bg-slate-800/50 flex items-center justify-center ring-1 ring-slate-700">
                            <div className="text-center">
                              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                              <span className="text-sm text-slate-400">+{photos.length - 6} more</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Reviews */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-white">Recent Reviews</h3>
                  </CardHeader>
                  <CardContent>
                    {ratings.length === 0 ? (
                      <div className="text-center py-8">
                        <Star className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                        <p className="text-slate-400">No reviews yet. Be the first to rate!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {ratings.slice(0, 3).map((rating) => (
                          <div key={rating.id} className="flex gap-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                            <Avatar className="w-10 h-10 ring-2 ring-slate-700">
                              <AvatarImage src={rating.userImage || undefined} />
                              <AvatarFallback className="bg-slate-700 text-white">
                                {rating.userName?.charAt(0) || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-white">{rating.userName}</span>
                                <div className="flex">
                                  {renderStars(rating.rating)}
                                </div>
                                <span className="text-sm text-slate-400">
                                  {formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                              {rating.review && (
                                <p className="text-sm text-slate-300 mb-2">{rating.review}</p>
                              )}
                              {(rating.taste || rating.presentation || rating.value) && (
                                <div className="flex gap-4 text-xs text-slate-400">
                                  {rating.taste && <span>Taste: {rating.taste}/5</span>}
                                  {rating.presentation && <span>Presentation: {rating.presentation}/5</span>}
                                  {rating.value && <span>Value: {rating.value}/5</span>}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {ratings.length > 3 && (
                          <Button variant="outline" onClick={() => setActiveTab("reviews")} className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50">
                            View All Reviews
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Allergen Info */}
                {meal.allergens && meal.allergens.length > 0 && (
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        Allergens & Additives
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {meal.allergens.map((allergen, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-slate-800/50 border-slate-700 text-slate-300">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Rating Breakdown */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-white">Rating Breakdown</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = ratings.filter(r => Math.floor(r.rating) === star).length;
                      const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
                      
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm w-8 text-white">{star}★</span>
                          <div className="flex-1 bg-slate-800 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-400 w-8">{count}</span>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">All Reviews</h3>
              </CardHeader>
              <CardContent>
                {ratings.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <h3 className="text-xl font-semibold mb-2 text-white">No reviews yet</h3>
                    <p className="text-slate-400 mb-4">Be the first to share your thoughts about this meal!</p>
                    <Button 
                      onClick={() => setShowRatingDialog(true)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                    >
                      Write a Review
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {ratings.map((rating) => (
                      <div key={rating.id} className="border-b border-slate-700/50 pb-6 last:border-b-0">
                        <div className="flex gap-4">
                          <Avatar className="w-12 h-12 ring-2 ring-slate-700">
                            <AvatarImage src={rating.userImage || undefined} />
                            <AvatarFallback className="bg-slate-700 text-white">
                              {rating.userName?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-white">{rating.userName}</span>
                              <div className="flex">
                                {renderStars(rating.rating)}
                              </div>
                              <span className="text-sm text-slate-400">
                                {formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            {rating.review && (
                              <p className="text-slate-300 mb-3 leading-relaxed">{rating.review}</p>
                            )}
                            {(rating.taste || rating.presentation || rating.value) && (
                              <div className="flex gap-6 text-sm">
                                {rating.taste && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-slate-400">Taste:</span>
                                    <div className="flex">
                                      {renderStars(rating.taste, "w-3 h-3")}
                                    </div>
                                  </div>
                                )}
                                {rating.presentation && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-slate-400">Presentation:</span>
                                    <div className="flex">
                                      {renderStars(rating.presentation, "w-3 h-3")}
                                    </div>
                                  </div>
                                )}
                                {rating.value && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-slate-400">Value:</span>
                                    <div className="flex">
                                      {renderStars(rating.value, "w-3 h-3")}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">All Photos</h3>
              </CardHeader>
              <CardContent>
                {photos.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <h3 className="text-xl font-semibold mb-2 text-white">No photos yet</h3>
                    <p className="text-slate-400 mb-4">Share the first photo of this meal!</p>
                    <Button 
                      onClick={() => setShowPhotoDialog(true)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                    >
                      Add Photo
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo) => (
                      <div key={photo.id} className="space-y-3">
                        <div className="aspect-square rounded-lg overflow-hidden ring-1 ring-slate-700">
                          <img 
                            src={photo.photoUrl} 
                            alt={photo.caption || meal.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                        <div className="flex items-start gap-2">
                          <Avatar className="w-8 h-8 ring-2 ring-slate-700">
                            <AvatarImage src={photo.userImage || undefined} />
                            <AvatarFallback className="text-xs bg-slate-700 text-white">
                              {photo.userName?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">{photo.userName}</span>
                              {photo.isOfficial === 1 && (
                                <Badge className="text-xs bg-orange-500/20 text-orange-400 border-orange-500/30">
                                  Official
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-400">
                              {formatDistanceToNow(new Date(photo.createdAt), { addSuffix: true })}
                            </p>
                            {photo.caption && (
                              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                                {photo.caption}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Meal History
                </h3>
                <p className="text-sm text-slate-400">
                  Previous times this meal was served
                </p>
              </CardHeader>
              <CardContent>
                {mealHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                    <p className="text-slate-400">This is the first time this meal is being served.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mealHistory.map((history, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-orange-500" />
                          <div>
                            <p className="font-medium text-white">
                              {history.date ? format(parseISO(history.date), "EEEE, dd. MMMM yyyy", { locale: de }) : 'Date not available'}
                            </p>
                            <p className="text-sm text-slate-400">
                              {history.ratingCount} ratings • {history.photoCount} photos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {renderStars(history.avgRating)}
                          </div>
                          <span className="font-medium text-white">{history.avgRating.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 