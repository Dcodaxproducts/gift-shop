import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { notificationIcons } from "@/constants/broadcast";

export function BroadcastMobilePreview() {
  const PhoneIcon = notificationIcons.phone;
  const DesktopIcon = notificationIcons.desktop;
  const MegaphoneIcon = notificationIcons.megaphone;

  return (
    <Card className="bg-primary/5">
      <CardContent>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Live Preview</h2>
          <div className="flex items-center gap-3">
            <PhoneIcon className="size-5 text-primary" />
            <DesktopIcon className="size-5 text-slate-300" />
          </div>
        </div>
        <div className="mt-7 flex justify-center">
          <div className="relative w-61.25 overflow-hidden rounded-[2.5rem] border-8 border-slate-900 shadow-2xl">
            <Image
              src="/mobile.png"
              alt="Mobile notification preview"
              width={490}
              height={640}
              priority
              className="block w-full"
            />
            <div className="absolute left-3 right-3 top-20 rounded-xl bg-white/95 p-3 shadow-xl">
              <div className="flex items-start gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-white">
                  <MegaphoneIcon className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[8px] font-semibold uppercase tracking-wide text-slate-500">Broadcast Engine</p>
                    <span className="text-[8px] font-medium text-slate-400">Now</span>
                  </div>
                  <p className="mt-1 text-[10px] font-semibold">Notification Title</p>
                  <p className="mt-0.5 line-clamp-2 text-[8px] font-medium leading-3 text-slate-500">Type your message here...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-[10px] font-medium text-slate-500">Preview updates in real-time as you type</p>
      </CardContent>
    </Card>
  );
}
