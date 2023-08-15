-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('CLEAN', 'WORN', 'DIRTY');

-- CreateEnum
CREATE TYPE "ItemCondition" AS ENUM ('NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR', 'TRASH');

-- CreateEnum
CREATE TYPE "FiberType" AS ENUM ('COTTON', 'POLYESTER', 'NYLON', 'WOOL', 'SILK', 'RAYON', 'LINEN', 'SPANDEX', 'LYCRA', 'CASHMERE', 'BAMBOO', 'ACETATE', 'ACRYLIC', 'ALPACA', 'ANGORA', 'HEMP', 'MOHAIR');

-- CreateEnum
CREATE TYPE "FabricType" AS ENUM ('LEATHER', 'DENIM', 'VELVET', 'LACE', 'FUR', 'FLEECE', 'CHIFFON', 'BROCADE', 'TWEED', 'TULLE', 'JERSEY', 'MUSLIN', 'ORGANZA', 'SATIN', 'TAFFETA', 'TERRY', 'TWILL', 'VOILE', 'WORSTED', 'CHENILLE', 'CREPE', 'DAMASK', 'FAILLE', 'FLANNEL', 'GINGHAM', 'JACQUARD', 'SEERSUCKER');

-- CreateEnum
CREATE TYPE "MetalType" AS ENUM ('GOLD', 'SILVER', 'PLATINUM', 'TITANIUM', 'STAINLESS_STEEL', 'BRASS', 'COPPER', 'BRONZE', 'PEWTER', 'NICKEL', 'TUNGSTEN');

-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('PLASTIC', 'GOLD', 'SILVER', 'PLATINUM', 'TITANIUM', 'STAINLESS_STEEL', 'BRASS', 'COPPER', 'BRONZE', 'PEWTER', 'NICKEL', 'TUNGSTEN');

-- CreateEnum
CREATE TYPE "SizeUSLetter" AS ENUM ('TwoXS', 'XS', 'S', 'M', 'L', 'XL', 'TwoXL', 'ThreeXL', 'FourXL', 'FiveXL', 'SixXL');

-- CreateEnum
CREATE TYPE "AccessoryType" AS ENUM ('RING', 'NECKLACE', 'EARRINGS', 'PURSE', 'WALLET', 'WATCH', 'BRACELET', 'SCARF', 'GLASSES', 'HAT', 'BELT', 'ANKLET', 'BODY_CHAIN');

-- CreateEnum
CREATE TYPE "BottomType" AS ENUM ('LOUNGE', 'DRESS', 'UNDER', 'SLEEP', 'WORKOUT', 'JEAN', 'KAKHI', 'BIKE_SHORT', 'COMPRESSION_SHORT', 'COMPRESSION_LEGGING', 'MINI_SKIRT', 'MAXI_SKIRT', 'MIDI_SKIRT', 'KNEE_LENGTH_SKIRT', 'PENCIL_SKIRT', 'PLEATED_SKIRT', 'A_LINE_SKIRT', 'TULIP_SKIRT', 'TIERED_SKIRT', 'WRAP_SKIRT', 'CIRCLE_SKIRT', 'SKATER_SKIRT', 'TENNIS_SKIRT', 'TUBE_SKIRT', 'SKORT', 'SLACK');

-- CreateEnum
CREATE TYPE "BottomInseamType" AS ENUM ('SHORT', 'PANT', 'CAPRI', 'CROP', 'ANKLE', 'REGULAR');

-- CreateEnum
CREATE TYPE "BottomFit" AS ENUM ('SKINNY', 'SLIM', 'STRAIGHT', 'BOOTCUT', 'RELAXED', 'WIDE_LEG', 'FLARE', 'BAGGY', 'JOGGER', 'LEGGING', 'CARGO', 'CHINO', 'SWEATPANT', 'BERMUDA', 'CROPPED');

