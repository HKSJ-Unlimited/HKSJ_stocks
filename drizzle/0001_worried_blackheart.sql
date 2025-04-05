CREATE TABLE IF NOT EXISTS "hksj_stock_transactions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hksj_stock_transactions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"ticker" varchar(255) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"quantity" integer NOT NULL,
	"price_per_share" numeric(10, 2) NOT NULL,
	"fees" numeric(10, 2) NOT NULL,
	"notes" text NOT NULL,
	"type" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hksj_stock_transactions" ADD CONSTRAINT "hksj_stock_transactions_user_id_hksj_stock_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."hksj_stock_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
