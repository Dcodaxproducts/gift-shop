"use client";

import { useState } from "react";
import { BroadcastForm } from "../../forms/BroadcastForm";
import { BroadcastHeader } from "./components/BroadcastHeader";
import { BroadcastMobilePreview } from "./components/BroadcastMobilePreview";
import { BroadcastSuccessCard } from "../../cards/BroadcastSuccessCard";

export default function Broadcast() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-295 space-y-8">
      <BroadcastHeader activeStep={3} completed />
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_400px]">
        {sent ? (
          <BroadcastSuccessCard
            onCreateAnother={() => {
              setSent(false);
            }}
          />
        ) : (
          <BroadcastForm onSent={() => setSent(true)} />
        )}
        <BroadcastMobilePreview />
      </div>
    </div>
  );
}