-- CreateEnum
CREATE TYPE "BottomRise" AS ENUM ('MID', 'HIGH', 'LOW');

-- CreateEnum
CREATE TYPE "FootType" AS ENUM ('DRESS_SHOE', 'TENNIS_SHOE', 'CASUAL_SHOE', 'HEEL_SHOE', 'FLIP_FLOP_SHOE', 'SANDAL_SHOE', 'DRESS_SOCK', 'CASUAL_SOCK', 'WEDGE_SHOE', 'BOOT_SHOE');

-- CreateEnum
CREATE TYPE "HeadType" AS ENUM ('BASEBALL_HAT', 'BEANIE', 'BANDANA', 'GLASSES');

-- CreateEnum
CREATE TYPE "OutfitType" AS ENUM ('FORMAL', 'CASUAL', 'BUSINESS', 'BUSINESS_CASUAL', 'SPORT', 'SLEEP', 'SWIM', 'LOUNGE', 'COCKTAIL', 'PARTY');

-- CreateEnum
CREATE TYPE "TopType" AS ENUM ('TEE', 'LOUNGE', 'DRESS', 'FLANNEL', 'UNDER', 'POLO', 'SLEEP', 'CASUAL', 'WORKOUT', 'BRA', 'BUTTON_UP', 'BLOUSE', 'TANK', 'TUBE', 'TUNIC', 'SWEATER', 'CARDIGAN', 'HOODIE', 'JACKET', 'BLAZER', 'VEST', 'CAPE', 'PONCHO', 'KIMONO', 'WRAP');

-- CreateEnum
CREATE TYPE "Neckline" AS ENUM ('CREW', 'SCOOP', 'SQUARE', 'BOAT', 'HALTER', 'OFF_SHOULDER', 'ONE_SHOULDER', 'STRAPLESS', 'SWEETHEART', 'SURPLICE', 'V_NECK', 'COWL', 'KEYHOLE', 'TURTLENECK', 'MOCK', 'HOOD', 'COLLAR', 'PETER_PAN', 'QUEEN_ANNE', 'PLUNGE', 'LOW_CUT', 'SAILOR');

-- CreateEnum
CREATE TYPE "Sleeve" AS ENUM ('SLEEVELESS', 'CAP', 'SHORT', 'THREE_QUARTER', 'LONG', 'BELL', 'BISHOP', 'DOLMAN', 'FLUTTER', 'KIMONO', 'PUFF', 'RAGLAN', 'TULIP', 'SPAGHETTI', 'STRAP', 'COLD_SHOULDER', 'PEASANT', 'LEG_OF_MUTTON');

-- CreateEnum
CREATE TYPE "BodySide" AS ENUM ('LEFT', 'RIGHT');

-- CreateEnum
CREATE TYPE "FootPosition" AS ENUM ('LEFT', 'RIGHT');

-- CreateTable
CREATE TABLE "Accessory" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "uriImage" TEXT,
    "name" TEXT,
    "description" TEXT,
    "brand" TEXT,
    "fabricType" "FabricType",
    "fibreType" "FiberType",
    "sizeUSLetter" "SizeUSLetter",
    "sizeUSNumber" DOUBLE PRECISION,
    "sizeInches" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "purchasedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "itemCondition" "ItemCondition",
    "itemStatus" "ItemStatus",
    "numberOfWears" INTEGER,
    "wearsBeforeDirty" INTEGER,
    "wearsLeftBeforeDirty" INTEGER,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "accentColor" TEXT,
    "pattern" TEXT,
    "print" TEXT,
    "type" "AccessoryType",
    "plating" "MetalType",
    "material" "MaterialType",

    CONSTRAINT "Accessory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfitAccessory" (
    "outfitId" INTEGER NOT NULL,
    "accessoryId" INTEGER NOT NULL,
    "position" "BodySide",

    CONSTRAINT "OutfitAccessory_pkey" PRIMARY KEY ("outfitId","accessoryId")
);

