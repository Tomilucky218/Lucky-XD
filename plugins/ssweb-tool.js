// code by ⿻ ⌜ LUCKY 218 ⌟⿻⃮͛

const axios = require("axios");
const config = require('../settings');
const { lucky } = require('../lucky');

lucky({
  pattern: "ss",
  alias: ["ssweb", "screenshot"],
  react: "💫",
  desc: "Take a screenshot of a website.",
  category: "other",
  use: ".ss <url>",
  filename: __filename
}, 
async (conn, mek, m, {
  from, q, reply
}) => {
  if (!q) {
    return reply("🌐 Please provide a valid link to screenshot.\n\n📌 Example: `.ss https://example.com`");
  }

  if (!/^https?:\/\//i.test(q)) {
    return reply("❗ Please make sure your link starts with `http://` or `https://`");
  }

  try {
    const apiUrl = `https://api.davidcyriltech.my.id/ssweb?url=${encodeURIComponent(q)}`;
    const res = await axios.get(apiUrl);

    if (!res.data || !res.data.screenshotUrl) {
      return reply("⚠️ Couldn't capture screenshot. Try another link.");
    }

    const imageMessage = {
      image: { url: res.data.screenshotUrl },
      caption: `🖼️ *Web Screenshot Generated*\n\n🔗 *URL:* ${q}\n\n© Powered by *Lucky Tech Hub*`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363420656466131@newsletter',
          newsletterName: "Lucky XD",
          serverMessageId: 143
        }
      }
    };

    await conn.sendMessage(from, imageMessage, { quoted: m });

  } catch (err) {
    console.error("Screenshot Error:", err);
    reply("❌ Failed to take screenshot. Try again later.");
  }
});