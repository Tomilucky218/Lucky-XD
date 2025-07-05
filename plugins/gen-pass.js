const crypto = require("crypto");
const { lucky } = require("../lucky");

lucky({
  pattern: "gpass",
  desc: "Generate a strong password with customizable options.",
  category: "other",
  react: '🔐',
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    // Default password length is 12, and password type is 'all' (includes letters, numbers, and symbols)
    let passwordLength = args[0] ? parseInt(args[0]) : 12;
    const passwordType = args[1] || 'all'; // 'all', 'letters', 'numbers', 'symbols'

    // Validate the password length
    if (isNaN(passwordLength) || passwordLength < 8) {
      return reply("❌ Please provide a valid length for the password (Minimum 8 Characters).");
    }

    // Character sets for password generation
    const sets = {
      letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
    };

    // All possible characters combined
    let allChars = sets.letters + sets.numbers + sets.symbols;
    let passwordChars = '';

    // Choose the characters based on the password type
    if (passwordType === 'letters') {
      passwordChars = sets.letters;
    } else if (passwordType === 'numbers') {
      passwordChars = sets.numbers;
    } else if (passwordType === 'symbols') {
      passwordChars = sets.symbols;
    } else {
      passwordChars = allChars; // Default to all characters
    }

    // Password generation function
    const generatePassword = (length) => {
      let password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, passwordChars.length);
        password += passwordChars[randomIndex];
      }
      return password;
    };

    // Generate the password
    const generatedPassword = generatePassword(passwordLength);

    // Determine password strength based on its length and type
    const strength = passwordLength > 16 ? 'Very Strong' : passwordLength > 12 ? 'Strong' : 'Medium';

    // Send the message with the generated password
    await conn.sendMessage(from, {
      text: `🔐 *Your Strong Password* 🔐\n\nHere is your generated password (${strength}):\n\n*${generatedPassword}*\n\n> *Powered By Lucky XD*`
    }, {
      quoted: quoted
    });

  } catch (error) {
    console.error(error);
    reply("❌ Error generating password: " + error.message);
  }
});