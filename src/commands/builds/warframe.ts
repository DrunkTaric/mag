import { SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
        .setName('warframe')
        .setDescription('get warframe builds')
        .addStringOption(option => 
            option.setName("name")
                .setDescription("Name of the warframe")
                .setRequired(true)
        ),
	async execute(interaction: any) {
		await interaction.reply('Pong!');
	},
};