export type SubscriptionPlanStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";
export type SubscriptionPlanVisibility = "PUBLIC" | "PRIVATE" | "ARCHIVED";

export type SubscriptionPlanFeature = {
  title: string;
  description?: string;
  enabled?: boolean;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  description?: string | null;
  tier?: string | null;
  monthlyPrice?: number | null;
  yearlyPrice?: number | null;
  currency?: string;
  visibility?: SubscriptionPlanVisibility | string;
  isVisible?: boolean;
  features?: string[] | SubscriptionPlanFeature[] | Record<string, boolean>;
  limits?: {
    maxGiftsPerMonth?: number;
    maxGroupGiftingEvents?: number;
    maxTeamMembers?: number;
    storageGb?: number;
  };
  slug?: string;
  badge?: string | null;
  activeSubscribers?: number;
  isPopular?: boolean;
  isActive?: boolean;
  status?: SubscriptionPlanStatus | string;
  subscribersCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type GetSubscriptionPlansParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: SubscriptionPlanStatus | string;
};

export type CreateSubscriptionPlanPayload = {
  name: string;
  description?: string;
  tier?: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  currency?: string;
  visibility?: SubscriptionPlanVisibility;
  isVisible?: boolean;
  status?: SubscriptionPlanStatus;
  features?: Record<string, boolean>;
  limits?: {
    maxGiftsPerMonth?: number;
    maxGroupGiftingEvents?: number;
    maxTeamMembers?: number;
    storageGb?: number;
  };
  isPopular?: boolean;
  isActive?: boolean;
};

export type EditSubscriptionPlanPayload = Partial<CreateSubscriptionPlanPayload>;
