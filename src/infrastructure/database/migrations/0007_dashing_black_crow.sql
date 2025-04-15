CREATE TYPE "public"."influencer_status" AS ENUM('active', 'inactive');--> statement-breakpoint
ALTER TABLE "influencers" ADD COLUMN "status" "influencer_status" DEFAULT 'active' NOT NULL;