export type GiftStatus = "active" | "pending" | "inactive";

export type GiftInventoryStat = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: "gifts" | "active" | "pending";
};

export type GiftInventoryItem = {
  id: string;
  name: string;
  category: string;
  provider: string;
  price: string;
  rating: string;
  status: GiftStatus;
  imageTone: "green" | "gray" | "dark" | "orange";
};

export const giftInventoryStats: GiftInventoryStat[] = [
  {
    title: "Total Gifts",
    value: "1,284",
    change: "+12% from last month",
    trend: "up",
    icon: "gifts",
  },
  {
    title: "Active Listings",
    value: "1,142",
    change: "+5% from last month",
    trend: "up",
    icon: "active",
  },
  {
    title: "Pending Approval",
    value: "42",
    change: "-8% from last month",
    trend: "down",
    icon: "pending",
  },
];

export const giftCategoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "experience", label: "Experience" },
  { value: "physical", label: "Physical" },
  { value: "digital", label: "Digital" },
];

export const giftProviderOptions = [
  { value: "all", label: "All Providers" },
  { value: "wellnesshub", label: "WellnessHub" },
  { value: "sportify", label: "Sportify" },
  { value: "streamnow", label: "StreamNow" },
  { value: "gearsx", label: "GearsX" },
];

export const giftInventoryItems: GiftInventoryItem[] = [
  {
    id: "gift-001",
    name: "Ultimate Yoga Retreat",
    category: "Experience",
    provider: "WellnessHub",
    price: "$249.00",
    rating: "4.9",
    status: "active",
    imageTone: "green",
  },
  {
    id: "gift-002",
    name: "Pro Runners v2",
    category: "Physical",
    provider: "Sportify",
    price: "$120.00",
    rating: "4.7",
    status: "pending",
    imageTone: "gray",
  },
  {
    id: "gift-003",
    name: "Streaming Gold Pass",
    category: "Digital",
    provider: "StreamNow",
    price: "$50.00",
    rating: "4.8",
    status: "active",
    imageTone: "dark",
  },
  {
    id: "gift-004",
    name: "Premium Tech Kit",
    category: "Physical",
    provider: "GearsX",
    price: "$899.00",
    rating: "5.0",
    status: "inactive",
    imageTone: "orange",
  },
];

export const giftPagination = {
  total: 1284,
  page: 1,
  limit: 10,
  totalPages: 128,
  hasNext: true,
  hasPrevious: false,
};
