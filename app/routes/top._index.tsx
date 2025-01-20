import {
  Button,
  Card,
  Group,
  Image,
  Text,
  Badge,
  SimpleGrid,
  Pagination,
} from "@mantine/core";
import { LoaderFunctionArgs, SerializeFrom, json } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { TOP } from "routes";
import { getClient } from "~/db.server";
import { stringToHexColor } from "~/util";

const itemsPerPage = 6;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "0");

  const client = await getClient(request);
  const [numTops, tops] = await client.$transaction([
    client.top.count(),
    client.top.findMany({
      skip: page,
      take: itemsPerPage,
      select: {
        id: true,
        name: true,
        uriImage: true,
        type: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
        description: true,
      },
    }),
  ]);
  return json({ numTops, tops });
}

type Loader = SerializeFrom<typeof loader>;

export default function TopIndex() {
  const { numTops, tops } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = parseInt(searchParams.get("page") ?? "0");

  return (
    <div>
      <h1>All tops</h1>
      <SimpleGrid cols={3}>
        {tops?.map((top) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder key={top.id}>
            <Card.Section>
              <Image src={top.uriImage} height={160} alt="Outfit Picture" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{top.name}</Text>
              <Badge color={stringToHexColor(top.type?.toString() ?? "")}>
                {top.type?.name}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {top.description}
            </Text>

            <Link to={TOP(top.id.toString()).path}>
              <Button color="blue" fullWidth mt="md" radius="md">
                View
              </Button>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
      <Pagination
        total={numTops / itemsPerPage}
        value={activePage}
        onChange={(value: number) => {
          setSearchParams(
            (prev) => {
              prev.set("page", value.toString());
              return prev;
            },
            {
              preventScrollReset: true,
            }
          );
        }}
      />
      <Link to={TOP().newObjPath}>
        <Button>+ New</Button>
      </Link>
    </div>
  );
}
