const { lucky } = require('../lucky');

lucky({
    pattern: "add",
    alias: ["a", "invite"],
    desc: "Adds a member to the group",
    category: "admin",
    react: "➕",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isBotAdmins, reply, quoted, senderNumber, args
}) => {

    // Must be in group
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    // Owner-only control
    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) return reply("❌ Only the bot owner can use this command.");

    // Bot must be admin
    if (!isBotAdmins) return reply("❌ I need to be an admin to add members.");

    let number;

    // Extract number from quoted, mention, or args
    if (quoted) {
        number = quoted.sender.split("@")[0];
    } else if (m.mentionedJid?.length) {
        number = m.mentionedJid[0].split("@")[0];
    } else if (args[0] && /^\d{5,16}$/.test(args[0])) {
        number = args[0];
    } else {
        return reply("❌ Provide a valid number, mention a user, or reply to a message.");
    }

    const jid = number + "@s.whatsapp.net";

    try {
        await conn.groupParticipantsUpdate(from, [jid], "add");
        await conn.sendMessage(from, {
            text: `✅ Successfully added @${number}`,
            mentions: [jid]
        }, { quoted: mek });
    } catch (err) {
        console.error("❌ Add Error:", err);
        reply("❌ Failed to add member. They may have privacy settings or the group is full.");
    }
});