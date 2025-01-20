/*
  Warnings:

  - You are about to drop the column `fibreType` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `fibreType` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `fibreType` on the `Foot` table. All the data in the column will be lost.
  - You are about to drop the column `fibreType` on the `FullBody` table. All the data in the column will be lost.
  - You are about to drop the column `cuff` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `fibreType` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the `Head` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutfitHead` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `Accessory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Bottom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Foot` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `FullBody` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Top` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'JPY');

-- DropForeignKey
ALTER TABLE "OutfitHead" DROP CONSTRAINT "OutfitHead_headId_fkey";

-- DropForeignKey
ALTER TABLE "OutfitHead" DROP CONSTRAINT "OutfitHead_outfitId_fkey";

-- AlterTable
ALTER TABLE "Accessory" DROP COLUMN "fibreType",
ADD COLUMN     "fiberType" "FiberType",
ADD COLUMN     "isFavorite" BOOLEAN,
ADD COLUMN     "purchaseAmount" DOUBLE PRECISION,
ADD COLUMN     "purchaseCurrency" "Currency",
ADD COLUMN     "purchaseLink" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Bottom" DROP COLUMN "fibreType",
ADD COLUMN     "fiberType" "FiberType",
ADD COLUMN     "isFavorite" BOOLEAN,
ADD COLUMN     "purchaseAmount" DOUBLE PRECISION,
ADD COLUMN     "purchaseCurrency" "Currency",
ADD COLUMN     "purchaseLink" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Foot" DROP COLUMN "fibreType",
ADD COLUMN     "fiberType" "FiberType",
ADD COLUMN     "isFavorite" BOOLEAN,
ADD COLUMN     "purchaseAmount" DOUBLE PRECISION,
ADD COLUMN     "purchaseCurrency" "Currency",
ADD COLUMN     "purchaseLink" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "FullBody" DROP COLUMN "fibreType",
ADD COLUMN     "fiberType" "FiberType",
ADD COLUMN     "isFavorite" BOOLEAN,
ADD COLUMN     "purchaseAmount" DOUBLE PRECISION,
ADD COLUMN     "purchaseCurrency" "Currency",
ADD COLUMN     "purchaseLink" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Top" DROP COLUMN "cuff",
DROP COLUMN "fibreType",
ADD COLUMN     "fiberType" "FiberType",
ADD COLUMN     "hasCuff" BOOLEAN,
ADD COLUMN     "isFavorite" BOOLEAN,
ADD COLUMN     "purchaseAmount" DOUBLE PRECISION,
ADD COLUMN     "purchaseCurrency" "Currency",
ADD COLUMN     "purchaseLink" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Head";

-- DropTable
DROP TABLE "OutfitHead";
