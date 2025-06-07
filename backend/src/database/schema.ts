import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  integer,
  uuid,
  jsonb,
  pgEnum
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// Enums
export const userRoleEnum = pgEnum('user_role', ['student', 'teacher', 'admin', 'parent']);
export const announcementPriorityEnum = pgEnum('announcement_priority', ['low', 'medium', 'high', 'urgent']);
export const eventTypeEnum = pgEnum('event_type', ['academic', 'sports', 'cultural', 'meeting', 'holiday']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  microsoftId: varchar('microsoft_id', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  displayName: varchar('display_name', { length: 200 }),
  profilePicture: text('profile_picture'),
  role: userRoleEnum('role').notNull().default('student'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Classes table
export const classes = pgTable('classes', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  grade: varchar('grade', { length: 20 }),
  section: varchar('section', { length: 10 }),
  teacherId: uuid('teacher_id').references(() => users.id),
  academicYear: varchar('academic_year', { length: 20 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Class enrollments (many-to-many relationship between users and classes)
export const classEnrollments = pgTable('class_enrollments', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  userId: uuid('user_id').references(() => users.id).notNull(),
  classId: uuid('class_id').references(() => classes.id).notNull(),
  enrolledAt: timestamp('enrolled_at').defaultNow(),
});

// News table
export const news = pgTable('news', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featuredImage: text('featured_image'),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Announcements table
export const announcements = pgTable('announcements', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  priority: announcementPriorityEnum('priority').default('medium'),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  targetAudience: jsonb('target_audience'), // Can specify classes, roles, or specific users
  isActive: boolean('is_active').default(true),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Events table
export const events = pgTable('events', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  eventType: eventTypeEnum('event_type').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  location: varchar('location', { length: 255 }),
  organizerId: uuid('organizer_id').references(() => users.id).notNull(),
  isAllDay: boolean('is_all_day').default(false),
  isPublic: boolean('is_public').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Photo galleries table
export const photoGalleries = pgTable('photo_galleries', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  coverImage: text('cover_image'),
  uploadedBy: uuid('uploaded_by').references(() => users.id).notNull(),
  isPublic: boolean('is_public').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Photos table
export const photos = pgTable('photos', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  galleryId: uuid('gallery_id').references(() => photoGalleries.id).notNull(),
  url: text('url').notNull(),
  caption: text('caption'),
  altText: varchar('alt_text', { length: 255 }),
  uploadedBy: uuid('uploaded_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Polls table
export const polls = pgTable('polls', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  question: text('question').notNull(),
  description: text('description'),
  options: jsonb('options').notNull(), // Array of poll options
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  isActive: boolean('is_active').default(true),
  allowMultipleVotes: boolean('allow_multiple_votes').default(false),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Poll votes table
export const pollVotes = pgTable('poll_votes', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  pollId: uuid('poll_id').references(() => polls.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  selectedOptions: jsonb('selected_options').notNull(), // Array of selected option indices
  votedAt: timestamp('voted_at').defaultNow(),
});

// Contact information table
export const contacts = pgTable('contacts', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  name: varchar('name', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }),
  department: varchar('department', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  office: varchar('office', { length: 255 }),
  profilePicture: text('profile_picture'),
  isPublic: boolean('is_public').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Settings table for application configuration
export const settings = pgTable('settings', {
  id: uuid('id').primaryKey().$defaultFn(() => createId()),
  key: varchar('key', { length: 255 }).unique().notNull(),
  value: jsonb('value').notNull(),
  description: text('description'),
  updatedBy: uuid('updated_by').references(() => users.id),
  updatedAt: timestamp('updated_at').defaultNow(),
}); 