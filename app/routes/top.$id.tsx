import { useState } from "react";

import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";

import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, SerializeFrom, json } from "@remix-run/node";

import { getClient } from "~/db.server";

export interface FormValues {
  name?: string;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const client = await getClient(request);
  const id = parseInt(params.id ?? "");
  const top = await client.top.findUnique({
    where: {
      id,
    },
  });
  return json({ top });
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

export default function TopId() {
  const { top } = useLoaderData<typeof loader>();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<FormValues>({
    initialValues: {
      name: top?.name ?? undefined,
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
