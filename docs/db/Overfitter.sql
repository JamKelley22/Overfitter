CREATE TYPE "top_type" AS ENUM (
  'tee',
  'sweat',
  'dress',
  'flannel',
  'under',
  'polo',
  'sleep',
  'casual',
  'workout'
);

CREATE TYPE "bottom_type" AS ENUM (
  'sweat',
  'dress',
  'under',
  'sleep',
  'workout',
  'jeans',
  'kakis'
);

CREATE TYPE "feet_type" AS ENUM (
  'dress_shoe',
  'tennis_shoe',
  'casual_shoe',
  'heel_shoe',
  'flip_flop_shoe',
  'sandel_shoe',
  'dress_sock',
  'casual_sock'
);

CREATE TYPE "wrist_type" AS ENUM (
  'watch',
  'braclet'
);

CREATE TYPE "head_type" AS ENUM (
  'baseball_hat',
  'beanie',
  'bandana',
  'glasses'
);

CREATE TYPE "clean_status" AS ENUM (
  'clean',
  'worn',
  'dirty'
);

CREATE TYPE "fit_status" AS ENUM (
  'baggy',
  'loose',
  'normal',
  'fitted',
  'tight',
  'skintight'
);

CREATE TABLE "tops" (
  "id" int PRIMARY KEY,
  "code" varchar(20),
  "uri_image" varchar(100),
  "size_us" varchar(3),
  "brand" varchar(20),
  "description" varchar(200),
  "datetime_added" datetime,
  "datetime_last_modified" datetime,
  "datetime_purchased" datetime,
  "condition" int,
  "type" top_type,
  "status" clean_status,
  "fit" fit_status,
  "number_of_wears" int,
  "wears_before_dirty" int,
  "wears_left_before_dirty" int,
  "primary_color" varchar(10),
  "secondary_color" varchar(10),
  "accent_color" varchar(10),
  "pattern" varchar(10)
);

CREATE TABLE "bottoms" (
  "id" int PRIMARY KEY,
  "code" varchar(20),
  "uri_image" varchar(100),
  "size_us" varchar(3),
  "brand" varchar(20),
  "description" varchar(200),
  "datetime_added" datetime,
  "datetime_last_modified" datetime,
  "datetime_purchased" datetime,
  "condition" int,
  "type" bottom_type,
  "status" clean_status,
  "fit" fit_status,
  "number_of_wears" int,
  "wears_before_dirty" int,
  "wears_left_before_dirty" int,
  "primary_color" varchar(10),
  "secondary_color" varchar(10),
  "accent_color" varchar(10),
  "pattern" varchar(10)
);

CREATE TABLE "feet" (
  "id" int PRIMARY KEY,
  "code" varchar(20),
  "uri_image" varchar(100),
  "size" int,
  "brand" varchar(20),
  "description" varchar(200),
  "datetime_added" datetime,
  "datetime_last_modified" datetime,
  "datetime_purchased" datetime,
  "condition" int,
  "type" feet_type,
  "status" clean_status,
  "fit" fit_status,
  "number_of_wears" int,
  "wears_before_dirty" int,
  "wears_left_before_dirty" int,
  "primary_color" varchar(10),
  "secondary_color" varchar(10),
  "accent_color" varchar(10),
  "pattern" varchar(10)
);

CREATE TABLE "wrist" (
  "id" int PRIMARY KEY,
  "code" varchar(20),
  "uri_image" varchar(100),
  "size" int,
  "brand" varchar(20),
  "description" varchar(200),
  "datetime_added" datetime,
  "datetime_last_modified" datetime,
  "datetime_purchased" datetime,
  "condition" int,
  "type" wrist_type,
  "status" clean_status,
  "fit" fit_status,
  "number_of_wears" int,
  "wears_before_dirty" int,
  "wears_left_before_dirty" int,
  "primary_color" varchar(10),
  "secondary_color" varchar(10),
  "accent_color" varchar(10),
  "pattern" varchar(10)
);

CREATE TABLE "head" (
  "id" int PRIMARY KEY,
  "code" varchar(20),
  "uri_image" varchar(100),
  "size" int,
  "brand" varchar(20),
  "description" varchar(200),
  "datetime_added" datetime,
  "datetime_last_modified" datetime,
  "datetime_purchased" datetime,
  "condition" int,
  "type" head_type,
  "status" clean_status,
  "fit" fit_status,
  "number_of_wears" int,
  "wears_before_dirty" int,
  "wears_left_before_dirty" int,
  "primary_color" varchar(10),
  "secondary_color" varchar(10),
  "accent_color" varchar(10),
  "pattern" varchar(10)
);

CREATE TABLE "outfit" (
  "id" int,
  "top_id" int,
  "bottom_id" int,
  "head_id" int,
  "feet_id" int,
  "wrist_id" int,
  "rating" int,
  "uri_image" varchar(100)
);

ALTER TABLE "tops" ADD FOREIGN KEY ("id") REFERENCES "outfit" ("top_id");

ALTER TABLE "bottoms" ADD FOREIGN KEY ("id") REFERENCES "outfit" ("bottom_id");

ALTER TABLE "head" ADD FOREIGN KEY ("id") REFERENCES "outfit" ("head_id");

ALTER TABLE "feet" ADD FOREIGN KEY ("id") REFERENCES "outfit" ("feet_id");

ALTER TABLE "wrist" ADD FOREIGN KEY ("id") REFERENCES "outfit" ("wrist_id");
