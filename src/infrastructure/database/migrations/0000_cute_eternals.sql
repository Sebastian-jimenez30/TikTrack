CREATE TABLE "influencers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "influencers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(100) NOT NULL,
	"profile_name" varchar(180) NOT NULL,
	"profile_picture" varchar(255) NOT NULL,
	"profile_url" varchar(255) NOT NULL,
	"profile_description" varchar(255) NOT NULL,
	"total_likes" integer NOT NULL,
	"total_comments" integer NOT NULL,
	"total_shares" integer NOT NULL,
	"total_saves" integer NOT NULL,
	"total_views" integer NOT NULL,
	"total_followers" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "influencers_username_unique" UNIQUE("username")
);
