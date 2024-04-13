import {
  Button,
  Checkbox,
  ColorInput,
  FileInput,
  NumberInput,
  Rating,
  Select,
  TextInput,
  Textarea,
  Image,
} from "@mantine/core";
import { z } from "zod";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Currency, SizeConvention } from "@prisma/client";

import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { TOP } from "routes";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import { getClient } from "~/db.server";

const TopSchema = z.object({
  code: z.string().optional(),
  uriImage: z.string().optional(),
  imageSrc: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  brand: z.string().optional(),
  isFavorite: z.boolean().optional(),
  fabricType: z.string().optional(),
  fiberType: z.string().optional(),
  sizeConvention: z.nativeEnum(SizeConvention).optional(),
  size: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  purchasedAt: z.string().optional(),
  purchaseLink: z.string().optional(),
  purchaseAmount: z.string().optional(),
  purchaseCurrency: z.nativeEnum(Currency).optional(),
  rating: z.number().optional(),
  itemCondition: z.number().optional(),
  itemStatus: z.string().optional(),
  numberOfWears: z.number().optional(),
  wearsBeforeDirty: z.number().optional(),
  wearsLeftBeforeDirty: z.number().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  pattern: z.string().optional(),
  print: z.string().optional(),
  type: z.string().optional(),
  sizeNeckConvention: z.nativeEnum(SizeConvention).optional(),
  sizeNeck: z.string().optional(),
  sizeChestConvention: z.nativeEnum(SizeConvention).optional(),
  sizeChest: z.string().optional(),
  sizeWaistConvention: z.nativeEnum(SizeConvention).optional(),
  sizeWaist: z.string().optional(),
  sizeSleeveConvention: z.nativeEnum(SizeConvention).optional(),
  sizeSleeve: z.string().optional(),
  necklineType: z.string().optional(),
  sleeveType: z.string().optional(),
  hasCuff: z.boolean().optional(),
  // outfitConnection: z.string().optional(),
});

type TopSchema = z.infer<typeof TopSchema>;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const client = await getClient(request);
  // const command = new PutObjectCommand({
  //   ACL: "public-read",
  //   Key: crypto.randomUUID(),
  //   Bucket: (Bucket as unknown as any).public.bucketName,
  // });
  // const url = await getSignedUrl(new S3Client({}), command);

  const tops = await client.top.findMany({
    select: {
      type: true,
      necklineType: true,
      sleeveType: true,
    },
  });
  const outfits = await client.outfit.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return json({
    topTypes: [
      ...new Set(
        tops.reduce<string[]>(
          (acc, top) => (top.type ? [...acc, top.type.toString()] : acc),
          []
        )
      ),
    ],
    necklines: [
      ...new Set(
        tops.reduce<string[]>(
          (acc, top) =>
            top.necklineType ? [...acc, top.necklineType.toString()] : acc,
          []
        )
      ),
    ],
    sleeves: [
      ...new Set(
        tops.reduce<string[]>(
          (acc, top) =>
            top.sleeveType ? [...acc, top.sleeveType.toString()] : acc,
          []
        )
      ),
    ],
    outfits,
    // url,
  });
}

// type Loader = SerializeFrom<typeof loader>;

// async function uploadImageToS3(data: AsyncIterable<Uint8Array>) {
//   const command = new PutObjectCommand({
//     ACL: "public-read",
//     Key: crypto.randomUUID(),
//     Bucket: (Bucket as unknown as any).public.bucketName,
//   });
//   const url = await getSignedUrl(new S3Client({}), command);

//   // return image;
//   const uploadPromise = new Promise<UploadApiResponse>(
//     async (resolve, reject) => {
//       // const uploadStream = cloudinary.v2.uploader.upload_stream(
//       //   {
//       //     folder: "remix",
//       //   },
//       //   (error, result) => {
//       //     if (error) {
//       //       reject(error);
//       //       return;
//       //     }
//       //     resolve(result);
//       //   }
//       // );

//       // await writeAsyncIterableToWritable(data, uploadStream);
//       const image = await fetch(url, {
//         body: file,
//         method: "PUT",
//         headers: {
//           "Content-Type": file.type,
//           "Content-Disposition": `attachment; filename="${file.name}"`,
//         },
//       });
//     }
//   );
//   return uploadPromise;
// }

