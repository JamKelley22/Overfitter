import { json, type MetaFunction } from "@remix-run/node";
import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Button } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Overfitter" },
    {
      name: "description",
      content: "A Closet Management Application for the Home",
    },
  ];
};

export async function loader() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: (Bucket as unknown as any).public.bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return json({ url });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [img, setImg] = React.useState("");
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <Button variant="filled" color="gray">
        Button
      </Button>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const file = (e.target as HTMLFormElement).file.files?.[0]!;

          const image = await fetch(data.url, {
            body: file,
            method: "PUT",
            headers: {
              "Content-Type": file.type,
              "Content-Disposition": `attachment; filename="${file.name}"`,
            },
          });

          // window.location.href = image.url.split("?")[0];
          setImg(image.url.split("?")[0]);
        }}
      >
        <input name="file" type="file" accept="image/png, image/jpeg" />
        <button type="submit">Upload</button>
        <img src={img} />
      </form>
    </div>
  );
}
