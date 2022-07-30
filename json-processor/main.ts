import 'dotenv/config';
import fs from 'fs';
import discord_log from './discord_log.json';
import { DiscordLog, Message } from './types';

const START_DATE = process.env.MIN_DATE; // ISO date, ie 2020-01-01
const START_ID = process.env.START_ID; // start ID, ie 667685634015055863

export const main = async () => {
  const discordLog = discord_log as DiscordLog;
  let currentMessages: Message[] = discordLog.messages;
  if (START_DATE) {
    const minimumDate = new Date(START_DATE).toISOString();
    const filteredMessages = discordLog.messages.filter(
      (message) => message.timestamp > minimumDate
    );
    currentMessages = filteredMessages;
  }
  if (START_ID) {
    const startIdIndex = currentMessages.findIndex(
      (message) => message.id === START_ID
    );
    currentMessages = currentMessages.slice(startIdIndex);
  }
  console.log(`Exporting ${currentMessages.length} messages.`);

  const mappedMessages = currentMessages.map((message) => ({
    id: message.id,
    timestamp: message.timestamp,
    content: message.content,
    author: {
      id: message.author.id,
      avatarUrl: message.author.avatarUrl,
      name: message.author.name,
    },
    embeds:
      message.embeds.map((item) => ({
        url: item.url,
        title: item.title,
        timestamp: item.timestamp,
      })) ?? [],
    attachments:
      message.attachments.map((item) => ({
        url: item.url,
      })) ?? [],
  }));
  const exportedJson = JSON.stringify(mappedMessages);
  fs.writeFile('exportedMessages.json', exportedJson, () =>
    console.log('done')
  );
};

main();
