export interface DiscordLog {
  guild: Guild;
  channel: Channel;
  dateRange: DateRange;
  messages: Message[];
}

export interface Channel {
  id: string;
  type: string;
  categoryId: string;
  category: string;
  name: string;
  topic: null;
}

export interface DateRange {
  after: null;
  before: null;
}

export interface Guild {
  id: string;
  name: string;
  iconUrl: string;
}

export interface Message {
  id: string;
  type: string;
  timestamp: string;
  timestampEdited: null;
  callEndedTimestamp: null;
  isPinned: boolean;
  content: string;
  author: Author;
  embeds: Embed[];
  attachments: Attachment[];
}

export interface Embed {
  title: string;
  url: string;
  timestamp: string;
  description: string;
}

export interface Attachment {
  id: string;
  url: string;
  fileName: string;
}

export interface Author {
  id: string;
  name: string;
  discriminator: string;
  nickname: string;
  color: null;
  isBot: boolean;
  avatarUrl: string;
}
