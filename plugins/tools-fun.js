const axios = require("axios");
const fetch = require("node-fetch");
const { sleep } = require('../lib/functions');
const { lucky, commands } = require("../lucky");

lucky({
  pattern: "joke",
  desc: "😂 Get a random joke",
  react: "🤣",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { reply }) => {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    const joke = response.data;

    if (!joke || !joke.setup || !joke.punchline) {
      return reply("❌ Failed to fetch a joke. Please try again.");
    }

    const jokeMessage = `🤣 *Here's a random joke for you!* 🤣\n\n*${joke.setup}*\n\n${joke.punchline} 😆\n\n> *© Powered By Lucky Tech Hub 🖤`;

    return reply(jokeMessage);
  } catch (error) {
    console.error("❌ Error in joke command:", error);
    return reply("⚠️ An error occurred while fetching the joke. Please try again.");
  }
});

// flirt

lucky({
    pattern: "flirt",
    alias: ["masom", "line"],
    desc: "Get a random flirt or pickup line.",
    react: "💘",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // Define API key and URL
        const shizokeys = 'shizo';
        const apiUrl = `https://shizoapi.onrender.com/api/texts/flirt?apikey=${shizokeys}`;

        // Fetch data from the API
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw new Error(`API error: ${await res.text()}`);
        }
        
        const json = await res.json();
        if (!json.result) {
            throw new Error("Invalid response from API.");
        }

        // Extract and send the flirt message
        const flirtMessage = `${json.result}`;
        await conn.sendMessage(from, {
            text: flirtMessage,
            mentions: [m.sender],
        }, { quoted: m });

    } catch (error) {
        console.error("Error in flirt command:", error);
        reply("Sorry, something went wrong while fetching the flirt line. Please try again later.");
    }
});

//truth

lucky({
    pattern: "truth",
    alias: ["truthquestion"],
    desc: "Get a random truth question from the API.",
    react: "❓",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/truth?apikey=${shizokeys}`);
        
        if (!res.ok) {
            console.error(`API request failed with status ${res.status}`);
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        if (!json.result) {
            console.error("Invalid API response: No 'result' field found.");
            throw new Error("Invalid API response: No 'result' field found.");
        }

        const truthText = `${json.result}`;
        await conn.sendMessage(from, { 
            text: truthText, 
            mentions: [m.sender] 
        }, { quoted: m });

    } catch (error) {
        console.error("Error in truth command:", error);
        reply("Sorry, something went wrong while fetching the truth question. Please try again later.");
    }
});

// dare

lucky({
    pattern: "dare",
    alias: ["truthordare"],
    desc: "Get a random dare from the API.",
    react: "🎯",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // API Key
        const shizokeys = 'shizo';

        // Fetch dare text from the API
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=${shizokeys}`);
        
        if (!res.ok) {
            console.error(`API request failed with status ${res.status}`);
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        if (!json.result) {
            console.error("Invalid API response: No 'result' field found.");
            throw new Error("Invalid API response: No 'result' field found.");
        }

        // Format the dare message
        const dareText = `${json.result}`;

        // Send the dare to the chat
        await conn.sendMessage(from, { 
            text: dareText, 
            mentions: [m.sender] 
        }, { quoted: m });

    } catch (error) {
        console.error("Error in dare command:", error);
        reply("Sorry, something went wrong while fetching the dare. Please try again later.");
    }
});

lucky({
  pattern: "fact",
  desc: "🧠 Get a random fun fact",
  react: "🧠",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { reply }) => {
  try {
    const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
    const fact = response.data.text;

    if (!fact) {
      return reply("❌ Failed to fetch a fun fact. Please try again.");
    }

    const factMessage = `🧠 *Random Fun Fact* 🧠\n\n${fact}\n\nIsn't that interesting? 😄\n\n> *© Powered By Lucky Tech Hub 🖤`;
    
    return reply(factMessage);
  } catch (error) {
    console.error("❌ Error in fact command:", error);
    return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
  }
});

