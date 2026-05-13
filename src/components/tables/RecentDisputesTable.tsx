import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentDisputes } from "@/constants/home-dashboard";
import { StatusBadge } from "@/utils/status";

export function RecentDisputesTable() {
  const cols = ["ID & User", "Reason", "Status"];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-5 pb-4">
        <CardTitle>Recent Disputes</CardTitle>
        <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-500">
          4 Urgent
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {cols.map((col) => (
                <TableHead key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDisputes.map((dispute) => (
              <TableRow key={dispute.id}>
                <TableCell>
                  <p className="text-[10px] font-semibold text-primary">{dispute.id}</p>
                  <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
                    {dispute.user}
                  </p>
                </TableCell>
                <TableCell className="text-xs leading-5 text-slate-500">
                  {dispute.reason}
                </TableCell>
                <TableCell>
                  <StatusBadge status={dispute.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}