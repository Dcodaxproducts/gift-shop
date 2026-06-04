import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { providerPerformance } from "@/constants/home-dashboard";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function ProviderPerformanceTable() {
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
                <TableHead key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {providerPerformance.map((provider) => (
              <TableRow key={provider.provider}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-[10px] font-semibold text-primary">
                      {provider.shortCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {provider.provider}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          provider.tone === "green" ? "bg-success" : "bg-danger"
                        )}
                        style={{ width: `${provider.progress}%` }}
                      />
                    </div>
                    <span className="font-semibold text-slate-600">
                      {provider.successRate}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  {provider.volume}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}