import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Tag, type GetProps } from "antd";
import { Input } from "antd";
import { DateTime } from "luxon";
import type { Item } from "./ItemsGrid";

export interface Outfit {
  name: string;
  descriptionShort: string;
  items: Item[];
  dateCreatedISO: string;
}

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const OutfitsGrid = ({ outfits }: { outfits: Outfit[] }) => {
  //   const [searchValue, setSearchValue] = useState("");

  //   const onSearch = (value: string) => {
  //     setSearchValue(value);
  //   };

  return (
    <div>
      <div className="flex justify-between">
        <div />
        {/* <Search
          placeholder="Search Items"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
          value={searchValue}
        /> */}
        <Button>
          <PlusOutlined /> Add Item
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 p-2">
        {outfits.map(({ name, descriptionShort, items, dateCreatedISO }) => (
          <Card
            title={
              <div className="flex flex-col w-min">
                <h3 className="font-bold w-min">{name}</h3>
                <p>{descriptionShort}</p>
              </div>
            }
            extra={
              <div className="flex  gap-2">
                <Button>
                  <EditOutlined />
                </Button>
                <Button>
                  <DeleteOutlined />
                </Button>
              </div>
            }
          >
            <div className="flex gap-4">
              {items.map((item) => (
                <Tag>{item.name}</Tag>
              ))}
            </div>
            <p>{items.length} items</p>
            <p>Created: {DateTime.fromISO(dateCreatedISO).toLocaleString()}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OutfitsGrid;
