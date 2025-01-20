import {
  Button,
  Card,
  Group,
  Image,
  Text,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import { LoaderFunctionArgs, SerializeFrom, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { TOP } from "routes";
import { getClient } from "~/db.server";
import { stringToHexColor } from "~/util";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const client = await getClient(request);
  const tops = await client.top.findMany({
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
  });
  return json({ tops });
}

type Loader = SerializeFrom<typeof loader>;

export default function TopIndex() {
  const { tops } = useLoaderData<typeof loader>();
  return <Presentational tops={tops} />;
}

function Presentational(props: { tops?: Loader["tops"] }) {
  const { tops } = props;
  return (
    <div>
      <h1>All tops</h1>
      <SimpleGrid cols={3}>
        {tops?.map((top, i) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
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
      <Link to={TOP().newObjPath}>
        <Button>+ New</Button>
      </Link>
    </div>
  );
}
