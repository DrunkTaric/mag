import fs from "node:fs"
import path from "node:path"
import { makeRotations } from "./events/Rotations/loader";
import { EmbedBuilder, RESTPostAPIChatInputApplicationCommandsJSONBody, TextChannel } from "discord.js";


export function getCommands() {
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);
	let commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
				console.log(`Registered command /${command.data.name}`);
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

	return commands
}

function getEvents() {
	const foldersPath = path.join(__dirname, 'events');
	const eventsFiles = fs.readdirSync(foldersPath);
	let events: { [key: string]: EmbedBuilder[] } = {};
	for (const folder of eventsFiles) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		events[folder] = []
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			events[folder].push(require(filePath));
		}
	}
	return events
}


export async function LoadEvents(channel: TextChannel | undefined) {
	let events = getEvents();
	for (let message of await channel?.messages.fetch() || []) {
		message[1].delete()	
	}
	await makeRotations(channel)
}