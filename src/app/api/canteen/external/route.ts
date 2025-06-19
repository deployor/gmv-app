import { NextResponse } from 'next/server';

interface ExternalMeal {
  mealId: string;
  mealName: string;
  actualName?: string;
  price: string;
  actualPrice?: string;
  title: string;
  weekday: string;
  dayId: string;
  available: boolean;
  additives?: Array<{
    abbreviation?: string;
  }>;
}

interface ExternalDay {
  dayId: string;
  weekday: string;
  hasPlan: number;
}

interface ExternalAPIResponse {
  weekNumber: number;
  weekYear: string;
  days: ExternalDay[];
  weekPlan: Array<Array<ExternalMeal | { type: number; weekday: string }>>;
}

export async function GET() {
  try {
    console.log('🔄 Fetching data from external API...');
    
    // The external API doesn't accept parameters, it returns whatever week data it has
    const response = await fetch('https://gmv.sams-on.de/data/server/foodPlan.php', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error('❌ External API error:', response.status, response.statusText);
      throw new Error(`External API returned ${response.status}`);
    }

    const data: ExternalAPIResponse = await response.json();
    console.log('✅ External API response received');
    console.log('📅 Week info:', { weekNumber: data.weekNumber, weekYear: data.weekYear });
    console.log('📊 Days data:', data.days?.map((d) => ({ dayId: d.dayId, hasPlan: d.hasPlan })));

    // Transform the complex external data structure into our format
    const transformedMeals = [];

    if (data.weekPlan && Array.isArray(data.weekPlan)) {
      for (let categoryIndex = 0; categoryIndex < data.weekPlan.length; categoryIndex++) {
        const categoryMeals = data.weekPlan[categoryIndex];
        
        if (Array.isArray(categoryMeals)) {
          for (const item of categoryMeals) {
            // Skip type entries
            if ('type' in item) continue;
            
            const meal = item as ExternalMeal;
            if (meal.mealId && meal.mealName) {
              // Clean up the meal name by removing HTML tags and formatting dashes
              let cleanName = meal.actualName || meal.mealName || '';
              cleanName = cleanName.replace(/<br\s*\/?>/gi, '\n');
              cleanName = cleanName.replace(/<[^>]*>/g, '');
              
              // Split on dashes and newlines, then clean and join with bullets
              const parts = cleanName.split(/[-\n]/)
                .map((part: string) => part.trim())
                .filter((part: string) => part.length > 0);
              
              cleanName = parts.join(' • ');

              // Convert price format from "4,00" to 4.00
              const priceStr = meal.actualPrice || meal.price || '0,00';
              const price = parseFloat(priceStr.replace(',', '.'));

              // Map weekday number to day name
              const weekdayMap: { [key: string]: string } = {
                '1': 'monday',
                '2': 'tuesday', 
                '3': 'wednesday',
                '4': 'thursday',
                '5': 'friday',
                '6': 'saturday',
                '7': 'sunday'
              };

              const transformedMeal = {
                id: meal.mealId,
                name: cleanName,
                description: meal.title || 'Meal',
                category: meal.title || 'main',
                allergens: meal.additives?.filter((a) => a.abbreviation)
                  .map((a) => a.abbreviation!) || [],
                nutrition: {},
                price: price,
                availability: meal.available ? 'available' : 'unavailable',
                day: weekdayMap[meal.weekday] || 'unknown',
                dayId: meal.dayId,
                weekday: meal.weekday
              };

              transformedMeals.push(transformedMeal);
            }
          }
        }
      }
    }

    console.log('🔄 Transformed meals:', transformedMeals.length);

    const result = {
      weekNumber: data.weekNumber,
      weekYear: data.weekYear,
      meals: transformedMeals,
      days: data.days,
      rawData: data // Include raw data for debugging
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Error fetching external meal data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meal data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 