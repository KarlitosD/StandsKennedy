CREATE TABLE IF NOT EXISTS "stands" (
	"id" varchar(5) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stands_user" (
	"standId" varchar(5) NOT NULL,
	"voted" varchar(12) NOT NULL,
	CONSTRAINT stands_user_standId_voted PRIMARY KEY("standId","voted")
);
