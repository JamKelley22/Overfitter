/*
  Warnings:

  - You are about to drop the column `fabricType` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `fiberType` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `itemStatus` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `plating` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `sizeInches` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSLetter` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSNumber` on the `Accessory` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Accessory` table. All the data in the column will be lost.
  - The `itemCondition` column on the `Accessory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `fabricType` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `fiberType` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `fit` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `inseamType` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `itemStatus` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `rise` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `sizeInches` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSLetter` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSNumber` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Bottom` table. All the data in the column will be lost.
  - The `itemCondition` column on the `Bottom` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `fabricType` on the `Foot` table. All the data in the column will be lost.
  - You are about to drop the column `fiberType` on the `Foot` table. All the data in the column will be lost.
  - You are about to drop the column `itemStatus` on the `Foot` table. All the data in the column will be lost.
  - You are about to drop the column `sizeInches` on the `Foot` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSLetter` on the `Foot` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSNumber` on the `Foot` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Foot` table. All the data in the column will be lost.
  - The `itemCondition` column on the `Foot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `fabricType` on the `FullBody` table. All the data in the column will be lost.
  - You are about to drop the column `fiberType` on the `FullBody` table. All the data in the column will be lost.
  - You are about to drop the column `itemStatus` on the `FullBody` table. All the data in the column will be lost.
  - You are about to drop the column `sizeInches` on the `FullBody` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSLetter` on the `FullBody` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSNumber` on the `FullBody` table. All the data in the column will be lost.
  - The `itemCondition` column on the `FullBody` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `type` on the `Outfit` table. All the data in the column will be lost.
  - You are about to drop the column `fabricType` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `fiberType` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `itemStatus` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `neckline` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `sizeInches` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSLetter` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUSNumber` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `sleeve` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Top` table. All the data in the column will be lost.
  - The `itemCondition` column on the `Top` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SizeConvention" AS ENUM ('Letter_US', 'Numeric_US', 'Inch', 'Centimeter');

-- AlterTable
ALTER TABLE "Accessory" DROP COLUMN "fabricType",
DROP COLUMN "fiberType",
DROP COLUMN "itemStatus",
DROP COLUMN "material",
DROP COLUMN "plating",
DROP COLUMN "sizeInches",
DROP COLUMN "sizeUSLetter",
DROP COLUMN "sizeUSNumber",
DROP COLUMN "type",
ADD COLUMN     "fabricTypeId" INTEGER,
ADD COLUMN     "fiberTypeId" INTEGER,
ADD COLUMN     "itemStatusId" INTEGER,
ADD COLUMN     "materialTypeId" INTEGER,
ADD COLUMN     "platingId" INTEGER,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "sizeConvention" "SizeConvention",
ADD COLUMN     "typeId" INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT,
DROP COLUMN "itemCondition",
ADD COLUMN     "itemCondition" INTEGER;

-- AlterTable
ALTER TABLE "Bottom" DROP COLUMN "fabricType",
DROP COLUMN "fiberType",
DROP COLUMN "fit",
DROP COLUMN "inseamType",
DROP COLUMN "itemStatus",
DROP COLUMN "rise",
DROP COLUMN "sizeInches",
DROP COLUMN "sizeUSLetter",
DROP COLUMN "sizeUSNumber",
DROP COLUMN "type",
ADD COLUMN     "fabricTypeId" INTEGER,
ADD COLUMN     "fiberTypeId" INTEGER,
ADD COLUMN     "fitId" INTEGER,
ADD COLUMN     "inseamTypeId" INTEGER,
ADD COLUMN     "itemStatusId" INTEGER,
ADD COLUMN     "riseId" INTEGER,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "sizeConvention" "SizeConvention",
ADD COLUMN     "typeId" INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT,
DROP COLUMN "itemCondition",
ADD COLUMN     "itemCondition" INTEGER;

-- AlterTable
ALTER TABLE "Foot" DROP COLUMN "fabricType",
DROP COLUMN "fiberType",
DROP COLUMN "itemStatus",
DROP COLUMN "sizeInches",
DROP COLUMN "sizeUSLetter",
DROP COLUMN "sizeUSNumber",
DROP COLUMN "type",
ADD COLUMN     "fabricTypeId" INTEGER,
ADD COLUMN     "fiberTypeId" INTEGER,
ADD COLUMN     "itemStatusId" INTEGER,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "sizeConvention" "SizeConvention",
ADD COLUMN     "typeId" INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT,
DROP COLUMN "itemCondition",
ADD COLUMN     "itemCondition" INTEGER;

-- AlterTable
ALTER TABLE "FullBody" DROP COLUMN "fabricType",
DROP COLUMN "fiberType",
DROP COLUMN "itemStatus",
DROP COLUMN "sizeInches",
DROP COLUMN "sizeUSLetter",
DROP COLUMN "sizeUSNumber",
ADD COLUMN     "fabricTypeId" INTEGER,
ADD COLUMN     "fiberTypeId" INTEGER,
ADD COLUMN     "itemStatusId" INTEGER,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "sizeConvention" "SizeConvention",
ALTER COLUMN "updatedAt" DROP DEFAULT,
DROP COLUMN "itemCondition",
ADD COLUMN     "itemCondition" INTEGER;

-- AlterTable
ALTER TABLE "Outfit" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Top" DROP COLUMN "fabricType",
DROP COLUMN "fiberType",
DROP COLUMN "itemStatus",
DROP COLUMN "neckline",
DROP COLUMN "sizeInches",
DROP COLUMN "sizeUSLetter",
DROP COLUMN "sizeUSNumber",
DROP COLUMN "sleeve",
DROP COLUMN "type",
ADD COLUMN     "fabricTypeId" INTEGER,
ADD COLUMN     "fiberTypeId" INTEGER,
ADD COLUMN     "itemStatusId" INTEGER,
ADD COLUMN     "necklineTypeId" INTEGER,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "sizeConvention" "SizeConvention",
ADD COLUMN     "sleeveTypeId" INTEGER,
ADD COLUMN     "typeId" INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT,
DROP COLUMN "itemCondition",
ADD COLUMN     "itemCondition" INTEGER;

-- DropEnum
DROP TYPE "AccessoryType";

-- DropEnum
DROP TYPE "BottomFit";

-- DropEnum
DROP TYPE "BottomInseamType";

-- DropEnum
DROP TYPE "BottomRise";

-- DropEnum
DROP TYPE "BottomType";

-- DropEnum
DROP TYPE "FabricType";

-- DropEnum
DROP TYPE "FiberType";

-- DropEnum
DROP TYPE "FootType";

-- DropEnum
DROP TYPE "HeadType";

-- DropEnum
DROP TYPE "ItemCondition";

-- DropEnum
DROP TYPE "ItemStatus";

-- DropEnum
DROP TYPE "MaterialType";

-- DropEnum
DROP TYPE "MetalType";

-- DropEnum
DROP TYPE "Neckline";

-- DropEnum
DROP TYPE "OutfitType";

-- DropEnum
DROP TYPE "SizeUSLetter";

-- DropEnum
DROP TYPE "Sleeve";

-- DropEnum
DROP TYPE "TopType";

-- CreateTable
CREATE TABLE "FabricType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "FiberType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "ItemStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "AccessoryType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "MetalType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "MaterialType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "BottomType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "BottomFit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "BottomInseamType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "BottomRiseType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "FootType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "TopType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "NecklineType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "SleeveType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "OutfitType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "FabricType_id_key" ON "FabricType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FiberType_id_key" ON "FiberType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatus_id_key" ON "ItemStatus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AccessoryType_id_key" ON "AccessoryType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MetalType_id_key" ON "MetalType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialType_id_key" ON "MaterialType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BottomType_id_key" ON "BottomType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BottomFit_id_key" ON "BottomFit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BottomInseamType_id_key" ON "BottomInseamType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BottomRiseType_id_key" ON "BottomRiseType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FootType_id_key" ON "FootType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TopType_id_key" ON "TopType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NecklineType_id_key" ON "NecklineType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SleeveType_id_key" ON "SleeveType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OutfitType_id_key" ON "OutfitType"("id");

-- AddForeignKey
ALTER TABLE "Accessory" ADD CONSTRAINT "Accessory_fabricTypeId_fkey" FOREIGN KEY ("fabricTypeId") REFERENCES "FabricType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessory" ADD CONSTRAINT "Accessory_fiberTypeId_fkey" FOREIGN KEY ("fiberTypeId") REFERENCES "FiberType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessory" ADD CONSTRAINT "Accessory_itemStatusId_fkey" FOREIGN KEY ("itemStatusId") REFERENCES "ItemStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessory" ADD CONSTRAINT "Accessory_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AccessoryType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessory" ADD CONSTRAINT "Accessory_platingId_fkey" FOREIGN KEY ("platingId") REFERENCES "MetalType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessory" ADD CONSTRAINT "Accessory_materialTypeId_fkey" FOREIGN KEY ("materialTypeId") REFERENCES "MaterialType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bottom" ADD CONSTRAINT "Bottom_fabricTypeId_fkey" FOREIGN KEY ("fabricTypeId") REFERENCES "FabricType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bottom" ADD CONSTRAINT "Bottom_fiberTypeId_fkey" FOREIGN KEY ("fiberTypeId") REFERENCES "FiberType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bottom" ADD CONSTRAINT "Bottom_itemStatusId_fkey" FOREIGN KEY ("itemStatusId") REFERENCES "ItemStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bottom" ADD CONSTRAINT "Bottom_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "BottomType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bottom" ADD CONSTRAINT "Bottom_fitId_fkey" FOREIGN KEY ("fitId") REFERENCES "BottomFit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bottom" ADD CONSTRAINT "Bottom_inseamTypeId_fkey" FOREIGN KEY ("inseamTypeId") REFERENCES "BottomInseamType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bottom" ADD CONSTRAINT "Bottom_riseId_fkey" FOREIGN KEY ("riseId") REFERENCES "BottomRiseType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foot" ADD CONSTRAINT "Foot_fabricTypeId_fkey" FOREIGN KEY ("fabricTypeId") REFERENCES "FabricType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foot" ADD CONSTRAINT "Foot_fiberTypeId_fkey" FOREIGN KEY ("fiberTypeId") REFERENCES "FiberType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foot" ADD CONSTRAINT "Foot_itemStatusId_fkey" FOREIGN KEY ("itemStatusId") REFERENCES "ItemStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foot" ADD CONSTRAINT "Foot_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "FootType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Top" ADD CONSTRAINT "Top_fabricTypeId_fkey" FOREIGN KEY ("fabricTypeId") REFERENCES "FabricType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Top" ADD CONSTRAINT "Top_fiberTypeId_fkey" FOREIGN KEY ("fiberTypeId") REFERENCES "FiberType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Top" ADD CONSTRAINT "Top_itemStatusId_fkey" FOREIGN KEY ("itemStatusId") REFERENCES "ItemStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Top" ADD CONSTRAINT "Top_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TopType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Top" ADD CONSTRAINT "Top_necklineTypeId_fkey" FOREIGN KEY ("necklineTypeId") REFERENCES "NecklineType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Top" ADD CONSTRAINT "Top_sleeveTypeId_fkey" FOREIGN KEY ("sleeveTypeId") REFERENCES "SleeveType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullBody" ADD CONSTRAINT "FullBody_fabricTypeId_fkey" FOREIGN KEY ("fabricTypeId") REFERENCES "FabricType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullBody" ADD CONSTRAINT "FullBody_fiberTypeId_fkey" FOREIGN KEY ("fiberTypeId") REFERENCES "FiberType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullBody" ADD CONSTRAINT "FullBody_itemStatusId_fkey" FOREIGN KEY ("itemStatusId") REFERENCES "ItemStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfit" ADD CONSTRAINT "Outfit_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "OutfitType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
