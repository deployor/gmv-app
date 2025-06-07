import { users, classes, news, announcements, events, photoGalleries, photos, polls, pollVotes, contacts, settings } from '../database/schema';

// Database types (inferred from schema)
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Class = typeof classes.$inferSelect;
export type NewClass = typeof classes.$inferInsert;

export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;

export type Announcement = typeof announcements.$inferSelect;
export type NewAnnouncement = typeof announcements.$inferInsert;

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type PhotoGallery = typeof photoGalleries.$inferSelect;
export type NewPhotoGallery = typeof photoGalleries.$inferInsert;

export type Photo = typeof photos.$inferSelect;
export type NewPhoto = typeof photos.$inferInsert;

export type Poll = typeof polls.$inferSelect;
export type NewPoll = typeof polls.$inferInsert;

export type PollVote = typeof pollVotes.$inferSelect;
export type NewPollVote = typeof pollVotes.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  profilePicture?: string;
}

export interface AuthToken {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Microsoft Auth types
export interface MicrosoftUser {
  id: string;
  mail: string;
  displayName: string;
  givenName: string;
  surname: string;
  userPrincipalName: string;
  businessPhones: string[];
  mobilePhone?: string;
  jobTitle?: string;
  '@odata.type': string;
}

// Feed item types
export type FeedItemType = 'news' | 'announcement' | 'poll' | 'event';

export interface FeedItem {
  id: string;
  type: FeedItemType;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  metadata?: Record<string, any>;
}

// Poll types
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollWithResults extends Poll {
  options: PollOption[];
  totalVotes: number;
  userVote?: string[];
}

// Search types
export interface SearchFilters {
  role?: string;
  class?: string;
  grade?: string;
  isActive?: boolean;
}

export interface SearchResult {
  users: User[];
  classes: Class[];
  total: number;
} 