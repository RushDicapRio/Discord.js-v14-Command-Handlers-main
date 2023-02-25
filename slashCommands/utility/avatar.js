const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: "Afficher l'avatar de l'utilisateur",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'user',
            description: "L'avatar de l'utilisateur que vous souhaitez afficher.",
            type: ApplicationCommandOptionType.User
        }
    ],
	run: async (client, interaction) => {
        const user = interaction.options.get('user')?.user || interaction.user;

        const embed = new EmbedBuilder()
        .setTitle(`${user.tag} avatar`)
        .setImage(user.displayAvatarURL({ size: 4096 }))
        .setColor('Red')
        .setTimestamp();

        const formats = ['png', 'jpg', 'jpeg', 'gif'];
        const components = [];
        formats.forEach(format => {
            let imageOptions = { extension: format, forceStatic: format == 'gif' ? false : true };

            if (user.avatar == null && format !== 'png') return; 
            if (!user.avatar.startsWith('a_') && format === 'gif') return;
            components.push(
                new ButtonBuilder()
                .setLabel(format.toUpperCase())
                .setStyle('Link')
                .setURL(user.displayAvatarURL(imageOptions))
            )
        })

        const row = new ActionRowBuilder()
        .addComponents(components);

		return interaction.reply({ embeds: [embed], components: [row] })
	}
};