export async function action({ request }: ActionFunctionArgs) {
  const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (name !== "img") {
        return undefined;
      }
      // const uploadedImage = await uploadImageToS3(data);
      // return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const client = await getClient(request);
  // const formData = await request.formData();
  const parsedFormData = Object.fromEntries(formData);

  const topData = TopSchema.parse(parsedFormData);
  // console.log({ topData });

  const top = await client.top.create({
    data: {
      ...topData,
      fabricType: topData.fabricType
        ? {
            connectOrCreate: {
              where: {
                name: topData.fabricType,
              },
              create: {
                name: topData.fabricType,
              },
            },
          }
        : undefined,
      fiberType: topData.fiberType
        ? {
            connectOrCreate: {
              where: {
                name: topData.fiberType,
              },
              create: {
                name: topData.fiberType,
              },
            },
          }
        : undefined,
      itemStatus: topData.itemStatus
        ? {
            connectOrCreate: {
              where: {
                name: topData.itemStatus,
              },
              create: {
                name: topData.itemStatus,
              },
            },
          }
        : undefined,
      type: topData.type
        ? {
            connectOrCreate: {
              where: {
                name: topData.type,
              },
              create: {
                name: topData.type,
              },
            },
          }
        : undefined,
      necklineType: topData.necklineType
        ? {
            connectOrCreate: {
              where: {
                name: topData.necklineType,
              },
              create: {
                name: topData.necklineType,
              },
            },
          }
        : undefined,
      sleeveType: topData.sleeveType
        ? {
            connectOrCreate: {
              where: {
                name: topData.sleeveType,
              },
              create: {
                name: topData.sleeveType,
              },
            },
          }
        : undefined,
    },
    select: {
      id: true,
    },
  });
  return redirect(TOP(top.id.toString()).path);
}

