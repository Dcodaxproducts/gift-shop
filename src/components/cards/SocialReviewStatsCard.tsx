import { EyeOff, Flag, MessageSquareText, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { reviewSystemStats } from "@/constants/social-reviews-moderation";
import { cn } from "@/lib/utils";

const statIcons = {
  reviews: MessageSquareText,
  flag: Flag,
  hidden: EyeOff,
  star: Star,
};

const toneClassNames = {
  primary: {
    card: "bg-primary/5",
    icon: "bg-primary/10 text-primary",
    value: "",
  },
  danger: {
    card: "bg-red-50",
    icon: "bg-red-100 text-red-600",
    value: "text-red-600",
  },
  muted: {
    card: "bg-slate-100",
    icon: "bg-slate-200 text-slate-500",
    value: "",
  },
};

export function SocialReviewStatsCard() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {reviewSystemStats.map((stat) => {
        const Icon = statIcons[stat.icon];
        const tone = toneClassNames[stat.tone];

        return (
          <Card key={stat.label} className={cn("border-transparent shadow-md shadow-slate-200/60", tone.card)}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {stat.label}
                </p>
                <span className={cn("flex size-7 items-center justify-center rounded-lg", tone.icon)}>
                  <Icon className="size-3.5" />
                </span>
              </div>
              <div className="mt-5 flex items-end gap-2">
                <p className={cn("text-2xl font-bold tracking-tight", tone.value)}>{stat.value}</p>
                {"suffix" in stat ? (
                  <span className="pb-1 text-[10px] font-semibold text-slate-500">{stat.suffix}</span>
                ) : null}
                {"change" in stat ? (
                  <span className="pb-1 text-[10px] font-bold text-primary">{stat.change}</span>
                ) : null}
                {"badge" in stat ? (
                  <span className="mb-1 rounded bg-red-600 px-1.5 py-0.5 text-[8px] font-bold uppercase text-white">
                    {stat.badge}
                  </span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
