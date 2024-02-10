import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { OUTFIT } from "routes";

import { getClient } from "~/db.server";

export interface FormValues {
  name?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const client = await getClient(request);
  //   const { name } = Object.fromEntries((await request.formData()).entries());
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const outfit = await client.outfit.create({
    data: {
      name: name,
    },
    select: {
      id: true,
    },
  });
  return redirect(OUTFIT(outfit.id.toString()).path);
}

export default function Index() {
  return <Presentational />;
}

function Presentational(props: {}) {
  const form = useForm<FormValues>({
    name: "create-outfit",
  });

  return (
    <Form method="post">
      <TextInput
        label="Name"
        // description="Input description"
        placeholder="Name"
        {...form.getInputProps("name")}
      />
      <Button type="submit">Save</Button>
    </Form>
  );
}
