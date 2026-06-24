"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { createBroadcast } from "@/services/broadcast";

export const useBroadcast = () => {
  return useMutation({
    mutationFn: createBroadcast,
    onSuccess: () => {
      toast.success("Broadcast sent successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send broadcast. Please try again."));
    },
  });
};
