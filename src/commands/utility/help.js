const config = require("../../../config.json")

const {MessageEmbed} = require("discord.js")

module.exports = { 
    name: "Help",
    description: "Mostra uma lista com todos os comandos", 
    usage: "help [command]", 
    command: "help",
    accessible: "Membros", 
    category: "Utilidade", 
run: async (client, message, args) => {

    if(!args[0]) {
        const prefix = config.prefix

        let embed = new MessageEmbed()
        .setTitle(`Lista de comandos (${client.commands.size})`)
        .setColor(`0x7289da`)
        .setFooter(`Escreva ${prefix}help (comando) para mais informações`)
        
        client.commands.forEach(comando => {
                embed.addField(comando.name, comando.description);
        });

        return message.channel.send(embed)
    }

    if(args[0]) {
        let usercmd = args.join(" ").toLowerCase()
        let cmd = client.commands.find(c => c.name.toLowerCase() === usercmd)

        if(!cmd) {
            let embed = new MessageEmbed()
            .setTitle(`Erro!`)
            .setDescription(`**ERRO:** O Comando ${usercmd} não existe!\nEscreva \`${prefix}help\` para uma lista de comandos existentes!`)
            .setColor(`0x7289da`)

            return message.channel.send(embed)
        }

        let embed = new MessageEmbed()
        .setTitle(`Informação para o comando ${cmd.name}`)
        .addField(`Nome`, cmd.name)
        .addField(`Descrição`, cmd.description)
        .addField(`Uso`, `${config.prefix}${cmd.usage}`)
        .addField(`Acessível para`, cmd.accessible)
        .addField(`Outros usos`, `${cmd.aliases ? cmd.aliases.join(", ") : "Nenhum"}`) 
        .setColor(`0x7289da`)
        .setFooter(`No campo de uso, argumentos entre parenteses são obrigatórios, e argumentos entra colchetes são opcionais`)
        return message.channel.send(embed)
    }
}
}