import { FileImage, FileText, FolderOpen, SquareLibrary } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DisputeEvidenceFile } from "@/types/disputes";
import { cn } from "@/lib/utils";

const evidenceIcon = {
  pdf: FileText,
  image: SquareLibrary,
  text: FileImage,
};

const evidenceTone = {
  pdf: "text-red-600",
  image: "text-primary",
  text: "text-slate-500",
};

export function EvidenceCard({ files }: { files: DisputeEvidenceFile[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="size-4 text-slate-600" />
          Customer Evidence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5 pt-1">
        {files.map((file) => {
          const Icon = evidenceIcon[file.type];

          return (
            <div key={file.name} className="flex min-w-0 items-center gap-3">
              <Icon className={cn("size-4 shrink-0", evidenceTone[file.type])} />
              <span className="truncate text-xs font-medium">{file.name}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
