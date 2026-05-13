export type GiftCategoryIcon = "voucher" | "food" | "luxury" | "electronics";
export type GiftCategoryTone = "purple" | "orange" | "violet" | "emerald";

export type GiftCategoryItem = {
  id: string;
  name: string;
  description: string;
  totalGifts: number;
  icon: GiftCategoryIcon;
  tone: GiftCategoryTone;
};

export const giftCategoryItems: GiftCategoryItem[] = [
  {
    id: "cat-001",
    name: "Digital Vouchers",
    description:
      "Electronic gift cards and online promotional codes for global retailers.",
    totalGifts: 128,
    icon: "voucher",
    tone: "purple",
  },
  {
    id: "cat-002",
    name: "Gourmet Food",
    description:
      "Premium snacks, artisanal chocolates, and curated wine baskets.",
    totalGifts: 85,
    icon: "food",
    tone: "orange",
  },
  {
    id: "cat-003",
    name: "Luxury Items",
    description:
      "High-end designer accessories, luxury watches, and jewelry.",
    totalGifts: 42,
    icon: "luxury",
    tone: "violet",
  },
  {
    id: "cat-004",
    name: "Electronics",
    description:
      "Latest gadgets, wireless headphones, and smart home automation devices.",
    totalGifts: 64,
    icon: "electronics",
    tone: "emerald",
  },
];

export const giftCategoryPagination = {
  total: 12,
  page: 1,
  limit: 4,
  totalPages: 3,
  hasNext: true,
  hasPrevious: false,
};
