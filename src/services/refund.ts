import { api } from "@/lib/axios";
import type {
  RefundPolicySettings,
  UpdateRefundPolicySettingsPayload,
} from "@/types/refund";

const REFUND_POLICY_SETTINGS_ENDPOINT = "/admin/refund-policy-settings";

export const getRefundPolicySettings = async () => {
  const { data } = await api.get(REFUND_POLICY_SETTINGS_ENDPOINT);
  return data.data as RefundPolicySettings;
};

export const updateRefundPolicySettings = async (
  payload: UpdateRefundPolicySettingsPayload,
) => {
  const { data } = await api.patch(REFUND_POLICY_SETTINGS_ENDPOINT, payload);
  return data.data as RefundPolicySettings;
};
