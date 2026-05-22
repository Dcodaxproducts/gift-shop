// src/components/pages/user-details/components/chat-conversation.tsx
import { Download, MoreVertical, Paperclip, SendHorizontal, Smile, SquareCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SupportChatMessage } from "@/constants/support-chat";
import { cn } from "@/lib/utils";

type ChatConversationProps = {
  headerTitle: string;
  headerStatus: string;
  inputPlaceholder: string;
  messages: SupportChatMessage[];
};

export function ChatConversation({
  headerTitle,
  headerStatus,
  inputPlaceholder,
  messages,
}: ChatConversationProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col bg-slate-50">
      {/* Header View Block */}
      <header className="flex h-13 items-center justify-between border-b border-border bg-white px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[9px] font-semibold text-amber-300">
            LU
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{headerTitle}</h2>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{headerStatus}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 px-3 text-[11px]">
            <SquareCheckBig className="size-3.5" />
            Mark Resolved
          </Button>
          <Button variant="ghost" className="size-8 rounded-full text-slate-400 hover:bg-slate-100">
            <MoreVertical className="size-4" />
          </Button>
        </div>
      </header>

      {/* Messages Feed Layer Container */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 text-center text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Today, October 24
          </div>

          <div className="space-y-5">
            {messages.map((message) => {
              const isAdmin = message.author === "admin";

              return (
                <div key={message.id} className={cn("flex gap-3", isAdmin ? "justify-end" : "justify-start")}>
                  {!isAdmin ? (
                    <span className="mt-7 flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-amber-300">
                      LU
                    </span>
                  ) : null}

                  <div className={cn("max-w-155", isAdmin && "ml-auto")}>
                    <div
                      className={cn(
                        "rounded-lg border px-4 py-3 text-xs leading-5 shadow-sm",
                        isAdmin
                          ? "border-primary bg-primary text-white"
                          : "border-slate-200 bg-white text-slate-800",
                      )}
                    >
                      <p>{message.body}</p>
                      {message.attachment ? (
                        <div className="mt-3 flex items-center justify-between gap-3 rounded border border-slate-200 bg-slate-50 p-3 text-slate-700">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex size-9 items-center justify-center rounded bg-cyan-100 text-cyan-600">
                              <Paperclip className="size-4" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-semibold">{message.attachment.name}</p>
                              <p className="text-[10px] text-slate-400">{message.attachment.meta}</p>
                            </div>
                          </div>
                          <Download className="size-4 shrink-0 text-primary" />
                        </div>
                      ) : null}
                      <p className={cn("mt-2 text-right text-[9px]", isAdmin ? "text-white/70" : "text-slate-400")}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Typing Indicator Node */}
          <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            <span className="flex gap-1">
              <span className="size-1 rounded-full bg-slate-400" />
              <span className="size-1 rounded-full bg-slate-400" />
              <span className="size-1 rounded-full bg-slate-400" />
            </span>
            Provider is typing...
          </div>
        </div>
      </div>

      {/* --- Optimized Footer Fix Layout --- */}
      <footer className="border-t border-border bg-white px-5 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
          <Button variant="ghost" className="size-8 rounded-full text-slate-400 hover:bg-white shrink-0">
            <Paperclip className="size-4" />
          </Button>
          <Button variant="ghost" className="size-8 rounded-full text-slate-400 hover:bg-white shrink-0">
            <Smile className="size-4" />
          </Button>
          
          {/* Using direct semantic clean input node to prevent extra wrapper padding clipping */}
          <input
            type="text"
            placeholder={inputPlaceholder}
            className="h-8 flex-1 bg-transparent px-2 text-[11px] text-slate-900 outline-none placeholder:text-slate-400 border-0 focus:ring-0 focus:outline-none min-w-0"
          />
          
          <Button className="h-8 px-4 text-[11px] shrink-0 gap-1.5">
            <span>Send</span>
            <SendHorizontal className="size-3.5" />
          </Button>
        </div>
      </footer>
    </section>
  );
}