export default function TopNew() {
  const { topTypes, necklines, sleeves, outfits } =
    useLoaderData<typeof loader>();

  const [displayedFields, setDisplayedFields] = React.useState<
    (keyof TopSchema)[]
  >(["name", "uriImage", "imageSrc"]);
  const [uriImage, setURIImage] = React.useState<File | null>(null);
  const [imageSrc, setImageSrc] = React.useState("");

  const form = useForm<TopSchema>({
    name: "create-top",
    // validate: {
    //   purchaseLink: (value) => {
    //     try {
    //       new URL(value);
    //       return null;
    //     } catch (_) {
    //       return "Invalid URL";
    //     }
    //   },
    // },
  });

  const getInputProps = (key: keyof TopSchema) => ({
    ...form.getInputProps(key, { name: key }),
    name: key,
  });

  const fields: Map<keyof TopSchema, React.ReactNode> = new Map([
    //  BASIC
    [
      "code",
      <TextInput label="Code" placeholder="Code" {...getInputProps("code")} />,
    ],
    [
      "uriImage",
      <FileInput
        accept="image/png,image/jpeg"
        clearable
        value={uriImage}
        label="Image"
        {...{
          ...getInputProps("uriImage"),
          // onChange: (payload) => {
          //   setURIImage(payload);
          //   if (payload) {
          //     const imageUrl = URL.createObjectURL(payload);
          //     setImageSrc(imageUrl);
          //   }
          // },
        }}
      />,
    ],
    ["imageSrc", <input type="hidden" name="imageSrc" value={imageSrc} />],
    [
      "name",
      <TextInput label="Name" placeholder="Name" {...getInputProps("name")} />,
    ],
    [
      "description",
      <Textarea
        label="Description"
        placeholder="Description"
        {...getInputProps("description")}
      />,
    ],
    [
      "brand",
      <TextInput
        label="Brand"
        placeholder="Brand"
        {...getInputProps("brand")}
      />,
    ],
    [
      "isFavorite",
      <Checkbox label="Favorite?" {...getInputProps("isFavorite")} />,
    ],
    [
      "fabricType",
      <TextInput
        label="fabricType"
        placeholder="fabricType"
        {...getInputProps("fabricType")}
      />,
    ],
    [
      "fiberType",
      <TextInput
        label="fiberType"
        placeholder="fiberType"
        {...getInputProps("fiberType")}
      />,
    ],
    // SIZES
    [
      "sizeConvention",
      <TextInput
        label="sizeConvention"
        placeholder="sizeConvention"
        {...getInputProps("sizeConvention")}
      />,
    ],
    [
      "size",
      <TextInput label="size" placeholder="size" {...getInputProps("size")} />,
    ],
    // TIMESTAMPS
    [
      "purchasedAt",
      <DateInput
        label="purchasedAt"
        placeholder="purchasedAt"
        {...getInputProps("purchasedAt")}
      />,
    ],
    // PURCHASE DETAILS
    [
      "purchaseLink",
      <TextInput
        label="purchaseLink"
        placeholder="purchaseLink"
        {...getInputProps("purchaseLink")}
      />,
    ],
    [
      "purchaseAmount",
      <TextInput
        label="purchaseAmount"
        placeholder="purchaseAmount"
        {...getInputProps("purchaseAmount")}
      />,
    ],
    [
      "purchaseCurrency",
      <Select
        label="purchaseCurrency"
        placeholder="purchaseCurrency"
        {...getInputProps("purchaseCurrency")}
        data={[]}
      />,
    ],
    // ITEM DETAILS
    ["rating", <Rating {...getInputProps("rating")} />],
    [
      "itemCondition",
      <Select
        label="itemCondition"
        placeholder="itemCondition"
        {...getInputProps("itemCondition")}
        data={[]}
      />,
    ],
    [
      "itemStatus",
      <Select
        label="itemStatus"
        placeholder="itemStatus"
        {...getInputProps("itemStatus")}
        data={[]}
      />,
    ],
    [
      "numberOfWears",
      <NumberInput
        label="numberOfWears"
        placeholder="numberOfWears"
        {...getInputProps("numberOfWears")}
      />,
    ],
    [
      "wearsBeforeDirty",
      <NumberInput
        label="wearsBeforeDirty"
        placeholder="wearsBeforeDirty"
        {...getInputProps("wearsBeforeDirty")}
      />,
    ],
    [
      "wearsLeftBeforeDirty",
      <NumberInput
        label="wearsLeftBeforeDirty"
        placeholder="wearsLeftBeforeDirty"
        {...getInputProps("wearsLeftBeforeDirty")}
      />,
    ],
    // COLORS & PATTERNS
    [
      "primaryColor",
      <ColorInput
        label=""
        placeholder="primaryColor"
        {...getInputProps("primaryColor")}
      />,
    ],
    [
      "secondaryColor",
      <ColorInput
        label="secondaryColor"
        placeholder="secondaryColor"
        {...getInputProps("secondaryColor")}
      />,
    ],
    [
      "accentColor",
      <ColorInput
        label="accentColor"
        placeholder="accentColor"
        {...getInputProps("accentColor")}
      />,
    ],
    [
      "pattern",
      <TextInput
        label="pattern"
        placeholder="pattern"
        {...getInputProps("pattern")}
      />,
    ],
    [
      "print",
      <TextInput
        label="print"
        placeholder="print"
        {...getInputProps("print")}
      />,
    ],
    // TOP SPECIFIC
    [
      "type",
      <Select
        label="Top Type"
        placeholder="Top Type"
        {...getInputProps("type")}
        data={topTypes}
      />,
    ],
    [
      "sizeNeckConvention",
      <Select
        label="sizeNeckConvention"
        placeholder="sizeNeckConvention"
        {...getInputProps("sizeNeckConvention")}
        data={[]}
      />,
    ],
    [
      "sizeNeck",
      <NumberInput
        label="sizeNeck"
        placeholder="sizeNeck"
        {...getInputProps("sizeNeck")}
      />,
    ],
    [
      "sizeChestConvention",
      <Select
        label="sizeChestConvention"
        placeholder="sizeChestConvention"
        {...getInputProps("sizeChestConvention")}
        data={[]}
      />,
    ],
    [
      "sizeChest",
      <NumberInput
        label="sizeChest"
        placeholder="sizeChest"
        {...getInputProps("sizeChest")}
      />,
    ],
    [
      "sizeWaistConvention",
      <Select
        label="sizeWaistConvention"
        placeholder="sizeWaistConvention"
        {...getInputProps("sizeWaistConvention")}
        data={[]}
      />,
    ],
    [
      "sizeWaist",
      <NumberInput
        label="sizeWaist"
        placeholder="sizeWaist"
        {...getInputProps("sizeWaist")}
      />,
    ],
    [
      "sizeSleeveConvention",
      <Select
        label="sizeSleeveConvention"
        placeholder="sizeSleeveConvention"
        {...getInputProps("sizeSleeveConvention")}
        data={[]}
      />,
    ],
    [
      "sizeSleeve",
      <NumberInput
        label="sizeSleeve"
        placeholder="sizeSleeve"
        {...getInputProps("sizeSleeve")}
      />,
    ],
    [
      "necklineType",
      <Select
        label="necklineType"
        placeholder="necklineType"
        {...getInputProps("necklineType")}
        data={necklines}
      />,
    ],
    [
      "sleeveType",
      <Select
        label="sleeveType"
        placeholder="sleeveType"
        {...getInputProps("sleeveType")}
        data={sleeves}
      />,
    ],
    ["hasCuff", <Checkbox label="hasCuff?" {...getInputProps("hasCuff")} />],
    // // RELATIONSHIPS
    // [
    //   "outfitConnection",
    //   <Select
    //     label="Outfit Connection"
    //     placeholder="Outfit"
    //     {...getInputProps("outfitConnection")}
    //     data={outfits.map((outfit) => outfit.name ?? outfit.id.toString())}
    //   />,
    // ],
  ]);

  return (
    <Form method="post">
      <Image src={imageSrc} width="100px" radius="md" w={200} />
      {displayedFields.map((displayedField, i) => (
        <div key={i}>{fields.get(displayedField)}</div>
      ))}
      <Button type="submit">Save</Button>
    </Form>
  );
}
