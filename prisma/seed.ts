import { PrismaClient, Currency, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const ChooseFromTypeArray = <T>(data: { [s: string]: T }): T =>
  faker.helpers.arrayElement(Object.values(data)) satisfies T;

type ExtractCommonProps<T extends object[]> = {
  [K in keyof T[number]]: K extends keyof T[number] ? T[number][K] : never;
};

type CreateInputCommonProps = ExtractCommonProps<
  [
    Prisma.AccessoryCreateInput,
    Prisma.BottomCreateInput,
    Prisma.TopCreateInput,
    Prisma.FootCreateInput,
    Prisma.FullBodyCreateInput
  ]
>;

const createBaseData = (data: {
  codePrefix?: string;
}): CreateInputCommonProps & { name: string } => {
  const { codePrefix } = data;
  return {
    code: `${codePrefix ?? "XYZ"}-${faker.string.alphanumeric(10)}`,
    uriImage: faker.image.url(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    brand: faker.company.name(),
    isFavorite: faker.datatype.boolean(),
    // fabricType: ChooseFromTypeArray(FabricType),
    // fiberType: ChooseFromTypeArray(FiberType),
    // sizeUSLetter: ChooseFromTypeArray(SizeUSLetter),
    // sizeUSNumber: faker.number.int({ min: 0, max: 13 }),
    // sizeInches: faker.number.float({ min: 0, max: 13 }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    purchasedAt: faker.date.past(),
    purchaseLink: faker.internet.url(),
    purchaseAmount: parseFloat(faker.commerce.price()),
    purchaseCurrency: ChooseFromTypeArray(Currency),
    rating: faker.number.float({ min: 0, max: 5 }),
    // itemCondition: ChooseFromTypeArray(ItemCondition),
    // itemStatus: ChooseFromTypeArray(ItemStatus),
    numberOfWears: faker.number.int({ min: 0, max: 100 }),
    wearsBeforeDirty: faker.number.int({ min: 0, max: 10 }),
    wearsLeftBeforeDirty: faker.number.int({ min: 0, max: 10 }),
    primaryColor: faker.internet.color(),
    secondaryColor: faker.internet.color(),
    accentColor: faker.internet.color(),
    pattern: faker.lorem.word(),
    print: faker.lorem.word(),
  } satisfies CreateInputCommonProps & { name: string };
};

async function main() {
  console.log(`Start seeding 🌱 ...`);

  const numberOfObjects = 100;

  const accessoriesData = Array.from({ length: numberOfObjects }, () => {
    return {
      ...createBaseData({ codePrefix: "ACC" }),
      // type: ChooseFromTypeArray(AccessoryType),
      // plating: ChooseFromTypeArray(MetalType),
      // material: ChooseFromTypeArray(MaterialType),
    };
  });
  const bottomsData = Array.from({ length: numberOfObjects }, () => {
    return {
      ...createBaseData({ codePrefix: "BOT" }),
      // type: ChooseFromTypeArray(BottomType),
      // fit: ChooseFromTypeArray(BottomFit),
      // inseamType: ChooseFromTypeArray(BottomInseamType),
      // inseamInches: faker.number.float({ min: 10, max: 45 }),
      // waistInches: faker.number.float({ min: 20, max: 50 }),
      // rise: ChooseFromTypeArray(BottomRise),
    };
  });
  const topsData = Array.from({ length: numberOfObjects }, () => {
    return {
      ...createBaseData({ codePrefix: "TOP" }),
      // type: ChooseFromTypeArray(TopType),
      // sizeNeckInches: faker.number.float({ min: 14, max: 20 }),
      // sizeChestInches: faker.number.float({ min: 36, max: 56 }),
      // sizeWaistInches: faker.number.float({ min: 29, max: 50 }),
      // sizeSleeveInches: faker.number.float({ min: 32, max: 37 }),
      // neckline: ChooseFromTypeArray(Neckline),
      // sleeve: ChooseFromTypeArray(Sleeve),
      hasCuff: faker.datatype.boolean(),
    };
  });
  const feetData = Array.from({ length: numberOfObjects }, () => {
    return {
      ...createBaseData({ codePrefix: "FET" }),
      // type: ChooseFromTypeArray(FootType),
    };
  });
  const fullBodyData = Array.from({ length: numberOfObjects }, () =>
    createBaseData({ codePrefix: "FUB" })
  );

  await Promise.all([
    prisma.accessory.createMany({
      data: accessoriesData,
    }),
    prisma.bottom.createMany({
      data: bottomsData,
    }),
    prisma.top.createMany({
      data: topsData,
    }),
    prisma.foot.createMany({
      data: feetData,
    }),
    prisma.fullBody.createMany({
      data: fullBodyData,
    }),
  ]);

  console.log(`Seeding finished 🌱.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
