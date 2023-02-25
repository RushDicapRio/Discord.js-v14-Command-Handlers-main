module.exports = {
	name: 'ping',
	description: "Vérifiez le ping du bot.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		const msg = await message.reply('Ping en cours...')
		await msg.edit(`Pong ! **${client.ws.ping} ms**`)
	}
};