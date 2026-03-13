import 'dotenv/config';
import { MUSTA_PICS, WINE_PICS, SONGS } from './ddbb.js';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    // const text = await res.text();
    const data = await res.json();
    console.log("status:", res.status);
    // console.log("Respuesta:", text);
    throw new Error(JSON.stringify(data));
    // throw new Error(text);
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['🍺','😎','😤','🍻','🧉','🍹','🍷','🥃','🍸','🍶','🍾','🥂','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function getRandomSong() {
  const INDEX = Math.floor(Math.random() * SONGS.length);
  return `**${SONGS[INDEX][0]}**\n${SONGS[INDEX][1]}`;
}

export function getRandomWine() {
  return WINE_PICS[Math.floor(Math.random() * WINE_PICS.length)]
}

export function getRandomMusta() {
  return MUSTA_PICS[Math.floor(Math.random() * MUSTA_PICS.length)]
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
