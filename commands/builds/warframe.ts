import { SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
        .setName('build')
        .setDescription('get warframe builds')
        .addStringOption(option => 
            option.setName("type")
                .setDescription("type of the item (weapon, warframe)")
                .setChoices({name: "warframe", value: "warframe"}, {name: "weapon", value: "weapon"})
                .setRequired(true)
        )
        .addStringOption(option => 
                option.setName("name")
                    .setDescription("name of the item")
                    .setRequired(true)
        ),
	async execute(interaction: any) {
		await interaction.reply('Pong!');
	},
};