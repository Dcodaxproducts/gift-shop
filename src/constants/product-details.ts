export type SalesPerformancePoint = {
  label: string;
  value: number;
  cap: number;
};

export type ProductVariant = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
  swatchColor: string;
};

const SALES_MAX = 10;

const dailyValues = [
  4.2, 5.6, 6.4, 7.8, 5.1, 6.9, 8.2, 4.7, 5.4, 7.1, 8.6, 9.3, 6.2, 5.8, 4.4,
];

const weeklyValues = [5.5, 7.8, 7.0, 9.0];

const toPoint =
  (labelFor: (index: number) => string) =>
  (value: number, index: number): SalesPerformancePoint => ({
    label: labelFor(index),
    value,
    cap: Math.max(SALES_MAX - value, 0),
  });

export const salesPerformanceData: Record<"daily" | "weekly", SalesPerformancePoint[]> = {
  daily: dailyValues.map(
    toPoint((index) =>
      index === 0
        ? "01 Oct"
        : index === Math.floor(dailyValues.length / 2)
          ? "15 Oct"
          : index === dailyValues.length - 1
            ? "30 Oct"
            : "",
    ),
  ),
  weekly: weeklyValues.map(toPoint((index) => `Week ${index + 1}`)),
};

export const salesAxisMax = SALES_MAX;

export const productVariants: ProductVariant[] = [
  {
    id: "matte-black-large",
    name: "Matte Black / Large",
    sku: "PGB-BLK-LG",
    stock: 12,
    price: 120,
    swatchColor: "#0F172A",
  },
  {
    id: "classic-white-medium",
    name: "Classic White / Medium",
    sku: "PGB-WHT-MD",
    stock: 28,
    price: 95,
    swatchColor: "#F8FAFC",
  },
  {
    id: "royal-violet-small",
    name: "Royal Violet / Small",
    sku: "PGB-VIO-SM",
    stock: 2,
    price: 75,
    swatchColor: "#7C3AED",
  },
];

export const productMetadata = {
  productId: "#GP-88429-X",
  name: "Premium Gift Box",
  isActive: true,
  createdAt: "Sep 12, 2023",
  lastEdited: "2 hours ago",
  visibility: "Public",
};
