ALTER TABLE "influencers" ADD COLUMN "average_likes" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "influencers" ADD COLUMN "average_comments" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "influencers" ADD COLUMN "average_shares" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "influencers" ADD COLUMN "average_saves" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "influencers" ADD COLUMN "average_views" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "influencers" ADD COLUMN "followers" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "influencers" DROP COLUMN "profile_description";--> statement-breakpoint
ALTER TABLE "influencers" DROP COLUMN "total_likes";--> statement-breakpoint
ALTER TABLE "influencers" DROP COLUMN "total_comments";--> statement-breakpoint
ALTER TABLE "influencers" DROP COLUMN "total_shares";--> statement-breakpoint
ALTER TABLE "influencers" DROP COLUMN "total_saves";--> statement-breakpoint
ALTER TABLE "influencers" DROP COLUMN "total_views";--> statement-breakpoint
ALTER TABLE "influencers" DROP COLUMN "total_followers";