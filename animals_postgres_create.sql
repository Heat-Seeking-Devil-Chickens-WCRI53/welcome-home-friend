SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.animals (
	"_id" serial NOT NULL,
	"user_id" int NOT NULL,
	"pet_name" varchar NOT NULL,
	"owner" varchar,
	"user_address" varchar,
	"eye_color" varchar,
	"gender" varchar,
	"image_url" varchar,
	"breed" varchar,
	"fur_color" varchar,
	"lat" varchar,
	"lng" varchar,
	"status" BOOLEAN NOT NULL
);


CREATE TABLE public.users (
	"user_id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"owner" varchar,
	"phone_number" varchar,
	"street_address" varchar,
	"city" varchar,
	"state" varchar
);


CREATE TABLE public.sessions (
  "session_id" SERIAL PRIMARY KEY,
  "cookie"   VARCHAR,
  "user_id"  INT
)

CREATE TABLE public.google_users (
	"id" serial NOT NULL,
	"username" varchar,
	"google_id" varchar
);