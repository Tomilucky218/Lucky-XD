const axios = require("axios");
const { lucky } = require("../lucky");

lucky({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  args,
  q,
  reply
}) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "*`Need URL`*" }, { quoted: m });
    }

    await conn.sendMessage(from, {
      react: { text: '⏳', key: m.key }
    });

    const fbData = await facebook(q);
    
    const caption = `╭━━━〔 *Lucky-XD FB DL* 〕━━━⊷\n`
      + `┃▸ *Dᴜʀᴀᴛɪᴏɴ*: ${fbData.result.duration}\n`
      + `╰━━━⪼\n\n`
      + `🌐 *Download Options:*\n`
      + `1️⃣  *SD Qᴜᴀʟɪᴛʏ*\n`
      + `2️⃣  *HD Quᴀʟɪᴛʏ*\n`
      + `🎵 *Audio Options:*\n`
      + `3️⃣  *Aᴜᴅɪᴏ*\n`
      + `4️⃣  *Doᴄᴜᴍᴇɴᴛ*\n`
      + `5️⃣  *Vᴏɪᴄᴇ*\n\n`
      + `↪️ *Reply with the number to download your choice.*`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: fbData.result.thumbnail },
      caption: caption
    }, { quoted: m });

    const messageID = sentMsg.key.id;

    conn.ev.on("messages.upsert", async (msgData) => {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg.message) return;

      const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      const senderID = receivedMsg.key.remoteJid;
      const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

      if (isReplyToBot) {
        await conn.sendMessage(senderID, {
          react: { text: '⬇️', key: receivedMsg.key }
        });

        let videoLinks = fbData.result.links;

        switch (receivedText) {
          case "1":
            await conn.sendMessage(senderID, {
              video: { url: videoLinks.SD },
              caption: "📥 *Downloaded in SD Quality*"
            }, { quoted: receivedMsg });
            break;

          case "2":
            await conn.sendMessage(senderID, {
              video: { url: videoLinks.HD },
              caption: "📥 *Downloaded in HD Quality*"
            }, { quoted: receivedMsg });
            break;

          case "3":
            await conn.sendMessage(senderID, {
              audio: { url: videoLinks.SD },
              mimetype: "audio/mpeg"
            }, { quoted: receivedMsg });
            break;

          case "4":
            await conn.sendMessage(senderID, {
              document: { url: videoLinks.SD },
              mimetype: "audio/mpeg",
              fileName: "Facebook_Audio.mp3",
              caption: "📥 *Audio Downloaded as Document*"
            }, { quoted: receivedMsg });
            break;

          case "5":
            await conn.sendMessage(senderID, {
              audio: { url: videoLinks.SD },
              mimetype: "audio/mp4",
              ptt: true
            }, { quoted: receivedMsg });
            break;

          default:
            reply("❌ Invalid option! Please reply with 1, 2, 3, 4, or 5.");
        }
      }
    });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Error fetching the video. Please try again.");
  }
});