-- CreateTable
CREATE TABLE "Bottom" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "uriImage" TEXT,
    "name" TEXT,
    "description" TEXT,
    "brand" TEXT,
    "fabricType" "FabricType",
    "fibreType" "FiberType",
    "sizeUSLetter" "SizeUSLetter",
    "sizeUSNumber" DOUBLE PRECISION,
    "sizeInches" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "purchasedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "itemCondition" "ItemCondition",
    "itemStatus" "ItemStatus",
    "numberOfWears" INTEGER,
    "wearsBeforeDirty" INTEGER,
    "wearsLeftBeforeDirty" INTEGER,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "accentColor" TEXT,
    "pattern" TEXT,
    "print" TEXT,
    "type" "BottomType",
    "fit" "BottomFit",
    "inseamType" "BottomInseamType",
    "inseamInches" DOUBLE PRECISION,
    "waistInches" DOUBLE PRECISION,
    "rise" "BottomRise",

    CONSTRAINT "Bottom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfitBottom" (
    "outfitId" INTEGER NOT NULL,
    "bottomId" INTEGER NOT NULL,
    "layerOrder" INTEGER,

    CONSTRAINT "OutfitBottom_pkey" PRIMARY KEY ("outfitId","bottomId")
);

-- CreateTable
CREATE TABLE "Foot" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "uriImage" TEXT,
    "name" TEXT,
    "description" TEXT,
    "brand" TEXT,
    "fabricType" "FabricType",
    "fibreType" "FiberType",
    "sizeUSLetter" "SizeUSLetter",
    "sizeUSNumber" DOUBLE PRECISION,
    "sizeInches" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "purchasedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "itemCondition" "ItemCondition",
    "itemStatus" "ItemStatus",
    "numberOfWears" INTEGER,
    "wearsBeforeDirty" INTEGER,
    "wearsLeftBeforeDirty" INTEGER,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "accentColor" TEXT,
    "pattern" TEXT,
    "print" TEXT,
    "type" "FootType",

    CONSTRAINT "Foot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfitFoot" (
    "outfitId" INTEGER NOT NULL,
    "footId" INTEGER NOT NULL,
    "position" "BodySide",
    "layerOrder" INTEGER,

    CONSTRAINT "OutfitFoot_pkey" PRIMARY KEY ("outfitId","footId")
);

-- CreateTable
CREATE TABLE "Head" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "uriImage" TEXT,
    "name" TEXT,
    "description" TEXT,
    "brand" TEXT,
    "fabricType" "FabricType",
    "fibreType" "FiberType",
    "sizeUSLetter" "SizeUSLetter",
    "sizeUSNumber" DOUBLE PRECISION,
    "sizeInches" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "purchasedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "itemCondition" "ItemCondition",
    "itemStatus" "ItemStatus",
    "numberOfWears" INTEGER,
    "wearsBeforeDirty" INTEGER,
    "wearsLeftBeforeDirty" INTEGER,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "accentColor" TEXT,
    "pattern" TEXT,
    "print" TEXT,
    "type" "HeadType",

    CONSTRAINT "Head_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfitHead" (
    "outfitId" INTEGER NOT NULL,
    "headId" INTEGER NOT NULL,
    "layerOrder" INTEGER,

    CONSTRAINT "OutfitHead_pkey" PRIMARY KEY ("outfitId","headId")
);

