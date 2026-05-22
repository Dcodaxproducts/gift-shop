import { ChatConversation } from "@/components/pages/support-chat/components/chat-conversation";
import { ChatSidebar } from "@/components/pages/support-chat/components/chat-sidebar";
import { supportChatData, type SupportChatAudience } from "@/constants/support-chat";

type SupportChatPageProps = {
  audience: SupportChatAudience;
};

export function SupportChatPage({ audience }: SupportChatPageProps) {
  const chat = supportChatData[audience];

  return (
    <div className="h-[calc(100vh-112px)] min-h-155 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex h-full flex-col lg:flex-row">
        <ChatSidebar activeCount={chat.activeCount} threads={chat.threads} />
        <ChatConversation
          headerTitle={chat.headerTitle}
          headerStatus={chat.headerStatus}
          inputPlaceholder={chat.inputPlaceholder}
          messages={chat.messages}
        />
      </div>
    </div>
  );
}
