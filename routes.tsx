import {
  IconAmpersand,
  IconHanger,
  IconHome2,
  IconInfoCircle,
  IconRun,
  IconShirt,
  IconShoe,
  IconSunglasses,
} from "@tabler/icons-react";

export const HOME = () => ({
  name: "Home",
  path: "/",
  icon: <IconHome2 />,
});
export const ABOUT = () => ({
  name: "About",
  path: "/about",
  icon: <IconInfoCircle />,
});
export const OUTFIT = (id?: string) => ({
  name: "Outfit",
  path: `/outfit/${id ?? ""}`,
  newObjPath: "/outfit/new",
  icon: <IconHanger />,
});
export const TOP = (id?: string) => ({
  name: "Top",
  path: `/top/${id ?? ""}`,
  newObjPath: "/top/new",
  icon: <IconShirt />,
});
export const BOTTOM = (id?: string) => ({
  name: "Bottom",
  path: `/bottom/${id ?? ""}`,
  newObjPath: "/bottom/new",
  icon: <IconRun />,
});
export const ACCESSORY = (id?: string) => ({
  name: "Accessory",
  path: `/accessory/${id ?? ""}`,
  newObjPath: "/accessory/new",
  icon: <IconSunglasses />,
});
export const FOOT = (id?: string) => ({
  name: "Foot",
  path: `/foot/${id ?? ""}`,
  newObjPath: "/foot/new",
  icon: <IconShoe />,
});
export const FULL_BODY = (id?: string) => ({
  name: "Full Body",
  path: `/full-body/${id ?? ""}`,
  newObjPath: "/full-body/new",
  icon: <IconAmpersand />,
});

export const NavbarRoutes = [OUTFIT, TOP, BOTTOM, ACCESSORY, FOOT, FULL_BODY];