-- CreateTable
CREATE TABLE "Top" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "uriImage" TEXT,
    "name" TEXT,
    "description" TEXT,
    "brand" TEXT,
    "fabricType" "FabricType",
    "fibreType" "FiberType",
    "sizeUSLetter" "SizeUSLetter",
    "sizeUSNumber" DOUBLE PRECISION,
    "sizeInches" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "purchasedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "itemCondition" "ItemCondition",
    "itemStatus" "ItemStatus",
    "numberOfWears" INTEGER,
    "wearsBeforeDirty" INTEGER,
    "wearsLeftBeforeDirty" INTEGER,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "accentColor" TEXT,
    "pattern" TEXT,
    "print" TEXT,
    "type" "TopType",
    "sizeNeckInches" DOUBLE PRECISION,
    "sizeChestInches" DOUBLE PRECISION,
    "sizeWaistInches" DOUBLE PRECISION,
    "sizeSleeveInches" DOUBLE PRECISION,
    "neckline" "Neckline",
    "sleeve" "Sleeve",
    "cuff" BOOLEAN,

    CONSTRAINT "Top_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfitTop" (
    "outfitId" INTEGER NOT NULL,
    "topId" INTEGER NOT NULL,
    "layerOrder" INTEGER,

    CONSTRAINT "OutfitTop_pkey" PRIMARY KEY ("outfitId","topId")
);

-- CreateTable
CREATE TABLE "FullBody" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "uriImage" TEXT,
    "name" TEXT,
    "description" TEXT,
    "brand" TEXT,
    "fabricType" "FabricType",
    "fibreType" "FiberType",
    "sizeUSLetter" "SizeUSLetter",
    "sizeUSNumber" DOUBLE PRECISION,
    "sizeInches" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "purchasedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "itemCondition" "ItemCondition",
    "itemStatus" "ItemStatus",
    "numberOfWears" INTEGER,
    "wearsBeforeDirty" INTEGER,
    "wearsLeftBeforeDirty" INTEGER,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "accentColor" TEXT,
    "pattern" TEXT,
    "print" TEXT,

    CONSTRAINT "FullBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfitFullBody" (
    "outfitId" INTEGER NOT NULL,
    "fullBodyId" INTEGER NOT NULL,
    "layerOrder" INTEGER,

    CONSTRAINT "OutfitFullBody_pkey" PRIMARY KEY ("outfitId","fullBodyId")
);

-- CreateTable
CREATE TABLE "Outfit" (
    "id" SERIAL NOT NULL,
    "uriImage" TEXT,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "rating" DOUBLE PRECISION,
    "numberOfWears" INTEGER,
    "type" "OutfitType",
    "style" TEXT,

    CONSTRAINT "Outfit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accessory_code_key" ON "Accessory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Bottom_code_key" ON "Bottom"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Foot_code_key" ON "Foot"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Head_code_key" ON "Head"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Top_code_key" ON "Top"("code");

-- CreateIndex
CREATE UNIQUE INDEX "FullBody_code_key" ON "FullBody"("code");

-- AddForeignKey
ALTER TABLE "OutfitAccessory" ADD CONSTRAINT "OutfitAccessory_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitAccessory" ADD CONSTRAINT "OutfitAccessory_accessoryId_fkey" FOREIGN KEY ("accessoryId") REFERENCES "Accessory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitBottom" ADD CONSTRAINT "OutfitBottom_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitBottom" ADD CONSTRAINT "OutfitBottom_bottomId_fkey" FOREIGN KEY ("bottomId") REFERENCES "Bottom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitFoot" ADD CONSTRAINT "OutfitFoot_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitFoot" ADD CONSTRAINT "OutfitFoot_footId_fkey" FOREIGN KEY ("footId") REFERENCES "Foot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitHead" ADD CONSTRAINT "OutfitHead_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitHead" ADD CONSTRAINT "OutfitHead_headId_fkey" FOREIGN KEY ("headId") REFERENCES "Head"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitTop" ADD CONSTRAINT "OutfitTop_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitTop" ADD CONSTRAINT "OutfitTop_topId_fkey" FOREIGN KEY ("topId") REFERENCES "Top"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitFullBody" ADD CONSTRAINT "OutfitFullBody_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "Outfit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfitFullBody" ADD CONSTRAINT "OutfitFullBody_fullBodyId_fkey" FOREIGN KEY ("fullBodyId") REFERENCES "FullBody"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
