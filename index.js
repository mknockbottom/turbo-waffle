const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Fortnite = require("fortnite");
const ft = new Fortnite("7b0f47dd-fd6f-471c-92fa-23a861bc5e43");

const bot = new Discord.Client({disableEveryone: true});
//On-Off Text
bot.on("error", e => console.log(e));
bot.on("ready", async () =>{
  console.log(`${bot.user.username} is online! Setting up webserver, status...`);
  console.log(`Process Finished!`)
  console.log(`Fort-Bot v1.3.2`)
  console.log(`If any errors are found, contact Commander Microsoft#2837`)
  bot.user.setActivity("!cmd", {type: "STREAMING"});


  bot.user.setStatus("away");
});
//Actual Commands

//Bot Config.
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //!cmd command
  if(cmd === `${prefix}cmd`){
    
    let cmd = new Discord.RichEmbed()
    .setDescription("Commands")
    .setColor("#4cd82f")
    .addField("Information Commands", '!botinfo, !serverstats')
    .addField("Clan Info", '!clan')
    .addField("Useless Commands", '!tellmeajoke')
    .addField("Fortnite Tracking", '!track')

    return message.channel.send(cmd);
  }

  //!track command
  if(cmd === `${prefix}track`){
    return message.channel.send("Unfortunately tracking is unable right now. This is being caused by the API and a fix is in the works! In the meantime, please use https://fortnitetracker.com")
  }
  //!serverstats command
  if(cmd === `${prefix}serverstats`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Statistics")
    .setColor("#4cd82f")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("Member Count", message.guild.memberCount)

    return message.channel.send(serverembed);
  }

  //!botinfo command
  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#4cd82f")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Bot Creation Time", bot.user.createdAt)
    .addField("Bot Version", 'v1.3.2')
    .addField("Troubleshooting", 'Contact Developer (Commander Microsoft#2837)')
    return message.channel.send(botembed);
  }

  //!clan command
  if(cmd === `${prefix}clan`){

    let sicon = message.guild.iconURL;
    let clanembed = new Discord.RichEmbed()
    .setDescription("Clan Information")
    .setColor("#07b3de") 
    .setThumbnail(sicon)
    .addField("How to join:", 'Contact Commander, Lunkman, or joshlugo')
    .addField("Why should you join:", 'Because we are really good.')
    .addField("Current Events:", 'None')
    .addField("Upcoming Events:", 'None')
    return message.channel.send(clanembed);
  }
  //fortnite
  module.exports.run = async (bot, message, args) => {

    //!fortnite username platform
    let username = args[0];
    let platform = args[1] || "pc";

    let data = ft.getInfo(username, platform).then(data => {

        let stats = data.lifetimeStats;
        let kills = stats.find(s => s.stat == 'kills');
        let wins = stats.find(s => s.stat == 'wins');
        let kd = stats.find(s => s.stat == 'kd');
        let mPlayed = stats.find(s => s.stat == 'matchesPlayed');
        let tPlayed = stats.find(s => s.stat == 'timePlayed');
        let asTime = stats.find(s => s.stat == 'avgSurivialTime');

        if (cmd === `${prefix}track`){

        let fortnite1 = new Discord.RichEmbed()
        .setTitle("Fortnite Stats")
        .setAuthor(data.username)
        .setColor("#07b3de")
        .addField("Kills", kills.value, true)
        .addField("Wins", wins.value, true)
        .addField("KD", kd.value, true)
        .addField("Matches Played", mPlayed.value, true)
        .addField("Time Played", tPlayed.value, true)
        .addField("Average Survival Time", asTime.value, true);
        
        message.channel.send(fortnite1);
        }

    }).catch(e => {
        console.log(e)
        message.channel.send("Database Error - Couldn't find username.");
    });

}

module.exports.help = {
    name: fortnite
}


});

bot.login(botconfig.token);
