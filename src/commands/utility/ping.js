module.exports = {
    name: "Ping",
    description: "Mostra latência",
    usage: "ping",
    command: "ping",
    accessible: "Membros",
    category: "Utilidade",
    run: async (client, message) => {
        message.channel.send(`Latência do comando: **${new Date().getTime() - message.createdTimestamp} ms**\nLatência da API: **${client.ws.ping} ms**`)
    }
}