lucky({
    pattern: "pickupline",
    alias: ["pickup"],
    desc: "Get a random pickup line from the API.",
    react: "💬",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // Fetch pickup line from the API
        const res = await fetch('https://api.popcat.xyz/pickuplines');
        
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        // Log the API response (for debugging purposes)
        console.log('JSON response:', json);

        // Format the pickup line message
        const pickupLine = `*Here's a pickup line for you:*\n\n"${json.pickupline}"\n\n> *© Powered By Lucky Tech Hub 🖤`;

        // Send the pickup line to the chat
        await conn.sendMessage(from, { text: pickupLine }, { quoted: m });

    } catch (error) {
        console.error("Error in pickupline command:", error);
        reply("Sorry, something went wrong while fetching the pickup line. Please try again later.");
    }
});

// char

lucky({
    pattern: "character",
    alias: ["char"],
    desc: "Check the character of a mentioned user.",
    react: "🔥",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, text, reply }) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Extract the mentioned user
        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) {
            return reply("Please mention a user whose character you want to check.");
        }

        // Define character traits
        const userChar = [
            "Sigma",
            "Generous",
            "Grumpy",
            "Overconfident",
            "Obedient",
            "Good",
            "Simp",
            "Kind",
            "Patient",
            "Pervert",
            "Cool",
            "Helpful",
            "Brilliant",
            "Sexy",
            "Hot",
            "Gorgeous",
            "Cute",
        ];

        // Randomly select a character trait
        const userCharacterSelection =
            userChar[Math.floor(Math.random() * userChar.length)];

        // Message to send
        const message = `Character of @${mentionedUser.split("@")[0]} is *${userCharacterSelection}* 🔥⚡`;

        // Send the message with mentions
        await conn.sendMessage(from, {
            text: message,
            mentions: [mentionedUser],
        }, { quoted: m });

    } catch (e) {
        console.error("Error in character command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});

lucky({
  pattern: "repeat",
  alias: ["rp", "rpm"],
  desc: "Repeat a message a specified number of times.",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { args, reply }) => {
  try {
    if (!args[0]) {
      return reply("✳️ Use this command like:\n*Example:* .repeat 10,I love you");
    }

    const [countStr, ...messageParts] = args.join(" ").split(",");
    const count = parseInt(countStr.trim());
    const message = messageParts.join(",").trim();

    if (isNaN(count) || count <= 0 || count > 300) {
      return reply("❎ Please specify a valid number between 1 and 300.");
    }

    if (!message) {
      return reply("❎ Please provide a message to repeat.");
    }

    const repeatedMessage = Array(count).fill(message).join("\n");

    reply(`🔄 Repeated ${count} times:\n\n${repeatedMessage}`);
  } catch (error) {
    console.error("❌ Error in repeat command:", error);
    reply("❎ An error occurred while processing your request.");
  }
});

lucky({
  pattern: "send",
  desc: "Send a message multiple times, one by one.",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { args, reply, senderNumber }) => {
  try {
    const botOwner = conn.user.id.split(":")[0]; // Get bot owner's number

    if (senderNumber !== botOwner) {
      return reply("❎ Only the bot owner can use this command.");
    }

    if (!args[0]) {
      return reply("✳️ Use this command like:\n *Example:* .send 10,I love you");
    }

    const [countStr, ...messageParts] = args.join(" ").split(",");
    const count = parseInt(countStr.trim());
    const message = messageParts.join(",").trim();

    if (isNaN(count) || count <= 0 || count > 100) {
      return reply("❎ Please specify a valid number between 1 and 100.");
    }

    if (!message) {
      return reply("❎ Please provide a message to send.");
    }

    reply(`⏳ Sending "${message}" ${count} times. This may take a while...`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(m.from, { text: message }, { quoted: m });
      await sleep(1000); // 1-second delay
    }

    reply(`✅ Successfully sent the message ${count} times.`);
  } catch (error) {
    console.error("❌ Error in ask command:", error);
    reply("❎ An error occurred while processing your request.");
  }
});

lucky({
  pattern: "readmore",
  alias: ["rm", "rmore", "readm"],
  desc: "Generate a Read More message.",
  category: "convert",
  use: ".readmore <text>",
  react: "📝",
  filename: __filename
}, async (conn, m, store, { args, reply }) => {
  try {
    const inputText = args.join(" ") || "No text provided.";
    const readMore = String.fromCharCode(8206).repeat(4000); // Creates a large hidden gap
    const message = `${inputText} ${readMore} Continue Reading...`;

    await conn.sendMessage(m.from, { text: message }, { quoted: m });
  } catch (error) {
    console.error("❌ Error in readmore command:", error);
    reply("❌ An error occurred: " + error.message);
  }
});