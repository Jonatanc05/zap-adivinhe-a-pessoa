if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. You need to update your Node.js to the required release, or a newer one.");

const { Client, Collection } = require("discord.js")
const client = new Client()

const fs = require('fs')

const config = require("../config.json")

client.commands = new Collection()
client.aliases = new Collection()

let array = ["aliases", "commands"]
array.forEach(x => (client[x] = new Collection()))

require(`./handlers/command`)(client)
require(`./handlers/event`)(client)

client.login(config.token)