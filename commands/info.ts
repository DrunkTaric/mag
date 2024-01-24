import { SlashCommandSubcommandBuilder } from "discord.js";

module.exports = {
    meta: {
        name: "info",
        description: "info about item"
    },
    data: new SlashCommandSubcommandBuilder()
        .setName('info')
        .setDescription('info about item')
        .addStringOption(option =>
                option.setName("type")
                    .setDescription("type of item")
                    .setRequired(true)
                    .addChoices(
                        { name: "melee", value: "melee" },
                        { name: "primary", value: "primary" },
                        { name: "secondary", value: "secondary" },
                        { name: "mod", value: "mod" },
                        { name: "arcane", value: "arcane" },
                        { name: "warframe", value: "warframe" },
                        { name: "relic", value: "relic" },
                    )
        ),
    async execute(interaction: any) {
        await interaction.reply(interaction.options.getString("type"));
    }
}