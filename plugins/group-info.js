const config = require('../settings')
const { lucky, commands } = require('../lucky')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

lucky({
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group informations.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/luckytechhub/LUCKY-DATA/refs/heads/main/MSG/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
const ppUrls = [
        'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
        'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
        'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
      ];
let ppUrl = await conn.profilePictureUrl( from , 'image')
if (!ppUrl) { ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];}
const metadata = await conn.groupMetadata(from)
const groupAdmins = participants.filter(p => p.admin);
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
const owner = metadata.owner

const gdata = `*「 Group Information 」*\n
\t*${metadata.subject}*

*Group Jid* - ${metadata.id}
*Participant Count* - ${metadata.size}
*Group Creator* - ${owner.split('@')[0]}
*Group Description* - ${metadata.desc?.toString() || 'undefined'}\n
*Group Admins* - \n${listAdmin}\n`

await conn.sendMessage(from,{image:{url: ppUrl },caption: gdata },{quoted:mek })
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )