export type SupportChatAudience = "provider" | "user";

export type SupportChatThread = {
  id: string;
  name: string;
  subtitle: string;
  preview: string;
  time: string;
  avatarLabel: string;
  avatarTone: string;
  unread?: number;
  active?: boolean;
};

export type SupportChatMessage = {
  id: string;
  author: "contact" | "admin";
  body: string;
  time: string;
  attachment?: {
    name: string;
    meta: string;
  };
};

export type SupportChatData = {
  activeCount: number;
  headerTitle: string;
  headerStatus: string;
  inputPlaceholder: string;
  threads: SupportChatThread[];
  messages: SupportChatMessage[];
};

const providerThreads: SupportChatThread[] = [
  {
    id: "luxe-unboxed",
    name: "Luxe Unboxed",
    subtitle: "Live attached the new listing...",
    preview: "LISTING ID: 84402",
    time: "2h ago",
    avatarLabel: "LU",
    avatarTone: "bg-amber-100 text-amber-700",
    active: true,
  },
  {
    id: "green-tech",
    name: "Green Tech Co.",
    subtitle: "Thank you for the update on the payout.",
    preview: "",
    time: "1h ago",
    avatarLabel: "GT",
    avatarTone: "bg-emerald-900 text-emerald-100",
  },
  {
    id: "sky-outfitters",
    name: "Sky Outfitters",
    subtitle: "The delivery has been delayed.",
    preview: "",
    time: "Yesterday",
    avatarLabel: "SO",
    avatarTone: "bg-sky-100 text-sky-700",
    unread: 2,
  },
  {
    id: "metro-decor",
    name: "Metro Decor",
    subtitle: "We are looking to expand our catalog.",
    preview: "",
    time: "3d ago",
    avatarLabel: "MD",
    avatarTone: "bg-slate-200 text-slate-700",
  },
];

const userThreads: SupportChatThread[] = [
  {
    id: "maria-khan",
    name: "Maria Khan",
    subtitle: "I need help with my refund request...",
    preview: "ORDER ID: 10842",
    time: "18m ago",
    avatarLabel: "MK",
    avatarTone: "bg-rose-100 text-rose-700",
    active: true,
  },
  {
    id: "daniel-foster",
    name: "Daniel Foster",
    subtitle: "Can I change the delivery address?",
    preview: "",
    time: "42m ago",
    avatarLabel: "DF",
    avatarTone: "bg-blue-100 text-blue-700",
  },
  {
    id: "amina-yusuf",
    name: "Amina Yusuf",
    subtitle: "The gift card code is not working.",
    preview: "",
    time: "Yesterday",
    avatarLabel: "AY",
    avatarTone: "bg-violet-100 text-violet-700",
    unread: 3,
  },
  {
    id: "owen-lee",
    name: "Owen Lee",
    subtitle: "Thanks, the replacement arrived.",
    preview: "",
    time: "4d ago",
    avatarLabel: "OL",
    avatarTone: "bg-emerald-100 text-emerald-700",
  },
];

export const supportChatMessages: SupportChatMessage[] = [
  {
    id: "msg-1",
    author: "contact",
    body: "Hello Admin, we are trying to upload a new limited edition collection but the CSV uploader keeps returning an 'Invalid Category' error for our 'Artisanal Watches' section. Can you check our permissions?",
    time: "09:42 AM",
  },
  {
    id: "msg-2",
    author: "admin",
    body: "Hi Luxe Unboxed! I'm checking your account configuration now. It looks like the category mapping for 'Artisanal Watches' was recently updated in our backend to 'Premium Accessories'.",
    time: "09:45 AM",
  },
  {
    id: "msg-3",
    author: "contact",
    body: "I see. I've attached the new listing details file with the corrected category labels. Could you manually push this through for us? We have a launch in 2 hours.",
    time: "09:52 AM",
    attachment: {
      name: "Watches_Launch_v2.csv",
      meta: "1.2 MB - CSV Document",
    },
  },
];

export const supportChatData: Record<SupportChatAudience, SupportChatData> = {
  provider: {
    activeCount: 12,
    headerTitle: "Luxe Unboxed Support Ticket",
    headerStatus: "Active Discussion",
    inputPlaceholder: "Type your response to Luxe Unboxed...",
    threads: providerThreads,
    messages: supportChatMessages,
  },
  user: {
    activeCount: 12,
    headerTitle: "Maria Khan Support Ticket",
    headerStatus: "Active Discussion",
    inputPlaceholder: "Type your response to Maria Khan...",
    threads: userThreads,
    messages: supportChatMessages,
  },
};
