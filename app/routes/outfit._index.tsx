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
import { OUTFIT } from "routes";
import { getClient } from "~/db.server";
import { stringToHexColor } from "~/util";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const client = await getClient(request);
  const outfits = await client.outfit.findMany({
    select: {
      id: true,
      name: true,
      uriImage: true,
      style: true,
      type: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
      description: true,
    },
  });
  return json({ outfits });
}

type Loader = SerializeFrom<typeof loader>;

export default function OutfitIndex() {
  const { outfits } = useLoaderData<typeof loader>();
  return <Presentational outfits={outfits} />;
}

function Presentational(props: { outfits?: Loader["outfits"] }) {
  const { outfits } = props;
  return (
    <div>
      <h1>All Outfits</h1>
      <SimpleGrid cols={3}>
        {outfits?.map((outfit, i) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={outfit.uriImage} height={160} alt="Outfit Picture" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{outfit.name}</Text>
              <Badge color={stringToHexColor(outfit.type?.toString() ?? "")}>
                {outfit.type?.name}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {outfit.description}
            </Text>

            <Link to={OUTFIT(outfit.id.toString()).path}>
              <Button color="blue" fullWidth mt="md" radius="md">
                View
              </Button>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
      <Link to={OUTFIT().newObjPath}>
        <Button>+ New</Button>
      </Link>
    </div>
  );
}
