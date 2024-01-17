import { SlashCommandSubcommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandSubcommandBuilder()
        .setName('updater')
        .setDescription('update item in the market to stay on the top')
        .addStringOption(option => 
                option.setName("name")
                    .setDescription("name of the companion")
                    .setRequired(true)
        ),
	async execute(interaction: any) {
		await interaction.reply('Pong!');
	},
};