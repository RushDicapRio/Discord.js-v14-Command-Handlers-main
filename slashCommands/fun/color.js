const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'color',
	description: "Choisir une couleur !",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
        /** Obtenez les boutons
         * @param {Boolean} toggle - Basculer les boutons de désactivation
         * @param {string} [choice = null] choice - L'utilisateur de la couleur a choisi
         */
        const getButtons = (toggle = false, choice) => {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                        .setLabel('Vert')
                        .setCustomId('green')
                        .setStyle(toggle == true && choice == 'green' ? 'Secondary' : 'Success')
                        .setDisabled(toggle),
    
                    new ButtonBuilder()
                        .setLabel('Rouge')
                        .setCustomId('red')
                        .setStyle(toggle == true && choice == 'red' ? 'Secondary' : 'Danger')
                        .setDisabled(toggle),
    
                    new ButtonBuilder()
                        .setLabel('Bleu')
                        .setCustomId('blue')
                        .setStyle(toggle == true && choice == 'blue' ? 'Secondary' : 'Primary')
                        .setDisabled(toggle),
    
                    new ButtonBuilder()
                        .setLabel(toggle == true && choice == 'exit' ? 'Quitté' : 'Quit')
                        .setEmoji(toggle == true && choice == 'exit' ? '✅' : '❌')
                        .setCustomId('exit')
                        .setStyle(toggle == true && choice == 'exit' ? 'Danger' : 'Secondary')
                        .setDisabled(toggle)
            );

            return row;
        }

        const embed = new EmbedBuilder()
        .setTitle('Choisir une couleur')
        .setDescription('Choisissez vert, rouge ou bleu.\nSi vous ne voulez pas choisir, appuyez sur quit.')
        .setColor('Aqua')
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

        interaction.reply({ embeds: [embed], components: [getButtons()] })
        .then((m) => {
            const collector = m.createMessageComponentCollector({ time: 15000 });

            collector.on('collect', async (i) => {
                if (!i.isButton()) return;

                await i.deferUpdate();
                if (i.user.id !== interaction.user.id) return i.followUp({ content: `Ces boutons ne sont pas pour vous !`, ephemeral: true });

                m.interaction.editReply({ components: [getButtons(true, i.customId)] })
                if(i.customId === 'exit') return collector.stop();

                return i.followUp(`${i.user}, Vous choisissez **${i.customId.charAt(0).toUpperCase() + i.customId.slice(1)} :${i.customId}_circle:**!`);
            });
            
            collector.on('end', (collected, reason) => {
                if (reason === 'user') {
                    return interaction.followUp({ content: 'Fini le collectionneur.', ephemeral: true });
                }
                if(reason === 'time') {
                    return;
                }
            });
        });
	}
};