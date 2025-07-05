const { lucky } = require('../lucky');

lucky({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { 
    from, senderNumber, reply 
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("❌ Only the bot owner can use this command.");
        }

        const steps = [
            '💻 *HACK STARTING...* 💻',
            '*Initializing hacking tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            '```[█▒▒▒▒] 10%``` ⏳',
            '```[██▒▒▒▒] 30%``` ⏳',
            '```[████▒▒▒] 50%``` ⏳',
            '```[██████▒] 70%``` ⏳',
            '```[████████] 90%``` ⏳',
            '```[████████] 100%``` ✅',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Executing final commands...* 🎯',
            '*📡 Transmitting data...* 📤',
            '_🕵️‍♂️ Covering tracks..._ 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '⚠️ *Note:* This is a joke command for fun.',
            '> *HACK COMPLETE ☣*'
        ];

        for (const line of steps) {
            await reply(line);
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500)); // Randomized delay for realism
        }
    } catch (e) {
        console.error(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});