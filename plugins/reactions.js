const { lucky } = require("../lucky");
const { fetchGif, gifToVideo } = require("../lib/fetchGif");
const axios = require("axios");

lucky(
    {
        pattern: "cry",
        desc: "Send a crying reaction GIF.",
        category: "reaction",
        react: "😢",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is crying over @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is crying!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/cry";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .cry command:", error);
            reply(`❌ *Error in .cry command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "cuddle",
        desc: "Send a cuddle reaction GIF.",
        category: "reaction",
        react: "🤗",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} cuddled @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is cuddling everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/cuddle";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .cuddle command:", error);
            reply(`❌ *Error in .cuddle command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "bully",
        desc: "Send a bully reaction GIF.",
        category: "reaction",
        react: "😈",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is bullying @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is bullying everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/bully";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .bully command:", error);
            reply(`❌ *Error in .bully command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "hug",
        desc: "Send a hug reaction GIF.",
        category: "reaction",
        react: "🤗",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} hugged @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is hugging everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/hug";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .hug command:", error);
            reply(`❌ *Error in .hug command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


lucky(
    {
        pattern: "awoo",
        desc: "Send an awoo reaction GIF.",
        category: "reaction",
        react: "🐺",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} awoos at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is awooing everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/awoo";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .awoo command:", error);
            reply(`❌ *Error in .awoo command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "lick",
        desc: "Send a lick reaction GIF.",
        category: "reaction",
        react: "👅",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);

            let message = mentionedUser ? `${sender} licked @${mentionedUser.split("@")[0]}` : `${sender} licked themselves!`;

            const apiUrl = "https://api.waifu.pics/sfw/lick";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .lick command:", error);
            reply(`❌ *Error in .lick command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);
  
lucky(
    {
        pattern: "pat",
        desc: "Send a pat reaction GIF.",
        category: "reaction",
        react: "🫂",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} patted @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is patting everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;
            const apiUrl = "https://api.waifu.pics/sfw/pat";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .pat command:", error);
            reply(`❌ *Error in .pat command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "smug",
        desc: "Send a smug reaction GIF.",
        category: "reaction",
        react: "😏",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is smug at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is feeling smug!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/smug";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .smug command:", error);
            reply(`❌ *Error in .smug command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "bonk",
        desc: "Send a bonk reaction GIF.",
        category: "reaction",
        react: "🔨",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} bonked @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is bonking everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/bonk";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .bonk command:", error);
            reply(`❌ *Error in .bonk command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


lucky(
    {
        pattern: "yeet",
        desc: "Send a yeet reaction GIF.",
        category: "reaction",
        react: "💨",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} yeeted @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is yeeting everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/yeet";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .yeet command:", error);
            reply(`❌ *Error in .yeet command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "blush",
        desc: "Send a blush reaction GIF.",
        category: "reaction",
        react: "😊",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is blushing at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is blushing!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/blush";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .blush command:", error);
            reply(`❌ *Error in .blush command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);  
  
lucky(
    {
        pattern: "handhold",
        desc: "Send a hand-holding reaction GIF.",
        category: "reaction",
        react: "🤝",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is holding hands with @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} wants to hold hands with everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/handhold";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .handhold command:", error);
            reply(`❌ *Error in .handhold command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


lucky(
    {
        pattern: "highfive",
        desc: "Send a high-five reaction GIF.",
        category: "reaction",
        react: "✋",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} gave a high-five to @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is high-fiving everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/highfive";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .highfive command:", error);
            reply(`❌ *Error in .highfive command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);  

lucky(
    {
        pattern: "nom",
        desc: "Send a nom reaction GIF.",
        category: "reaction",
        react: "🍽️",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is nomming @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is nomming everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/nom";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .nom command:", error);
            reply(`❌ *Error in .nom command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "wave",
        desc: "Send a wave reaction GIF.",
        category: "reaction",
        react: "👋",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} waved at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is waving at everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/wave";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .wave command:", error);
            reply(`❌ *Error in .wave command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "smile",
        desc: "Send a smile reaction GIF.",
        category: "reaction",
        react: "😁",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} smiled at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is smiling at everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/smile";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .smile command:", error);
            reply(`❌ *Error in .smile command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "wink",
        desc: "Send a wink reaction GIF.",
        category: "reaction",
        react: "😉",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} winked at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is winking at everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/wink";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .wink command:", error);
            reply(`❌ *Error in .wink command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "happy",
        desc: "Send a happy reaction GIF.",
        category: "reaction",
        react: "😊",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is happy with @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is happy with everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/happy";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .happy command:", error);
            reply(`❌ *Error in .happy command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "glomp",
        desc: "Send a glomp reaction GIF.",
        category: "reaction",
        react: "🤗",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} glomped @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is glomping everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/glomp";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .glomp command:", error);
            reply(`❌ *Error in .glomp command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "bite",
        desc: "Send a bite reaction GIF.",
        category: "reaction",
        react: "🦷",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} bit @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is biting everyone!`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/bite";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .bite command:", error);
            reply(`❌ *Error in .bite command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "poke",
        desc: "Send a poke reaction GIF.",
        category: "reaction",
        react: "👉",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} poked @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} poked everyone`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/poke";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .poke command:", error);
            reply(`❌ *Error in .poke command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);
  
  
lucky(
    {
        pattern: "cringe",
        desc: "Send a cringe reaction GIF.",
        category: "reaction",
        react: "😬",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} thinks @${mentionedUser.split("@")[0]} is cringe`
                : isGroup
                ? `${sender} finds everyone cringe`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/cringe";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .cringe command:", error);
            reply(`❌ *Error in .cringe command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


lucky(
    {
        pattern: "dance",
        desc: "Send a dance reaction GIF.",
        category: "reaction",
        react: "💃",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} danced with @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is dancing with everyone`
                : `> © Powered By Lucky Tech Hub 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/dance";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .dance command:", error);
            reply(`❌ *Error in .dance command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


  
lucky(
    {
        pattern: "kill",
        desc: "Send a kill reaction GIF.",
        category: "reaction",
        react: "🔪",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message;
            if (mentionedUser) {
                let target = `@${mentionedUser.split("@")[0]}`;
                message = `${sender} killed ${target}`;
            } else if (isGroup) {
                message = `${sender} killed everyone`;
            } else {
                message = `> © Powered By Lucky Tech Hub 🖤`;
            }

            const apiUrl = "https://api.waifu.pics/sfw/kill";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .kill command:", error);
            reply(`❌ *Error in .kill command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "slap",
        desc: "Send a slap reaction GIF.",
        category: "reaction",
        react: "✊",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message;
            if (mentionedUser) {
                let target = `@${mentionedUser.split("@")[0]}`;
                message = `${sender} slapped ${target}`;
            } else if (isGroup) {
                message = `${sender} slapped everyone`;
            } else {
                message = `> © Powered By Lucky Tech Hub 🖤`;
            }

            const apiUrl = "https://api.waifu.pics/sfw/slap";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .slap command:", error);
            reply(`❌ *Error in .slap command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

lucky(
    {
        pattern: "kiss",
        desc: "Send a kiss reaction GIF.",
        category: "reaction",
        react: "💋",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message;
            if (mentionedUser) {
                let target = `@${mentionedUser.split("@")[0]}`;
                message = `${sender} kissed ${target}`;
            } else if (isGroup) {
                message = `${sender} kissed everyone`;
            } else {
                message = `> © Powered By Lucky Tech Hub 🖤`;
            }

            const apiUrl = "https://api.waifu.pics/sfw/kiss";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .kiss command:", error);
            reply(`❌ *Error in .kiss command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);