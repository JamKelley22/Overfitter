/*
  Warnings:

  - You are about to drop the column `inseamInches` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `waistInches` on the `Bottom` table. All the data in the column will be lost.
  - You are about to drop the column `sizeChestInches` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `sizeNeckInches` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `sizeSleeveInches` on the `Top` table. All the data in the column will be lost.
  - You are about to drop the column `sizeWaistInches` on the `Top` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bottom" DROP COLUMN "inseamInches",
DROP COLUMN "waistInches",
ADD COLUMN     "inseam" TEXT,
ADD COLUMN     "inseamSizeConvention" "SizeConvention",
ADD COLUMN     "waist" DOUBLE PRECISION,
ADD COLUMN     "waistSizeConvention" "SizeConvention";

-- AlterTable
ALTER TABLE "Top" DROP COLUMN "sizeChestInches",
DROP COLUMN "sizeNeckInches",
DROP COLUMN "sizeSleeveInches",
DROP COLUMN "sizeWaistInches",
ADD COLUMN     "sizeChest" TEXT,
ADD COLUMN     "sizeChestConvention" "SizeConvention",
ADD COLUMN     "sizeNeck" TEXT,
ADD COLUMN     "sizeNeckConvention" "SizeConvention",
ADD COLUMN     "sizeSleeve" TEXT,
ADD COLUMN     "sizeSleeveConvention" "SizeConvention",
ADD COLUMN     "sizeWaist" TEXT,
ADD COLUMN     "sizeWaistConvention" "SizeConvention";
