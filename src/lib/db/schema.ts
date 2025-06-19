import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  unique,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  studentId: text("student_id").unique(),
  grade: text("grade"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const roles = pgTable("roles", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull().unique(),
});

export const userRoles = pgTable(
  "user_roles",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  (ur) => ({
    compoundKey: primaryKey({ columns: [ur.userId, ur.roleId] }),
  })
);

// Feed system tables
export const posts = pgTable(
  "posts",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    content: text("content"),
    category: text("category").default("General"),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  }
);

export const comments = pgTable("comments", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  content: text("content").notNull(),
  postId: text("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  parentId: text("parent_id"), // for nested comments - will add reference later
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const likes = pgTable(
  "likes",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }),
    commentId: text("comment_id").references(() => comments.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  }
);

export const reactions = pgTable(
  "reactions",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }),
    commentId: text("comment_id").references(() => comments.id, { onDelete: "cascade" }),
    emoji: text("emoji").notNull(), // 😀, 😍, 😢, 😡, 👍, 👎, etc.
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  }
);

export const categories = pgTable(
  "categories",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull().unique(),
    description: text("description"),
    icon: text("icon").default("Sparkles"),
    color: text("color").default("from-blue-500 to-cyan-500"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  }
);

// Canteen system tables
export const canteenMeals = pgTable("canteen_meals", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // breakfast, lunch, dinner, snack
  allergens: text("allergens"), // JSON array of allergens
  nutritionInfo: text("nutrition_info"), // JSON object with nutrition data
  price: integer("price"), // in cents
  availableDate: timestamp("available_date", { mode: "date" }).notNull(),
  dayOfWeek: text("day_of_week").notNull(), // monday, tuesday, etc.
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const canteenMealPhotos = pgTable("canteen_meal_photos", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  mealId: text("meal_id")
    .notNull()
    .references(() => canteenMeals.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  photoUrl: text("photo_url").notNull(),
  caption: text("caption"),
  isOfficial: integer("is_official").default(0), // 0 = user photo, 1 = official photo
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const canteenRatings = pgTable(
  "canteen_ratings",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    mealId: text("meal_id")
      .notNull()
      .references(() => canteenMeals.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(), // 1-5 stars
    review: text("review"),
    taste: integer("taste"), // 1-5 rating for taste
    presentation: integer("presentation"), // 1-5 rating for presentation
    value: integer("value"), // 1-5 rating for value/price
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
  (rating) => ({
    // Ensure one rating per user per meal
    uniqueUserMeal: unique().on(rating.userId, rating.mealId),
  })
); 