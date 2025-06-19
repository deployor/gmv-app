"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Camera,
  Utensils,
  ChefHat,
  StarHalf,
  Calendar,
  Clock,
  ArrowRight,
  RefreshCw,
  Euro,
  Heart,
  MessageSquare,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

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
  weekday?: string;
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

interface WeekDay {
  dayId: string;
  weekday: string;
  hasPlan: number;
  date: string;
  meals: CanteenMeal[];
  label: string;
  short: string;
}

interface ExternalApiResponse {
  weekNumber: number;
  weekYear: string;
  meals: CanteenMeal[];
  days: {
    dayId: string;
    weekday: string;
    hasPlan: number;
    date: string;
  }[];
  weekDays: string[];
}

const daysOfWeek = [
  { key: "1", label: "Montag", short: "Mo" },
  { key: "2", label: "Dienstag", short: "Di" },
  { key: "3", label: "Mittwoch", short: "Mi" },
  { key: "4", label: "Donnerstag", short: "Do" },
  { key: "5", label: "Freitag", short: "Fr" },
  { key: "6", label: "Samstag", short: "Sa" },
  { key: "7", label: "Sonntag", short: "So" },
];

const mealCategories = [
  { key: "all", label: "All Meals", icon: "🍽️" },
  { key: "vollkost", label: "Vollkost", icon: "🥩" },
  { key: "vegetarisch", label: "Vegetarian", icon: "🥗" },
];

