import { Card, CardContent } from "../ui/card";
import { ShieldCheck } from "lucide-react";
import type { ProviderDetails } from "@/types/providers";
import { StatusBadge } from "@/utils/status";
import { Label } from "../ui/label";

function BusinessDetailsCard({ data }: { data?: ProviderDetails }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-sm font-semibold ">Business Details</h2>
        <div className="mt-5 divide-y divide-slate-100">
          <div className="py-3">
            <Label>
              Email
            </Label>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-400">{data?.email}</p>
          </div>
          <div className="py-3">
            <Label>
              Phone
            </Label>
            <p className="mt-1 text-xs font-semibold text-slate-400 leading-4 ">{data?.businessPhone}</p>
          </div>
          <div className="py-3">
            <Label>
              Revenue
            </Label>
            <p className="mt-1 text-xs font-semibold text-slate-400 leading-4 ">${data?.revenue.toFixed(2)}</p>
          </div>
          <div className="py-3">
            <Label>
              Status
            </Label>
            <StatusBadge status={data?.status || ""} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BusinessDetailsCard;
