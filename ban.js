const { MessageEmbed } = require('discord.js')
module.exports= {
  kod: "ban",
  async run (client, message, args) {
    if (!message.guild) return message.reply("Burası sunucu değil ki")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bunu senin yapmana yetkin yok')
    const args1 = message.content.split(' ').slice(2).join(' ')
    if (args1.length < 1) return message.reply('Bir sebep gir hadi')
      const user = message.mentions.users.first();
      if (!user) return message.reply('E hadi birisi etiketle')
      if (user) {
        const member = message.guild.member(user);
        if (!member) return message.reply("Birisini etiketlemedin alooo")
        if (member) {
          member
            .ban({reason: args1})
            .then(x => {
              const embed = new MessageEmbed()
              .setTitle('BAŞARILI')
              .setColor('GREEN')
              .setTimestamp()
              .addField("Banlanan kişi ve ID'si", `${user.tag}   ` + `ID:  ${user.id}`)
              .addField("Banlayan kişi ve ID'si", `${message.author}   ` + `ID:  ${message.author.id}`)
              .addField('Sebebi', args1, true)
              message.channel.send(embed)
            })
            .catch(err => {
              const embed = new MessageEmbed()
              .setTitle('BAŞARISIZ')
              .setColor('RED')
              .setTimestamp()
              .addField('Sebebi', "Bunu Banlayamıyorum")
              message.channel.send(embed)

            });
        }
    }
  }
}
