const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Logged as ' + client.user.tag);
});

client.on('message', (msg) => {
	if (msg.content === 'ping') {
		msg.reply('pong');
	}
});

try {
	client.login(fs.readFileSync('token.txt', {encoding: 'utf-8'}));
} catch (e) {
	console.log("Por favor, crie o arquivo 'token.txt' com o token do bot");
}
