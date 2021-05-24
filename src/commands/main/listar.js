const zapMessages = require("../../services/zap-messages")

const authors = Array.from(new Set(zapMessages.map((zapMsg) => zapMsg.author))).sort()
const msg = `AUTORES:\n${authors.join(", ")}`

module.exports = { 
    name: "Listar",
    description: "Lista autores das mensagens do Zap", 
    usage: "list", 
    command: "list",
    accessible: "Membros", 
    category: "Utilidade", 
run: async (client, message, args) => {
    message.channel.send(msg)
}
}