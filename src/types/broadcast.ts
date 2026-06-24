export type BroadcastAudience = "ALL_USERS" | "PROVIDER" | "USER";

export type CreateBroadcastPayload = {
  title: string;
  message: string;
  audience: BroadcastAudience;
};

export type Broadcast = CreateBroadcastPayload & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};
