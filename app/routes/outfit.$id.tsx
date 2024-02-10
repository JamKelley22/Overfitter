import { useState } from "react";

import { Outfit } from "@prisma/client";

import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";

import { useLoaderData } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  SerializeFrom,
  json,
} from "@remix-run/node";

import { getClient } from "~/db.server";

export interface FormValues {
  name?: string;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const client = await getClient(request);
  const id = parseInt(params.id ?? "");
  const outfit = await client.outfit.findUnique({
    where: {
      id,
    },
  });
  return json({ outfit });
}

type Loader = SerializeFrom<typeof loader>;

// export async function action({ request }: ActionFunctionArgs) {
//   const client = await getClient(request);
//   const outfit = await client.outfit.create({
//     data: {
//       name: "TEST",
//     },
//     select: {
//       id: true,
//     },
//   });
//   return {
//     success: true,
//     outfit,
//   };
// }

export default function Index() {
  const { outfit } = useLoaderData<typeof loader>();
  const [isEditing, setIsEditing] = useState(false);
  return <Presentational isEditing={isEditing} outfit={outfit ?? undefined} />;
}

function Presentational(props: {
  isEditing: boolean;
  outfit?: Loader["outfit"];
}) {
  const { isEditing, outfit } = props;

  const form = useForm<FormValues>({
    initialValues: {
      name: outfit?.name ?? undefined,
    },
    enhanceGetInputProps: (payload) => ({
      disabled: !isEditing,
    }),
  });

  return (
    <div>
      <TextInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        {...form.getInputProps("name")}
      />
    </div>
  );
}
