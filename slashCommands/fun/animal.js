const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'animal',
	description: "Une commande de test pour afficher la commande de barre oblique de saisie semi-automatique.",
	type: ApplicationCommandType.ChatInput,
	options: [
        {
            name: 'animal',
            description: 'Choisissez un animal.',
            type: 3,
            required: true,
            autocomplete: true
        }
    ],
    autocomplete: (interaction, choices) => {
        const data = {
            '908385923673231481': ['dog', 'cat', 'rabbit'],
            '967751631695405097': ['lizard', 'horse', 'hamster']
        }
        data[interaction.guild.id].forEach(animal => {
            choices.push({
                name: `${animal}`,
                value: `${animal}`
            });
        });
        interaction.respond(choices).catch(console.error);
    },
	run: async (client, interaction) => {
        const animal = interaction.options.get('animal').value;
        if(animal) interaction.reply({ content: `${interaction.user}, Vous choisissez **${animal}**!` });
	}
};