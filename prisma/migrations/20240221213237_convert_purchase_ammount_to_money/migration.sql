/*
  Warnings:

  - The `purchaseAmount` column on the `Accessory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `purchaseAmount` column on the `Bottom` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `purchaseAmount` column on the `Foot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `purchaseAmount` column on the `FullBody` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `purchaseAmount` column on the `Top` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Accessory" DROP COLUMN "purchaseAmount",
ADD COLUMN     "purchaseAmount" MONEY;

-- AlterTable
ALTER TABLE "Bottom" DROP COLUMN "purchaseAmount",
ADD COLUMN     "purchaseAmount" MONEY;

-- AlterTable
ALTER TABLE "Foot" DROP COLUMN "purchaseAmount",
ADD COLUMN     "purchaseAmount" MONEY;

-- AlterTable
ALTER TABLE "FullBody" DROP COLUMN "purchaseAmount",
ADD COLUMN     "purchaseAmount" MONEY;

-- AlterTable
ALTER TABLE "Top" DROP COLUMN "purchaseAmount",
ADD COLUMN     "purchaseAmount" MONEY;
