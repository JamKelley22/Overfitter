/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AccessoryType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `BottomFit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `BottomInseamType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `BottomRiseType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `BottomType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `FabricType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `FiberType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `FootType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ItemStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `MaterialType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `MetalType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `NecklineType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `OutfitType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SleeveType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TopType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccessoryType_name_key" ON "AccessoryType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BottomFit_name_key" ON "BottomFit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BottomInseamType_name_key" ON "BottomInseamType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BottomRiseType_name_key" ON "BottomRiseType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BottomType_name_key" ON "BottomType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FabricType_name_key" ON "FabricType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FiberType_name_key" ON "FiberType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FootType_name_key" ON "FootType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatus_name_key" ON "ItemStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialType_name_key" ON "MaterialType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MetalType_name_key" ON "MetalType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NecklineType_name_key" ON "NecklineType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OutfitType_name_key" ON "OutfitType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SleeveType_name_key" ON "SleeveType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TopType_name_key" ON "TopType"("name");
