const { lucky } = require("../lucky");
const axios = require("axios");

lucky({
    pattern: "img",
    alias: ["image", "googleimage", "searchimg"],
    react: "🦋",
    desc: "Search and download Google images",
    category: "download",
    use: ".img <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🖼️ Please provide a search query\nExample: .img cute cats");
        }

        await reply(`🔍 Searching images for *"${query}"*...`);

        const url = `https://apis.davidcyriltech.my.id/googleimage?query=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        if (!response.data?.success || !response.data.results?.length) {
            return reply("❌ No images found. Try different keywords.");
        }

        const results = response.data.results;
        await reply(`✅ Found *${results.length}* results for *"${query}"*. Sending top 5...`);

        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const imageUrl of selectedImages) {
            try {
                await conn.sendMessage(
                    from,
                    {
                        image: { url: imageUrl },
                        caption: `📷 Result for: *${query}*\n\nRequested by: @${m.sender.split('@')[0]}\n> © Powered by Lucky Tech Hub`,
                        contextInfo: { mentionedJid: [m.sender] }
                    },
                    { quoted: mek }
                );
            } catch (err) {
                console.warn(`⚠️ Failed to send image: ${imageUrl}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error('Image Search Error:', error);
        reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
    }
});