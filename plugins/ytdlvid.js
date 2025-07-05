const { lucky } = require('../lucky');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require("node-fetch");
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');


lucky({
    pattern: "video",
    alias: ["ytvideo", "mp4"],
    react: "📽",
    desc: "Download YouTube video (MP4)",
    category: "download",
    use: ".video <query>",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("❓ What video do you want to download? Please provide a search term.");

        await reply("🔍 *Searching for your video, please wait...*");

        const search = await ytsearch(q);
        if (!search.results.length) return reply("❌ No results found for your query.");

        const { title, thumbnail, timestamp, url } = search.results[0];
        const videoUrl = encodeURIComponent(url);

        // Try primary API
        const api1 = `https://apis-keith.vercel.app/download/dlmp4?url=${videoUrl}`;
        const api2 = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${videoUrl}`;

        let data;

        try {
            const res1 = await fetch(api1);
            data = await res1.json();
            if (!data?.status || !data?.result?.downloadUrl) throw new Error("Primary API failed");
        } catch {
            const res2 = await fetch(api2);
            data = await res2.json();
            if (!data?.success || !data?.result?.download_url) throw new Error("Both APIs failed");
        }

        const downloadUrl = data.result.downloadUrl || data.result.download_url;

        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: `🎬 *Video Found:*\n\n📌 *Title:* ${title}\n⏱️ *Duration:* ${timestamp}\n🔗 *Link:* ${url}\n\n> Powered By Lucky Tech Hub`
        }, { quoted: mek });

        await conn.sendMessage(from, {
            video: { url: downloadUrl },
            mimetype: "video/mp4",
            caption: `🎬 *Video Downloaded Successfully!*\n\n> Powered By Lucky Tech Hub`
        }, { quoted: mek });

    } catch (error) {
        reply(`❌ An error occurred: ${error.message}`);
    }
});