import { json, type MetaFunction } from "@remix-run/node";
import crypto from "crypto";
import {
  AppShell,
  Burger,
  Button,
  Group,
  MantineProvider,
  Skeleton,
} from "@mantine/core";
import {
  Link,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import React from "react";
import { HOME, NavbarRoutes } from "routes";
import { useDisclosure } from "@mantine/hooks";

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
  // const command = new PutObjectCommand({
  //   ACL: "public-read",
  //   Key: crypto.randomUUID(),
  //   Bucket: (Bucket as unknown as any).public.bucketName,
  // });
  // const url = await getSignedUrl(new S3Client({}), command);
  // return json({ url });
  return null;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [opened, { toggle }] = useDisclosure();
  const [img, setImg] = React.useState("");
  return (
    // <div>
    //   <form
    //   onSubmit={async (e) => {
    //     e.preventDefault();

    //     const file = (e.target as HTMLFormElement).file.files?.[0];

    //     const image = await fetch(data.url, {
    //       body: file,
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": file.type,
    //         "Content-Disposition": `attachment; filename="${file.name}"`,
    //       },
    //     });

    //     // window.location.href = image.url.split("?")[0];
    //     setImg(image.url.split("?")[0]);
    //   }}
    //   >
    //     <input name="file" type="file" accept="image/png, image/jpeg" />
    //     <button type="submit">Upload</button>
    //     <img src={img} />
    //   </form>
    // </div>
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Link to={HOME().path}>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-hanger"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428" />
              </svg>
              Overfitter
            </Group>
          </Link>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          {/* {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))} */}
          <ul>
            {NavbarRoutes.map((route, i) => (
              <li key={i}>
                <Link to={route().path}>{route().name}</Link>
              </li>
            ))}
          </ul>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>

      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </MantineProvider>
  );
}
