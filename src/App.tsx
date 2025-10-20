import { Tabs, type TabsProps } from "antd";
import { useState } from "react";
import ItemsGrid, { type Item } from "./ItemsGrid";
import type { Outfit } from "./OutfitsGrid";
import OutfitsGrid from "./OutfitsGrid";

const _items: Item[] = [
  {
    name: "Navy Blue Oxford Shirt",
    code: "SH-001",
    tags: ["shirt", "all-season"],
    color: "Navy Blue",
    brand: "Classic Wear",
  },
  {
    name: "Dark Wash Jeans",
    code: "PN-002",
    tags: ["pants", "all-season"],
    color: "Dark Blue",
    brand: "Denim Co",
  },
  {
    name: "White Sneakers",
    code: "SH-003",
    tags: ["shoes", "spring"],
    color: "White",
    brand: "Sport Style",
  },
];

const _outfits: Outfit[] = [
  {
    name: "Casual Friday",
    descriptionShort: "Perfect for a relaxed office day",
    items: _items,
    dateCreatedISO: new Date().toISOString(),
  },
];

function App() {
  const [activeKey, setActiveTab] = useState("items");

  const items: TabsProps["items"] = [
    {
      key: "items",
      label: "Items",
      children: <ItemsGrid items={_items} />,
    },
    {
      key: "outfits",
      label: "Outfits",
      children: <OutfitsGrid outfits={_outfits} />,
    },
  ];

  return (
    <div className="flex flex-col p-8">
      <div className="flex gap-4" id="description">
        <div id="icon" />
        <div className="flex flex-col font-bold">
          <h1>Overfitter</h1>
          <p>Organize your clothing items and create stylish outfits</p>
        </div>
      </div>

      <Tabs
        activeKey={activeKey}
        items={items}
        onChange={(activeKey) => setActiveTab(activeKey)}
      />
    </div>
  );
}

export default App;
