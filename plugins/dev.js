const { lucky, commands } = require('../lucky');

lucky({
    pattern: "owner",
    alias: ["developer", "dev"],
    desc: "Displays the developer info",
    category: "owner",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const name = pushname || "there";

        const caption = `
╭─⌈ *👨‍💻 Lucky XD Developer* ⌋─
│
│ 👋 Hello, *${name}*!
│
│ 🤖 I'm *Lucky 218*, the creator and
│    maintainer of this smart WhatsApp bot.
│
│ 👨‍💻 *ᴏᴡɴᴇʀ ɪɴꜰᴏ:*
│ ──────────
│ 🧠 *Name:* Lucky 218
│ 🎂 *Age:* +20
│ 📞 *Contact:* wa.me/256789966218
│ 📺 *YouTube:* Lucky Tech Hub
│     https://youtube.com/@luckytechhub-i9u
│
╰─────────

>⚡ Powered By Lucky Tech Hub
        `.trim();

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/4itzeu.jpg' },
                caption: caption,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420656466131@newsletter',
                        newsletterName: '🪀『 Lucky-XD 』🪀',
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: "Lucky-XD Bot",
                        body: "Created with ❤️ by Lucky 218",
                        thumbnailUrl: 'https://files.catbox.moe/4itzeu.jpg',
                        mediaType: 1,
                        renderSmallerThumbnail: true,
                        showAdAttribution: true,
                        mediaUrl: "https://youtube.com/@luckytechhub-i9u",
                        sourceUrl: "https://youtube.com/@luckytechhub-i9u"
                    }
                }
            },
            { quoted: mek }
        );
    } catch (e) {
        console.error("Error in .dev command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});