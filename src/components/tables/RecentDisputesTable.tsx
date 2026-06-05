import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DashboardDispute } from "@/types/dashboard";
import { StatusBadge } from "@/utils/status";

type RecentDisputesTableProps = {
  disputes: DashboardDispute[];
};

export function RecentDisputesTable({ disputes }: RecentDisputesTableProps) {
  const cols = ["ID & User", "Reason", "Status"];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Disputes</CardTitle>
        
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {cols.map((col) => (
                <TableHead className="px-0" key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {disputes.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={cols.length} className="py-8 text-center text-xs font-medium text-slate-500">
                  No recent disputes found.
                </TableCell>
              </TableRow>
            ) : (
              disputes.map(({ id, caseId, userName, reason, status }) => (
                <TableRow key={id}>
                  <TableCell>
                    <p className="text-[10px] font-semibold text-primary">{caseId}</p>
                    <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
                      {userName}
                    </p>
                  </TableCell>
                  <TableCell className="text-xs leading-5 text-slate-500">
                    {reason}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
