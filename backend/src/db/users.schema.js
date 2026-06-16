import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roleStatusEnum = pgEnum("role_status", [
  "member",
  "moderator",
  "admin",
  "user",
]);

/**
 * Users table storing core authentication and profile details.
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  username: varchar("username", { length: 50 }).unique(),

  displayName: varchar("display_name", { length: 100 }),

  passwordHash: varchar("password_hash", { length: 255 }).notNull(),

  emailVerified: boolean("email_verified").default(false),

  emailVerifyToken: varchar("email_verify_token", { length: 255 }),

  resetPasswordToken: varchar("reset_password_token", { length: 255 }),

  resetTokenExpiresAt: timestamp("reset_token_expires_at", {
    withTimezone: true,
  }),

  avatarUrl: text("avatar_url"),

  bio: text("bio"),

  isActive: boolean("is_active").default(true).notNull(),

  // User role (defaults to 'user')
  role: roleStatusEnum("role").default("user").notNull(),

  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
