import 'dotenv/config'
import { TextChannel } from 'discord.js'
import { LoadEvents } from './events/loader'
import { handleCommmands, registerCommands } from './commands/loader'
import { createClient } from '@supabase/supabase-js'
import { Client, GatewayIntentBits } from 'discord.js';
import { clearChannel } from './utils'

if (!process.env.BOT_TOKEN) { throw new Error('Missing BOT_TOKEN in .env') }
if (!process.env.SUPABASE_URL) { throw new Error('Missing SUPABASE_URL in .env') }
if (!process.env.SUPABASE_ANON) { throw new Error('Missing SUPABASE_ANON in .env') }

const rest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON)
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.MessageContent
]});

client.on('ready', async () => {
	console.log(`Logged in as ${client.user?.tag}!`);
	handleCommmands(client)
	await clearChannel(client.channels.cache.get(process.env.CHANNEL_ID || "") as TextChannel | undefined);
	await LoadEvents(client.channels.cache.get(process.env.CHANNEL_ID || "") as TextChannel | undefined); 
});

async function main() {
	await registerCommands()
	await client.login(process.env.BOT_TOKEN);
}

main()