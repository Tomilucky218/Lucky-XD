/*
Project Name : LUCKY XD
Creator      : Lucky Tech Hub ( Lucky 218 )
Repo         : https://github.com/luckytechhub/Lucky-XD
Support      : wa.me/256789966218
*/

const config = require('../settings');
const { lucky } = require('../lucky');
const { runtime } = require('../lib/functions');

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

lucky({
    pattern: "support",
    alias: ["follow", "links"],
    desc: "Display support and follow links",
    category: "main",
    react: "📡",
    filename: __filename
}, 
async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const uptimeFormatted = runtime(process.uptime());

        const message = `
╭─『 *LUCKY-XD SUPPORT* 』─
│ 👤 *Developer* : Lucky 218
│ ⚙️ *Mode*      : ${config.MODE}
│ ⏱️ *Uptime*    : ${uptimeFormatted}
│ 💠 *Prefix*    : ${config.PREFIX}
│ 🔖 *Version*   : ${config.version}
│ 🕰️ *Time*      : ${currentTime}
╰─────────────

📢 *Follow & Support LUCKY XD* ${readMore}

🔔 *Official WhatsApp Channel*
🔗 https://whatsapp.com/channel/0029VbAnuvT6RGJ9Qrf3NJ0L

🎬 *YouTube Channel*
🔗 https://youtube.com/@luckytechhub-i9u

👨‍💻 *Developer Contact*
🔗 wa.me/256789966218?text=Hi%20Lucky,%20I%20need%20support!

> 💡 Powered by *Lucky Tech Hub*
        `.trim();

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/4itzeu.jpg' },
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420656466131@newsletter',
                    newsletterName: '🪀『 Lucky XD 』🪀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Support Cmd Error:", e);
        reply(`⚠️ An error occurred:\n${e.message}`);
    }
});