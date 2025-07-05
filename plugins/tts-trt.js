const axios = require('axios');
const config = require('../settings')
const {lucky , commands} = require('../lucky')
const googleTTS = require('google-tts-api')

lucky({
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `xᴅ ᴛʀᴀɴsʟᴀᴛɪᴏɴ

  🔤 *Oʀɪɢɪɴᴀʟ*: ${textToTranslate}

> 🔠 *Tʀᴀɴsʟᴀᴛᴇᴅ*: ${translation}

> 🌐 *Lᴀɴɢᴜᴀɢᴇ*: ${targetLang.toUpperCase()}`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred data while translating the your text. Please try again later🤕");
    }
});