export default function CanteenPage() {
  const { data: session } = useSession();
  const [weekData, setWeekData] = useState<WeekDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [weekInfo, setWeekInfo] = useState<{
    weekNumber: number;
    weekYear: string;
    totalMeals: number;
    availableDays: number;
    weekDays: string[];
    days: Array<{
      dayId: string;
      weekday: string;
      hasPlan: number;
      date: string;
    }>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = useCallback(async () => {
    if (!session) {
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Fetching meals from external API...");
      setError(null);
      
      // Fetch from external API (API returns whatever week data it has)
      const response = await fetch('/api/canteen/external');
      if (response.ok) {
        const data: ExternalApiResponse = await response.json();
        console.log("✅ External API data received:", data);
        console.log("📅 Week info from API:", { weekNumber: data.weekNumber, weekYear: data.weekYear });
        console.log("📊 Number of meals received:", data.meals?.length || 0);
        
        // Create weekInfo from the new response format
        const weekInfo = {
          weekNumber: data.weekNumber,
          weekYear: data.weekYear,
          totalMeals: data.meals?.length || 0,
          availableDays: data.days?.filter((d) => d.hasPlan === 1).length || 0,
          weekDays: data.weekDays || [],
          days: data.days || []
        };
        setWeekInfo(weekInfo);
        
        // Group meals by weekday number (from external API)
        const mealsByWeekday: { [key: string]: CanteenMeal[] } = {};
        
        // Process meals and get additional data from our database
        const mealsWithRatings = await Promise.all(
          data.meals.map(async (meal: CanteenMeal) => {
            try {
              // Sync meal to our database first (silently)
              fetch(`/api/canteen/sync`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ meal: meal })
              }).catch(() => {}); // Silent sync

              // Fetch additional data from our database
              const [ratingsRes, photosRes] = await Promise.all([
                fetch(`/api/canteen/${meal.id}/ratings`).catch(() => null),
                fetch(`/api/canteen/${meal.id}/photos`).catch(() => null)
              ]);

              let avgRating = 0, ratingCount = 0, photos: Photo[] = [];

              if (ratingsRes?.ok) {
                const ratingsData = await ratingsRes.json();
                if (ratingsData.ratings?.length > 0) {
                  avgRating = ratingsData.ratings.reduce((sum: number, r: Rating) => sum + r.rating, 0) / ratingsData.ratings.length;
                  ratingCount = ratingsData.ratings.length;
                }
              }

              if (photosRes?.ok) {
                const photosData = await photosRes.json();
                photos = photosData.photos || [];
              }

              return {
                ...meal,
                avgRating,
                ratingCount,
                photoCount: photos.length,
                photos
              };
            } catch (error) {
              console.error(`Error processing meal ${meal.id}:`, error);
              return meal;
            }
          })
        );

        // Group by weekday for display
        mealsWithRatings.forEach(meal => {
          const weekday = meal.dayOfWeek || meal.weekday;
          if (weekday) {
            if (!mealsByWeekday[weekday]) {
              mealsByWeekday[weekday] = [];
            }
            mealsByWeekday[weekday].push(meal);
          }
        });

        // Create week data structure
        const weekDays: WeekDay[] = daysOfWeek.map(dayInfo => {
          const dayMeals = mealsByWeekday[dayInfo.key] || [];
          const dayData = data.days?.find((d) => d.weekday === dayInfo.key);
          
          return {
            dayId: dayData?.dayId || `${data.weekYear}-week${data.weekNumber}-day${dayInfo.key}`,
            weekday: dayInfo.key,
            hasPlan: dayMeals.length > 0 ? 1 : 0,
            date: dayData?.dayId || '',
            meals: dayMeals,
            label: dayInfo.label,
            short: dayInfo.short
          };
        });

        setWeekData(weekDays);

        // Auto-select first day with meals if none selected
        if (!selectedDay) {
          const firstDayWithMeals = weekDays.find(day => day.hasPlan === 1);
          if (firstDayWithMeals) {
            setSelectedDay(firstDayWithMeals.weekday);
          }
        }

      } else {
        console.error("❌ External API error:", response.status, response.statusText);
        setError(`Failed to fetch meal data: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Failed to fetch meals:", error);
      setError(error instanceof Error ? error.message : 'Failed to fetch meals');
    } finally {
      setLoading(false);
    }
  }, [session, categoryFilter, selectedDay]);

  // Function to refresh data (for week navigation)
  const refreshMealData = async () => {
    setLoading(true);
    await fetchMeals();
  };

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Access Required</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Please sign in to view the canteen menu and ratings.
              </p>
              <Button 
                onClick={() => window.location.href = "/api/auth/signin"}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const selectedDayData = weekData.find(day => day.weekday === selectedDay);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-6">
        {/* Clean Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Canteen Menu</h1>
                <p className="text-slate-400 text-sm">
                  {weekInfo && `Week ${weekInfo.weekNumber}, ${weekInfo.weekYear} • ${weekInfo.totalMeals} meals available`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-44 bg-slate-900/50 border-slate-700 text-white">
                  <SelectValue placeholder="Filter meals" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  {mealCategories.map((category) => (
                    <SelectItem key={category.key} value={category.key} className="text-white focus:bg-slate-800">
                      <span className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        {category.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={refreshMealData}
                disabled={loading}
                className="bg-slate-900/50 border-slate-700 text-white hover:bg-slate-800/50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="grid grid-cols-7 gap-2">
            {weekData.map((day) => (
              <motion.button
                key={day.weekday}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDay(day.weekday)}
                className={`
                  p-4 rounded-xl transition-all duration-200 text-center border
                  ${day.weekday === selectedDay 
                    ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white border-orange-500 shadow-lg shadow-orange-500/25' 
                    : day.hasPlan 
                      ? 'bg-slate-900/50 hover:bg-slate-800/70 border-slate-700 text-white hover:border-slate-600' 
                      : 'bg-slate-900/20 border-slate-800 text-slate-600 cursor-not-allowed'
                  }
                `}
                disabled={day.hasPlan === 0}
              >
                <div className="font-semibold text-sm">{day.short}</div>
                {day.date && (
                  <div className="text-xs opacity-75 mt-1">
                    {format(parseISO(day.date), "dd.MM", { locale: de })}
                  </div>
                )}
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Utensils className="w-3 h-3" />
                  <span className="text-xs">{day.meals.length}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-lg">⚠️</div>
                  <div>
                    <h3 className="font-semibold text-red-400">Error Loading Meals</h3>
                    <p className="text-red-300/80 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Selected Day Content */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <MealSkeletonLoader key={i} />
            ))}
          </div>
        ) : selectedDayData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-500" />
                {selectedDayData.label}
                {selectedDayData.date && (
                  <span className="text-slate-400 font-normal text-lg">
                    • {format(parseISO(selectedDayData.date), "dd. MMMM yyyy", { locale: de })}
                  </span>
                )}
              </h2>
              <Badge className="bg-slate-800 text-slate-200 border-slate-700 px-3 py-1.5">
                {selectedDayData.meals.length} {selectedDayData.meals.length === 1 ? "meal" : "meals"}
              </Badge>
            </div>

            {selectedDayData.meals.length === 0 ? (
              <Card className="bg-slate-900/30 border-slate-800">
                <CardContent className="p-16 text-center">
                  <Utensils className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                  <h3 className="text-xl font-semibold mb-2 text-white">No meals available</h3>
                  <p className="text-slate-400">
                    Unfortunately, there are no meals available in the canteen on this day.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence>
                  {selectedDayData.meals.map((meal, index) => (
                    <MealCard key={meal.id} meal={meal} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        ) : (
          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="p-16 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold mb-2 text-white">Select a day</h3>
              <p className="text-slate-400">
                Choose a day from the weekly overview to see available meals.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function MealCard({ 
  meal, 
  index 
}: { 
  meal: CanteenMeal; 
  index: number;
}) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {halfStar && <StarHalf className="w-4 h-4 text-yellow-400 fill-current" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-slate-600 fill-current" />
        ))}
      </div>
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vollkost': return 'from-red-500 to-orange-500';
      case 'vegetarisch': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return null;
    return `€${(price / 100).toFixed(2)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="w-full"
    >
      <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-all duration-300 group hover:border-slate-700">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={`bg-gradient-to-r ${getCategoryColor(meal.category)} text-white border-0 px-2 py-1 text-xs font-medium`}>
                  {meal.category}
                </Badge>
                {meal.price && (
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <Euro className="w-3 h-3" />
                    {formatPrice(meal.price)}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-orange-400 transition-colors">
                {meal.name}
              </h3>
              {meal.description && (
                <p className="text-slate-400 text-sm leading-relaxed">{meal.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                {renderStars(meal.avgRating)}
                <span className="text-slate-400 text-sm">
                  {meal.ratingCount > 0 ? `(${meal.ratingCount})` : 'No ratings'}
                </span>
              </div>
              
              {/* Photo count */}
              <div className="flex items-center gap-1.5 text-slate-400">
                <Camera className="w-4 h-4" />
                <span className="text-sm">{meal.photoCount}</span>
              </div>
              
              {/* Additional stats */}
              <div className="flex items-center gap-4 text-slate-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">0</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs">{meal.ratingCount}</span>
                </div>
              </div>
            </div>
            
            <Link href={`/canteen/${meal.id}`}>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-200"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function MealSkeletonLoader() {
  return (
    <Card className="bg-slate-900/30 border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex gap-2 mb-3">
              <Skeleton className="h-5 w-20 rounded-full bg-slate-800" />
              <Skeleton className="h-5 w-16 rounded-full bg-slate-800" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2 bg-slate-800" />
            <Skeleton className="h-4 w-full mb-1 bg-slate-800" />
            <Skeleton className="h-4 w-2/3 bg-slate-800" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-4 h-4 rounded bg-slate-800" />
              ))}
            </div>
            <Skeleton className="h-4 w-12 bg-slate-800" />
          </div>
          <Skeleton className="h-8 w-28 rounded bg-slate-800" />
        </div>
      </CardContent>
    </Card>
  );
} 