import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Tag, type GetProps } from "antd";
import { Input } from "antd";
import { useState } from "react";

export interface Item {
  name: string;
  code: string;
  tags: string[];
  color: string;
  brand: string;
}

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const ItemsGrid = ({ items }: { items: Item[] }) => {
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Search
          placeholder="Search Items"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
          value={searchValue}
        />
        <Button>
          <PlusOutlined /> Add Item
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 p-2">
        {items.map(({ name, code, tags, color, brand }) => (
          <Card
            title={
              <div className="flex flex-col w-min p-2">
                <h3 className="font-bold w-min">{name}</h3>
                <p>{code}</p>
              </div>
            }
            extra={
              <div className="flex p-2 gap-2">
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
              {tags.map((tag) => (
                <Tag>{tag}</Tag>
              ))}
            </div>
            <p>Color: {color}</p>
            <p>Brand: {brand}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ItemsGrid;
