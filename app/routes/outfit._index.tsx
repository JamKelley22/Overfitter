import { Button } from "@mantine/core";
import { LoaderFunctionArgs, SerializeFrom, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { OUTFIT } from "routes";
import { getClient } from "~/db.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const client = await getClient(request);
  const outfits = await client.outfit.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return json({ outfits });
}

type Loader = SerializeFrom<typeof loader>;

export default function Index() {
  const { outfits } = useLoaderData<typeof loader>();
  return <Presentational outfits={outfits} />;
}

function Presentational(props: { outfits?: Loader["outfits"] }) {
  const { outfits } = props;
  return (
    <div>
      <h1>All Outfits</h1>
      <ul>
        {outfits?.map((outfit, i) => (
          <Link to={OUTFIT(outfit.id.toString()).path}>
            <li key={i}>{outfit.name}</li>
          </Link>
        ))}
      </ul>
      <Link to={OUTFIT().newObjPath}>
        <Button>+ New</Button>
      </Link>
    </div>
  );
}
