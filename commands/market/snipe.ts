import { SlashCommandSubcommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandSubcommandBuilder()
        .setName('snipe')
        .setDescription('snipe item from market with price of your choice')
        .addStringOption(option => 
                option.setName("name")
                    .setDescription("name of the item")
                    .setRequired(true)
        )
        .addIntegerOption(option =>
                option.setName("price")
                    .setDescription("price of the item")
                    .setRequired(true)
        ),
	async execute(interaction: any) {
		await interaction.reply('Pong!');
	},
};