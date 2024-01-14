import 'dotenv/config'
import { REST, Routes, TextChannel } from 'discord.js'
import { LoadEvents, getCommands } from './loader'
import { createClient } from '@supabase/supabase-js'
import { Client, GatewayIntentBits } from 'discord.js';

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

client.once('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
	await LoadEvents(client.channels.cache.get(process.env.CHANNEL_ID || "") as TextChannel | undefined); 
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }

	if (interaction.commandName === 'build') {
		await interaction.reply(await interaction.options.get('name')?.value as string);
	  }
});

client.on("messageCreate", message => {
	//console.log(message.content)
})

async function main() {
	try {
		console.log("Starting Registering commands...")
		console.log(getCommands())
		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID || "",
				process.env.GUILD_ID || "",
			),
			{ body: getCommands() }
		)
		console.log("Finished Registering commands...")
	}catch (error) {
		console.error(error)
	}
	client.login(process.env.BOT_TOKEN);
}

main()