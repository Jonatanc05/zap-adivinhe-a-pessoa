const config = require("../../../config.json")

module.exports = async (client, message) => {

    if (message.author.bot || message.channel.type === "dm") return

    const prefix = config.prefix

    const args = message.content.slice(prefix.length).trim();
    const cmd = args.toLowerCase()

    console.log(args);
    if(!message.content.startsWith(prefix)) 
        return;

    let cmdfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))

    if(cmdfile) {
        try {
            cmdfile.run(client, message, args)
        } catch(error) {
            console.log(error)
        }
    }

}