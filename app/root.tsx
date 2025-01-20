import {
  Link,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import {
  AppShell,
  Burger,
  ColorSchemeScript,
  Group,
  MantineProvider,
  NavLink,
} from "@mantine/core";

import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

import {
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconCircleOff,
} from "@tabler/icons-react";
import { HOME, NavbarRoutes } from "routes";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Overfitter" },
    {
      name: "description",
      content: "A Closet Management Application for the Home",
    },
  ];
};

export default function App() {
  // const data = useLoaderData<typeof loader>();
  const [opened, { toggle }] = useDisclosure();
  const [img, setImg] = React.useState("");
  const { pathname } = useLocation();

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
        {NavbarRoutes.map((route) => (
          <NavLink
            key={route().path}
            href={route().path}
            label={route().name}
            leftSection={route().icon}
            active={route().path === pathname}
          />
        ))}
        {/* </ul> */}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
