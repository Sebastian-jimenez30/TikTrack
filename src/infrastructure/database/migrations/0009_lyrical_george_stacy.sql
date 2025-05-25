CREATE TABLE "user_likes_influencer" (
	"user_id" integer NOT NULL,
	"influencer_id" integer NOT NULL,
	"liked_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_likes_influencer" ADD CONSTRAINT "user_likes_influencer_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_likes_influencer" ADD CONSTRAINT "user_likes_influencer_influencer_id_influencers_id_fk" FOREIGN KEY ("influencer_id") REFERENCES "public"."influencers"("id") ON DELETE cascade ON UPDATE no action;