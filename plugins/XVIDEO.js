const { lucky } = require('../lucky');
const { fetchJson } = require('../lib/functions');

const apilink = 'https://www.dark-yasiya-api.site/'; 

lucky({
    pattern: "xvideo",
    alias: ["xvdl", "xnxx"],
    react: "🔞",
    desc: "Download videos from XVideo.com",
    category: "download",
    use: '.xvideo <search query>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return await reply("*Please provide a search query!*");

        // XVideo search
        const xv_list = await fetchJson(`${apilink}/search/xvideo?text=${q}`);
        if (!xv_list.result || xv_list.result.length === 0) return await reply("*No results found!*");

        const videos = xv_list.result.slice(0, 30); // Limit to 30 results

        // Prepare the list
        let listText = `╭━━━〔 *LUCKY-XD XVIDEO* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *XVIDEO SEARCH RESULTS*
┃▸└───────────···๏
╰────────────────┈⊷\n\n🔢 *Please reply with the number of your choice*\n\n`;
        videos.forEach((video, index) => {
            listText += `🔢│➪ *[REPLY NUMBER ${index + 1} ]*\n\n`;
            listText += `┏━❮🔞 LUCKY-XD DETAILS 🔞❯━\n`;
            listText += `┃📽️ *Title*: ${video.title}\n`;
            listText += `┃👁️ *Views*: ${video.views || 'N/A'}\n`;
            listText += `┃🔗 *URL*: ${video.url}\n`;
            listText += `┗━━━━━━━━━━━━━━𖣔𖣔\n\n`;
        });
        listText += `> *Please reply with the number of your choice*\n`;
        listText += `> ㋛︎ Powered By Lucky Tech Hub`;

        // Send the list
        const sentMsg = await conn.sendMessage(from, {
            image: { url: videos[0].image || 'https://files.catbox.moe/4itzeu.jpg' },
            caption: listText,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'LUCKY-XD',
                    newsletterJid: "120363420656466131@newsletter",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

        const messageID = sentMsg.key.id; 


        const handleVideoSelection = async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;

            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                const choice = parseInt(messageType) - 1;
                if (isNaN(choice) || choice < 0 || choice >= videos.length) {
                    await conn.sendMessage(from, { text: "*Invalid number! Choose between 1-30.*" }, { quoted: replyMek });
                    return;
                }

                const selectedVideo = videos[choice];

   
                await conn.sendMessage(from, { react: { text: '⬇️', key: replyMek.key } });
                const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${selectedVideo.url}`);
                if (!xv_info.result || !xv_info.result.dl_link) {
                    await conn.sendMessage(from, { text: "*Failed to download! Try another video.*" }, { quoted: replyMek });
                    return;
                }

                // Details message
                const desc = `╭━━━〔 *LUCKY-XD XVIDEO* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *XVIDEO DOWNLOADER*
┃▸└───────────···๯
╰────────────────┈⊷
┃📽️ *Title*: ${xv_info.result.title}
┃👁️ *Views*: ${xv_info.result.views || 'N/A'}
┃👍 *Likes*: ${xv_info.result.like || 'N/A'}
┗━━━━━━━━━━━━━━𖣔𖣔
╭━━〔🔢 *Reply Number*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | Download as Video 📽️
┃◈┃•2 | Download as Document 📁
┃◈└───────────┈⊷
╰──────────────┈⊷
> ㋛︎ Powered By Lucky Tech Hub`;


                const optionMsg = await conn.sendMessage(from, {
                    image: { url: xv_info.result.image || 'https://files.catbox.moe/4itzeu.jpg' },
                    caption: desc,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: 'LUCKY-XD',
                            newsletterJid: "120363420656466131@newsletter",
                            serverMessageId: 999
                        }
                    }
                }, { quoted: replyMek });

                const optionMsgID = optionMsg.key.id;

                // Handle second reply (download option selection)
                const handleDownloadOption = async (optionUpdate) => {
                    const optMek = optionUpdate.messages[0];
                    if (!optMek.message) return;

                    const optType = optMek.message.conversation || optMek.message.extendedTextMessage?.text;
                    const isReplyToOptMsg = optMek.message.extendedTextMessage && optMek.message.extendedTextMessage.contextInfo.stanzaId === optionMsgID;

                    if (isReplyToOptMsg) {
                        await conn.sendMessage(from, { react: { text: '⬇️', key: optMek.key } });

                        const caption = `🔞 *LUCKY-XD XVIDEO DOWNLOADER* 🔞\n\n📽️ *Title*: ${xv_info.result.title}\n> ㋛︎ Powered By Lucky Tech Hub`;

                        if (optType === '1') {

                            await conn.sendMessage(from, {
                                video: { url: xv_info.result.dl_link },
                                mimetype: "video/mp4",
                                caption: caption,
                                contextInfo: {
                                    externalAdReply: {
                                        title: xv_info.result.title,
                                        body: "LUCKY-XD XVideo",
                                        mediaType: 2,
                                        sourceUrl: selectedVideo.url,
                                        thumbnailUrl: xv_info.result.image || "https://files.catbox.moe/4itzeu.jpg",
                                        renderLargerThumbnail: true,
                                        showAdAttribution: true
                                    }
                                }
                            }, { quoted: optMek });
                        } else if (optType === '2') {

                            await conn.sendMessage(from, {
                                document: { url: xv_info.result.dl_link },
                                mimetype: "video/mp4",
                                fileName: `${xv_info.result.title}.mp4`,
                                caption: caption
                            }, { quoted: optMek });
                        } else {
                            await conn.sendMessage(from, { text: "*Invalid choice! Choose 1 or 2.*" }, { quoted: optMek });
                            return;
                        }

                        await conn.sendMessage(from, { react: { text: '✅', key: optMek.key } });


                        conn.ev.off('messages.upsert', handleDownloadOption);
                    }
                };


                conn.ev.on('messages.upsert', handleDownloadOption);


                conn.ev.off('messages.upsert', handleVideoSelection);
            }
        };


        conn.ev.on('messages.upsert', handleVideoSelection);

    } catch (error) {
        console.error(error);
        await reply(`*An error occurred:* ${error.message || 'Unknown error'}`);
    }
});