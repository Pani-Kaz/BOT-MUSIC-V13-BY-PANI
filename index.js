

const Discord = require("discord.js");
const Client = require('discord.js')
const client = new Discord.Client({intents: 32767,});
const config = require("./config.json")
const creditos = require("./CREDITS.json")
const db = require("quick.db")
const mysql = require('mysql'); 
module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
client.login(client.config.token);
const player = require("./client/player");

 var pausar = new Discord.MessageButton().setCustomId("p").setLabel("Pausar").setStyle("DANGER")
var despausar = new Discord.MessageButton().setCustomId("dp").setLabel("Despausar").setStyle("SUCCESS")
var skip = new Discord.MessageButton().setCustomId("s").setLabel("Skip").setStyle("SUCCESS")
var Queue = new Discord.MessageButton().setCustomId("q").setLabel("Queue").setStyle("SUCCESS")


