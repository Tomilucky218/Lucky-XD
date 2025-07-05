const { lucky, commands } = require('../lucky');
const { fetchJson } = require('../lib/functions');

lucky({
    pattern: "fetch",
    alias: ["get", "api"],
    desc: "Fetch data from a provided URL or API",
    category: "main",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        const q = args.join(' ').trim(); // Extract the URL or API query
        if (!q) return reply('❌ Please provide a valid URL or query.');

        if (!/^https?:\/\//.test(q)) return reply('❌ URL must start with http:// or https://.');

        const data = await fetchJson(q); // Use your fetchJson utility function to get data
        const content = JSON.stringify(data, null, 2);

        await conn.sendMessage(from, {
            text: `🔍 *Fetched Data*:\n\`\`\`${content.slice(0, 2048)}\`\`\``,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardingSourceMessage: 'Your Data Request',
            }
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in fetch command:", e);
        reply(`❌ An error occurred:\n${e.message}`);
    }
});