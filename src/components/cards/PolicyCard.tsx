import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function PolicyCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3">
          <Icon className="size-4 text-primary" strokeWidth={2.4} />
          <Label className="text-sm font-semibold text-slate-800">{label}</Label>
        </div>
        <div className="mt-5">{children}</div>
      </CardContent>
    </Card>
  );
}