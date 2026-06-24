import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { notificationIcons } from "@/constants/broadcast";

export function BroadcastSuccessCard({
  onCreateAnother,
}: {
  onCreateAnother: () => void;
}) {
  const SuccessIcon = notificationIcons.success;

  return (
    <Card>
      <CardContent className="text-center">
        <div className="flex min-h-122 flex-col items-center justify-center">
          <div className="mx-auto flex size-24 rotate-12 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/25">
            <SuccessIcon className="size-12 -rotate-12" strokeWidth={2.8} />
          </div>
          <h2 className="mx-auto mt-8 max-w-107.5 text-[30px] font-semibold leading-tight tracking-tight">Broadcast Sent Successfully!</h2>
          <p className="mx-auto mt-5 max-w-105 text-sm font-medium leading-6 text-slate-500">
            Your announcement has been sent to the selected audience.
          </p>
          <div className="mt-8 w-full max-w-80">
            <Button variant="ghost" className="h-13 w-full bg-primary/10 text-slate-700 hover:bg-primary/15" onClick={onCreateAnother}>
              Create Another Broadcast
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
