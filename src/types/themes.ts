export type SortOrder = "ASC" | "DESC";

export type SeasonalThemeSortBy =
  | "createdAt"
  | "updatedAt"
  | "name"
  | "startsAt"
  | "endsAt";

export type GetSeasonalThemesParams = {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: SeasonalThemeSortBy;
  sortOrder?: SortOrder;
};

export type SeasonalTheme = {
  id: string;
  name: string;
  imageUrl: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateSeasonalThemePayload = {
  name: string;
  imageUrl: string;
  startsAt: string;
  endsAt: string;
  isActive?: boolean;
};

export type UpdateSeasonalThemePayload = Partial<CreateSeasonalThemePayload>;
