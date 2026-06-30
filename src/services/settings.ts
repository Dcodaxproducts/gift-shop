import { api } from "@/lib/axios";
import type {
  SystemSettings,
  UpdateSystemSettingsPayload,
} from "@/types/settings";

const SYSTEM_SETTINGS_ENDPOINT = "/admin/system-settings";

export const getSystemSettings = async () => {
  const { data } = await api.get(SYSTEM_SETTINGS_ENDPOINT);
  return data.data as SystemSettings;
};

export const updateSystemSettings = async (
  payload: UpdateSystemSettingsPayload,
) => {
  const { data } = await api.patch(SYSTEM_SETTINGS_ENDPOINT, payload);
  return data.data as SystemSettings;
};
