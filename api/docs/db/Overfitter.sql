-- SQL dump generated using DBML (dbml-lang.org)
-- Database: PostgreSQL
-- Generated at: 2022-04-23T15:02:35.863Z

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

CREATE TYPE "accessory_type" AS ENUM (
  'RING',
  'NECKLACE',
  'EARRINGS',
  'PURSE',
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
  'TALL',
  'UNKNOWN'
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

CREATE TYPE "head_type" AS ENUM (
  'BASEBALL_HAT',
  'BEANIE',
  'BANDANA',
  'GLASSES',
  'UNKNOWN'
);

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

CREATE TYPE "wrist_type" AS ENUM (
  'WATCH',
  'BRACLET',
  'UNKNOWN'
);

CREATE TABLE "accessories" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar(20),
  "uriImage" text,
  "name" text,
  "sizeUSLetter" size_us_letter,
  "sizeUSNumber" float,
  "brand" text,
  "description" text,
  "timestampAddedRFC" timestamp,
  "timestampLastModifiedRFC" timestamp,
  "timestampPurchasedRFC" timestamp,
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
  "type" accessory_type
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
  "timestampAddedRFC" timestamp,
  "timestampLastModifiedRFC" timestamp,
  "timestampPurchasedRFC" timestamp,
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
  "timestampAddedRFC" timestamp,
  "timestampLastModifiedRFC" timestamp,
  "timestampPurchasedRFC" timestamp,
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

CREATE TABLE "head" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar(20),
  "uriImage" text,
  "name" text,
  "sizeUSLetter" size_us_letter,
  "sizeUSNumber" float,
  "brand" text,
  "description" text,
  "timestampAddedRFC" timestamp,
  "timestampLastModifiedRFC" timestamp,
  "timestampPurchasedRFC" timestamp,
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

CREATE TABLE "outfits" (
  "id" int PRIMARY KEY,
  "uriImage" text,
  "occasion" outfit_type,
  "accessories" int,
  "bottomId" int,
  "feetId" int,
  "headId" int,
  "topId" int,
  "wristId" int,
  "rating" int
);

CREATE TABLE "outfit_accessories" (
  "id" int PRIMARY KEY,
  "outfitId" int,
  "accessoryId" int
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
  "timestampAddedRFC" timestamp,
  "timestampLastModifiedRFC" timestamp,
  "timestampPurchasedRFC" timestamp,
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

CREATE TABLE "wrists" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar(20),
  "uriImage" text,
  "name" text,
  "sizeUSLetter" size_us_letter,
  "sizeUSNumber" float,
  "brand" text,
  "description" text,
  "timestampAddedRFC" timestamp,
  "timestampLastModifiedRFC" timestamp,
  "timestampPurchasedRFC" timestamp,
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

ALTER TABLE "outfits" ADD FOREIGN KEY ("accessories") REFERENCES "outfit_accessories" ("id");

ALTER TABLE "outfits" ADD FOREIGN KEY ("bottomId") REFERENCES "bottoms" ("id");

ALTER TABLE "outfits" ADD FOREIGN KEY ("feetId") REFERENCES "feet" ("id");

ALTER TABLE "outfits" ADD FOREIGN KEY ("headId") REFERENCES "head" ("id");

ALTER TABLE "outfits" ADD FOREIGN KEY ("topId") REFERENCES "tops" ("id");

ALTER TABLE "outfits" ADD FOREIGN KEY ("wristId") REFERENCES "wrists" ("id");

ALTER TABLE "outfit_accessories" ADD FOREIGN KEY ("outfitId") REFERENCES "outfits" ("id");

ALTER TABLE "outfit_accessories" ADD FOREIGN KEY ("accessoryId") REFERENCES "accessories" ("id");
