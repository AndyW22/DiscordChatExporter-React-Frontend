export interface Message {
  id: string;
  timestamp: string;
  content: string;
  author: Author;
  embeds: Embed[];
  attachments: Attachment[];
}

export interface Embed {
  url: string;
  title: string;
  timestamp: string;
}

export interface Attachment {
  url: string;
}

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
}
