const config = require('../settings');
const { lucky, commands } = require('../lucky');
const axios = require("axios");

lucky({
  pattern: "ytstalk",
  alias: ["youtubestalk", "ytsearch"],
  desc: "Get information about a YouTube channel, including their profile picture, stats, and latest videos.",
  category: "other",
  use: ".ytstalk <username>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const username = args.join(" ");
    if (!username) {
      return reply("❌ Please provide a YouTube username. Example: `.ytstalk luckytechhub `");
    }

    // Fetch YouTube channel information from the API
    const response = await axios.get(`https://api.siputzx.my.id/api/stalk/youtube?username=${encodeURIComponent(username)}`);
    const { status, data } = response.data;

    if (!status || !data) {
      return reply("❌ No information found for the specified YouTube channel. Please try again.");
    }

    const {
      channel: {
        username: ytUsername,
        subscriberCount,
        videoCount,
        avatarUrl,
        channelUrl,
        description,
      },
      latest_videos,
    } = data;

    // Format the YouTube channel information message
    const ytMessage = `
📺 *YouTube Channel*: ${ytUsername}
👥 *Subscribers*: ${subscriberCount}
🎥 *Total Videos*: ${videoCount}
📝 *Description*: ${description || "N/A"}
🔗 *Channel URL*: ${channelUrl}

🎬 *Latest Videos*:
${latest_videos.slice(0, 3).map((video, index) => `
${index + 1}. *${video.title}*
   ▶️ *Views*: ${video.viewCount}
   ⏱️ *Duration*: ${video.duration}
   📅 *Published*: ${video.publishedTime}
   🔗 *Video URL*: ${video.videoUrl}
`).join("\n")}
    `;

    // Send the YouTube channel information message with the profile picture as an image attachment
    await conn.sendMessage(from, {
      image: { url: avatarUrl }, // Attach the profile picture
      caption: ytMessage, // Add the formatted message as caption
    });
  } catch (error) {
    console.error("Error fetching YouTube channel information:", error);
    reply("❌ Unable to fetch YouTube channel information. Please try again later.");
  }
});