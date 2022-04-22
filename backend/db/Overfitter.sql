-- SQL dump generated using DBML (dbml-lang.org)
-- Database: PostgreSQL
-- Generated at: 2022-04-22T18:42:45.722Z

CREATE TYPE "outfit_type" AS ENUM (
  'FORMAL',
  'CASUAL',
  'BUSINESS',
  'BUSINESS_CASUAL',
  'SPORT',
  'SLEEP'
);

CREATE TYPE "top_type" AS ENUM (
  'TEE',
  'SWEAT',
  'DRESS',
  'FLANNEL',
  'UNDER',
  'POLO',
  'SLEEP',
  'CASUAL',
  'WORKOUT',
  'UNKNOWN'
);

CREATE TYPE "bottom_type" AS ENUM (
  'SWEAT',
  'DRESS',
  'UNDER',
  'SLEEP',
  'WORKOUT',
  'JEANS',
  'KAKIS',
  'UNKNOWN'
);

CREATE TYPE "bottom_inseam_type" AS ENUM (
  'SHORT',
  'REGULAR',
  'TALL'
);

CREATE TYPE "feet_type" AS ENUM (
  'DRESS_SHOE',
  'TENNIS_SHOE',
  'CASUAL_SHOE',
  'HEEL_SHOE',
  'FLIP_FLOP_SHOE',
  'SANDAL_SHOE',
  'DRESS_SOCK',
  'CASUAL_SOCK',
  'UNKNOWN'
);

CREATE TYPE "wrist_type" AS ENUM (
  'WATCH',
  'BRACLET',
  'UNKNOWN'
);

CREATE TYPE "head_type" AS ENUM (
  'BASEBALL_HAT',
  'BEANIE',
  'BANDANA',
  'GLASSES',
  'UNKNOWN'
);

CREATE TYPE "item_status" AS ENUM (
  'CLEAN',
  'WORN',
  'DIRTY',
  'UNKNOWN'
);

CREATE TYPE "item_condition" AS ENUM (
  'NEW',
  'LIKE_NEW',
  'GOOD',
  'FAIR',
  'POOR',
  'TRASH',
  'UNKNOWN'
);

CREATE TYPE "size_us_letter" AS ENUM (
  '5XS',
  '4XS',
  '3XS',
  '2XS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL',
  '4XL',
  '5XL',
  'UNKNOWN'
);

CREATE TABLE "tops" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar(20),
  "uriImage" text,
  "name" text,
  "sizeUSLetter" size_us_letter,
  "sizeUSNumber" float,
  "brand" text,
  "description" text,
  "timestampAddedISO" timestamp,
  "timestampLastModifiedISO" timestamp,
  "timestampPurchasedISO" timestamp,
  "rating" int,
  "itemCondition" item_condition,
  "itemStatus" item_status,
  "numberOfWears" int,
  "wearsBeforeDirty" int,
  "wearsLeftBeforeDirty" int,
  "primaryColor" text,
  "secondaryColor" text,
  "accentColor" text,
  "pattern" text,
  "type" top_type,
  "sizeChestInchesLow" float,
  "sizeChestInchesHigh" float,
  "sizeNeckInchesLow" float,
  "sizeNeckInchesHigh" float,
  "sizeWaistInchesLow" float,
  "sizeWaistInchesHigh" float,
  "sizeSleeveInches" float
);

CREATE TABLE "bottoms" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar(20),
  "uriImage" text,
  "name" text,
  "sizeUSLetter" size_us_letter,
  "sizeUSNumber" float,
  "brand" text,
  "description" text,
  "timestampAddedISO" timestamp,
  "timestampLastModifiedISO" timestamp,
  "timestampPurchasedISO" timestamp,
  "rating" int,
  "itemCondition" item_condition,
  "itemStatus" item_status,
  "numberOfWears" int,
  "wearsBeforeDirty" int,
  "wearsLeftBeforeDirty" int,
  "primaryColor" text,
  "secondaryColor" text,
  "accentColor" text,
  "pattern" text,
  "type" bottom_type,
  "bottomInseamType" bottom_inseam_type,
  "inseamInches" float,
  "sizeHipInchesLow" float,
  "sizeHipInchesHigh" float
);

CREATE TABLE "feet" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar(20),
  "uriImage" text,
  "name" text,
  "sizeUSLetter" size_us_letter,
  "sizeUSNumber" float,
  "brand" text,
  "description" text,
  "timestampAddedISO" timestamp,
  "timestampLastModifiedISO" timestamp,
  "timestampPurchasedISO" timestamp,
  "rating" int,
  "itemCondition" item_condition,
  "itemStatus" item_status,
  "numberOfWears" int,
  "wearsBeforeDirty" int,
  "wearsLeftBeforeDirty" int,
  "primaryColor" text,
  "secondaryColor" text,
  "accentColor" text,
  "pattern" text,
  "type" feet_type,
  "sizeInches" float
);

CREATE TABLE "wrist" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar(20),
  "uriImage" text,
  "name" text,
  "sizeUSLetter" size_us_letter,
  "sizeUSNumber" float,
  "brand" text,
  "description" text,
  "timestampAddedISO" timestamp,
  "timestampLastModifiedISO" timestamp,
  "timestampPurchasedISO" timestamp,
  "rating" int,
  "itemCondition" item_condition,
  "itemStatus" item_status,
  "numberOfWears" int,
  "wearsBeforeDirty" int,
  "wearsLeftBeforeDirty" int,
  "primaryColor" text,
  "secondaryColor" text,
  "accentColor" text,
  "pattern" text,
  "type" wrist_type,
  "sizeInches" float
);

CREATE TABLE "head" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar(20),
  "uriImage" text,
  "name" text,
  "sizeUSLetter" size_us_letter,
  "sizeUSNumber" float,
  "brand" text,
  "description" text,
  "timestampAddedISO" timestamp,
  "timestampLastModifiedISO" timestamp,
  "timestampPurchasedISO" timestamp,
  "rating" int,
  "itemCondition" item_condition,
  "itemStatus" item_status,
  "numberOfWears" int,
  "wearsBeforeDirty" int,
  "wearsLeftBeforeDirty" int,
  "primaryColor" text,
  "secondaryColor" text,
  "accentColor" text,
  "pattern" text,
  "type" head_type,
  "sizeInchesLow" float,
  "sizeInchesHigh" float
);

CREATE TABLE "outfit" (
  "id" int PRIMARY KEY,
  "uriImage" text,
  "occasion" outfit_type,
  "topId" int,
  "bottomId" int,
  "headId" int,
  "feetId" int,
  "wristId" int,
  "rating" int
);

ALTER TABLE "outfit" ADD FOREIGN KEY ("topId") REFERENCES "tops" ("id");

ALTER TABLE "outfit" ADD FOREIGN KEY ("bottomId") REFERENCES "bottoms" ("id");

ALTER TABLE "outfit" ADD FOREIGN KEY ("headId") REFERENCES "head" ("id");

ALTER TABLE "outfit" ADD FOREIGN KEY ("feetId") REFERENCES "feet" ("id");

ALTER TABLE "outfit" ADD FOREIGN KEY ("wristId") REFERENCES "wrist" ("id");
