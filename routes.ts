export const HOME = () => ({ name: "Home", path: "/" });
export const ABOUT = () => ({ name: "About", path: "/about" });
export const OUTFIT = (id?: string) => ({
  name: "Outfit",
  path: `/outfit/${id ?? ""}`,
  newObjPath: "/outfit/new",
});
export const TOP = (id?: string) => ({
  name: "Top",
  path: `/top/${id ?? ""}`,
  newObjPath: "/top/new",
});
export const BOTTOM = (id?: string) => ({
  name: "Bottom",
  path: `/bottom/${id ?? ""}`,
  newObjPath: "/bottom/new",
});
export const ACCESSORY = (id?: string) => ({
  name: "Accessory",
  path: `/accessory/${id ?? ""}`,
  newObjPath: "/accessory/new",
});
export const FOOT = (id?: string) => ({
  name: "Foot",
  path: `/foot/${id ?? ""}`,
  newObjPath: "/foot/new",
});
export const FULL_BODY = (id?: string) => ({
  name: "Full Body",
  path: `/full-body/${id ?? ""}`,
  newObjPath: "/full-body/new",
});

export const NavbarRoutes = [OUTFIT, TOP, BOTTOM, ACCESSORY, FOOT, FULL_BODY];
