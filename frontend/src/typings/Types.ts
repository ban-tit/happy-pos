interface BaseType {
  id?: string;
  name: string;
}

export interface Menu extends BaseType {
  price: number;
}

export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  price: number;
  isAvailable: boolean;
  addonCategoriesIds: string[];
}

export interface AddonCategory extends BaseType {
  is_Required: boolean;
}

export interface MenuLocation extends BaseType {
  menus_id: number;
  locations_id: number;
  is_available: boolean;
}
