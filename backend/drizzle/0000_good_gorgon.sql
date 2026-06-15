CREATE EXTENSION IF NOT EXISTS "pgcrypto";--> statement-breakpoint
CREATE TYPE "public"."role_status" AS ENUM('member', 'moderator', 'admin', 'user');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(50) NOT NULL,
	"display_name" varchar(100),
	"password_hash" varchar(255) NOT NULL,
	"email_verfied" boolean DEFAULT false NOT NULL,
	"email_verify_token" varchar(255),
	"reset_password_token" varchar(255),
	"reset_token_expires_at" timestamp with time zone,
	"avatar_url" text,
	"bio" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"role" "role_status" DEFAULT 'user' NOT NULL,
	"last_seen_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
