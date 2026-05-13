import { Card, CardContent } from "../ui/card";
import { ShieldCheck } from "lucide-react";

function BusinessDetailsCard({ data }: { data: any }) {
  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-sm font-semibold text-slate-950">Business Details</h2>
        <div className="mt-5 divide-y divide-slate-100">
          <div className="py-3 first:pt-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Provider Code
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-950">{data?.providerCode}</p>
          </div>
          <div className="py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Email
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-950">{data?.email}</p>
          </div>
          <div className="py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Phone
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-950">{data?.phone}</p>
          </div>
          <div className="py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Service Area
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-950">{data?.serviceArea}</p>
          </div>
          <div className="py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Revenue
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-950">${data?.revenue}</p>
          </div>
          <div className="py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Verification Status
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-blue-600">
              <ShieldCheck className="size-4" />
              {data?.verification?.label}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BusinessDetailsCard;