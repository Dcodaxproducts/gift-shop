import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { DashboardProviderPerformance } from "@/types/dashboard";
import { getInitials } from "@/utils/getInitials";
import { Button } from "../ui/button";

type ProviderPerformanceTableProps = {
  providers: DashboardProviderPerformance[];
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

export function ProviderPerformanceTable({ providers }: ProviderPerformanceTableProps) {
  const cols = ["Provider", "Success Rate", "Total Volume"];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Provider Performance
        </CardTitle>
        <Button variant="ghost" className="text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {cols.map((col) => (
                <TableHead className="px-0" key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={cols.length} className="py-8 text-center text-xs font-medium text-slate-500">
                  No provider performance data found.
                </TableCell>
              </TableRow>
            ) : (
              providers.map(({ providerId, providerName, successRate, totalVolume }) => {
                const isHealthy = successRate >= 90;

                return (
                  <TableRow key={providerId}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-[10px] font-semibold text-primary">
                          {getInitials(providerName)}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {providerName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              isHealthy ? "bg-success" : "bg-danger"
                            )}
                            style={{ width: `${successRate}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-600">
                          {successRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {currencyFormatter.format(totalVolume)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
