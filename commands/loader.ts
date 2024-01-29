import { Client, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes, SlashCommandBuilder } from "discord.js";
import { File, MetaData } from "../types";
import path from "path";
import fs from "fs";

function structureCommand(meta: MetaData, commands: any[] | any): RESTPostAPIChatInputApplicationCommandsJSONBody {

    let  command = new SlashCommandBuilder()
    command.setName(meta.name)
    command.setDescription(meta.description)
	if (commands instanceof Array) {
		for (const option of commands) {
			command.addSubcommand(option.data)
		}	
		return command.toJSON()
	}

	command = commands.data
	return command.toJSON()
}

async function PullFiles() {
	let files: {[key: string]: File} = {}
	const foldersPath = path.join(__dirname);
	const commandFolders = fs.readdirSync(foldersPath);
	commandFolders.splice(commandFolders.indexOf('loader.ts'), 1)
	
	for (const folder of commandFolders) {
		const filesPath = path.join(foldersPath, folder);

		if (!fs.existsSync(filesPath)) continue
		if (!fs.statSync(filesPath).isDirectory()) {
			const file = require(filesPath);
			files[file.meta.name] = { metadata: file.meta, command: file, callbacks: [] }
			continue 
		}
		
		const commandFiles = fs.readdirSync(filesPath).filter(file => file.endsWith('.ts'));
		const meta_data = require(path.join(filesPath, 'meta.json'));

		if (files[folder] == undefined) files[folder] = { metadata: meta_data, commands: [], callbacks: [] }	

		for (const file of commandFiles) {
			const filePath = path.join(filesPath, file);
			files[folder].commands?.push(require(filePath))
		}
	}

	return files
}

export async function getCommands() {
	let files = await PullFiles()
	let commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

	for (const [key, value] of Object.entries(files)) {
		if (value.commands == undefined) {
			commands.push(structureCommand(value.metadata, value.command))
			continue
		}
		commands.push(structureCommand(value.metadata, value.commands))
	}

	return commands
}

export async function getCallbacks() {
	let files = await PullFiles()
	let callbacks: { [key: string]: { name: string, callback: any } | { name: string, callback: any }[]} = {};

	for (const [key, value] of Object.entries(files)) {
		if (callbacks[key] == undefined) callbacks[key] = []
		
		if (value.commands == undefined) {
			callbacks[key] = {
				name: value.metadata.name,
				callback: value.command.execute
			}
			continue
		}
		for (const command of value.commands) {
			(callbacks[key] as { name: string, callback: any }[]).push({
				name: command.data.name,
				callback: command.execute
			})
		}
	}

	return callbacks
}

export async function registerCommands() {
	const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN || "");
	try {
		console.log("Starting Registering commands...")
		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID || "",
				process.env.GUILD_ID || "",
			),
			{ body: await getCommands() }
		)
		console.log("Finished Registering commands...")
	}catch (error) {
		console.error(error)
	}
}

export async function handleCommmands(client: Client) {
	const callbacks = await getCallbacks()

	client.on('interactionCreate', async interaction => {
		if (!interaction.isChatInputCommand()) return;
		if (callbacks[interaction.commandName] == undefined) return;

		let subcommand = null

		try {
			subcommand = interaction.options.getSubcommand()
		}catch (error) {
			subcommand = null
		}

		console.log(subcommand)
		if (callbacks[interaction.commandName] instanceof Array) {
			for (const callback of callbacks[interaction.commandName] as Array<{ name: string, callback: any }>) {
				if (subcommand == callback.name) {
					await callback.callback(interaction)
				}
			}
			return
		}
		await (callbacks[interaction.commandName] as { name: string, callback: any }).callback(interaction)
	})
}