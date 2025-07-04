const { lucky } = require('../lucky');
const axios = require('axios');

lucky({
    pattern: "pindl",
    alias: ["pinterestdl", "pin", "pins", "pindownload"],
    desc: "Download media from Pinterest",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { args, quoted, from, reply }) => {
    try {
        // Make sure the user provided the Pinterest URL
        if (args.length < 1) {
            return reply('❎ Please provide the Pinterest URL to download from.');
        }

        // Extract Pinterest URL from the arguments
        const pinterestUrl = args[0];

        // Call your Pinterest download API
        const response = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(pinterestUrl)}`);

        if (!response.data.success) {
            return reply('❎ Failed to fetch data from Pinterest.');
        }

        const media = response.data.result.media;
        const description = response.data.result.description || 'No description available'; // Check if description exists
        const title = response.data.result.title || 'No title available';

        // Select the best video quality or you can choose based on size or type
        const videoUrl = media.find(item => item.type.includes('720p'))?.download_url || media[0].download_url;

        // Prepare the new message with the updated caption
        const desc = `
╭━━━〔 *Lucky XD* 〕━┈⊷
┃▸╭───────────
┃▸┊๏ *ᴘɪɴs ᴅʟ*
┃▸╰───────────···๏
╰────────────────┈⊷
╭━━┈┈┈┈┈┈┈┈┈━⪼
┇๏ *ᴛɪᴛᴛʟᴇ* - ${title}
┇๏ *ᴍᴇᴅɪᴀ ᴛʏᴘᴇ* - ${media[0].type}
╰━━┈┈┈┈┈┈┈┈┈━⪼
> *© Powered By Lucky Tech Hub ♡*`;

        // Send the media (video or image) to the user
        if (videoUrl) {
            // If it's a video, send the video
            await conn.sendMessage(from, { video: { url: videoUrl }, caption: desc }, { quoted: mek });
        } else {
            // If it's an image, send the image
            const imageUrl = media.find(item => item.type === 'Thumbnail')?.download_url;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption: desc }, { quoted: mek });
        }

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('❎ An error occurred while processing your request.');
    }
});