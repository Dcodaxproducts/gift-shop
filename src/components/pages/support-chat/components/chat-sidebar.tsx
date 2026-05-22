import type { SupportChatThread } from "@/constants/support-chat";
import { cn } from "@/lib/utils";

type ChatSidebarProps = {
  activeCount: number;
  threads: SupportChatThread[];
};

export function ChatSidebar({ activeCount, threads }: ChatSidebarProps) {
  return (
    <aside className="w-full border-b border-border bg-white lg:w-80 lg:border-b-0 lg:border-r">
      <div className="flex h-13 items-center justify-between border-b border-border px-4">
        <h1 className="text-sm font-semibold">Active Chats</h1>
        <span className="rounded bg-primary px-2 py-1 text-[10px] font-semibold leading-none text-white">
          {activeCount} Active
        </span>
      </div>

      <div className="divide-y divide-border">
        {threads.map((thread) => (
          <button
            key={thread.id}
            type="button"
            className={cn(
              "grid w-full grid-cols-[40px_1fr_auto] gap-3 px-4 py-3 text-left transition hover:bg-slate-50",
              thread.active && "border-l-4 border-primary bg-primary/5 pl-3",
            )}
          >
            <span className={cn("flex size-10 items-center justify-center rounded-xl text-xs font-semibold", thread.avatarTone)}>
              {thread.avatarLabel}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold">{thread.name}</span>
              <span className={cn("mt-1 block truncate text-[11px]", thread.active ? "font-semibold text-primary" : "text-slate-500")}>
                {thread.subtitle}
              </span>
              {thread.preview ? (
                <span className="mt-1 block truncate text-[9px] font-semibold uppercase text-slate-500">{thread.preview}</span>
              ) : null}
            </span>
            <span className="flex flex-col items-end gap-2">
              <span className="whitespace-nowrap text-[9px] text-slate-400">{thread.time}</span>
              {thread.unread ? (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                  {thread.unread}
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
