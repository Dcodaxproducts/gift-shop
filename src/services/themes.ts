import { api } from "@/lib/axios";
import type {
  CreateSeasonalThemePayload,
  GetSeasonalThemesParams,
  SeasonalTheme,
  UpdateSeasonalThemePayload,
} from "@/types/themes";

const SEASONAL_THEMES_ENDPOINT = "/admin/seasonal-themes";

const getItems = (data: unknown) => {
  const response = data as {
    data?:
      | SeasonalTheme[]
      | {
          items?: SeasonalTheme[];
          data?: SeasonalTheme[];
          results?: SeasonalTheme[];
        };
  };

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return (
    response.data?.items ??
    response.data?.data ??
    response.data?.results ??
    []
  );
};

export const getSeasonalThemes = async (
  params: GetSeasonalThemesParams = {},
) => {
  const { data } = await api.get(SEASONAL_THEMES_ENDPOINT, { params });
  return getItems(data) as SeasonalTheme[];
};

export const getSeasonalTheme = async (id: string) => {
  const { data } = await api.get(`${SEASONAL_THEMES_ENDPOINT}/${id}`);
  return data.data as SeasonalTheme;
};

export const createSeasonalTheme = async (
  payload: CreateSeasonalThemePayload,
) => {
  const { data } = await api.post(SEASONAL_THEMES_ENDPOINT, payload);
  return data.data as SeasonalTheme;
};

export const updateSeasonalTheme = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateSeasonalThemePayload;
}) => {
  const { data } = await api.patch(`${SEASONAL_THEMES_ENDPOINT}/${id}`, payload);
  return data.data as SeasonalTheme;
};

export const deleteSeasonalTheme = async (id: string) => {
  const { data } = await api.delete(`${SEASONAL_THEMES_ENDPOINT}/${id}`);
  return data.data as SeasonalTheme;
};
