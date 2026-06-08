import { api } from "@/lib/axios";
import type {
  CreateSubscriptionPlanPayload,
  EditSubscriptionPlanPayload,
  GetSubscriptionPlansParams,
  SubscriptionPlan,
} from "@/types/subscription-plans";

const SUBSCRIPTION_PLANS_ENDPOINT = "/subscription-plans";

export const getSubscriptionPlans = async (
  params: GetSubscriptionPlansParams = {},
) => {
  const { data } = await api.get(SUBSCRIPTION_PLANS_ENDPOINT, { params });
  const plans = data.data?.items ?? data.data?.data ?? data.data?.results ?? data.data ?? [];

  return plans as SubscriptionPlan[];
};

export const getSubscriptionPlan = async (id: string) => {
  const { data } = await api.get(`${SUBSCRIPTION_PLANS_ENDPOINT}/${id}`);
  return data.data as SubscriptionPlan;
};

export const createSubscriptionPlan = async (
  payload: CreateSubscriptionPlanPayload,
) => {
  const { data } = await api.post(SUBSCRIPTION_PLANS_ENDPOINT, payload);
  return data.data as SubscriptionPlan;
};

export const editSubscriptionPlan = async ({
  id,
  payload,
}: {
  id: string;
  payload: EditSubscriptionPlanPayload;
}) => {
  const { data } = await api.patch(`${SUBSCRIPTION_PLANS_ENDPOINT}/${id}`, payload);
  return data.data as SubscriptionPlan;
};

export const deleteSubscriptionPlan = async (id: string) => {
  const { data } = await api.delete(`${SUBSCRIPTION_PLANS_ENDPOINT}/${id}`);
  return data.data as SubscriptionPlan;
};
