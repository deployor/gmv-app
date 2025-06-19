CREATE TABLE "canteen_meal_photos" (
	"id" text PRIMARY KEY NOT NULL,
	"meal_id" text NOT NULL,
	"user_id" text NOT NULL,
	"photo_url" text NOT NULL,
	"caption" text,
	"is_official" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "canteen_meals" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category" text NOT NULL,
	"allergens" text,
	"nutrition_info" text,
	"price" integer,
	"available_date" timestamp NOT NULL,
	"day_of_week" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "canteen_ratings" (
	"id" text PRIMARY KEY NOT NULL,
	"meal_id" text NOT NULL,
	"user_id" text NOT NULL,
	"rating" integer NOT NULL,
	"review" text,
	"taste" integer,
	"presentation" integer,
	"value" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "canteen_ratings_user_id_meal_id_pk" PRIMARY KEY("user_id","meal_id")
);
--> statement-breakpoint
ALTER TABLE "canteen_meal_photos" ADD CONSTRAINT "canteen_meal_photos_meal_id_canteen_meals_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."canteen_meals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "canteen_meal_photos" ADD CONSTRAINT "canteen_meal_photos_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "canteen_ratings" ADD CONSTRAINT "canteen_ratings_meal_id_canteen_meals_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."canteen_meals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "canteen_ratings" ADD CONSTRAINT "canteen_ratings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;