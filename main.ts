import 'dotenv/config';
import fs from 'fs';
import discord_log from './discord_log.json';
import { DiscordLog } from './types';

const MIN_DATE = process.env.MIN_DATE as string; // ISO date, ie 2020-01-01

export const main = async () => {
  const discordLog = discord_log as DiscordLog;

  const minimumDate = new Date(MIN_DATE).toISOString();
  const filteredMessages = discordLog.messages.filter(
    (message) => message.timestamp > minimumDate
  );
  console.log(`Exporting ${filteredMessages.length} messages.`);

  const mappedMessages = discordLog.messages.map((message) => ({
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
