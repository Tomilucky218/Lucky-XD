const { lucky } = require('../lucky');
const config = require('../settings');
const fs = require('fs');
const path = require('path');

const warnPath = path.join(__dirname, '../data/warnings.json');
let warnings = fs.existsSync(warnPath) ? JSON.parse(fs.readFileSync(warnPath)) : {};

const saveWarnings = () => {
  fs.writeFileSync(warnPath, JSON.stringify(warnings, null, 2));
};

const linkPatterns = [
  /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /https?:\/\/(www\.)?whatsapp\.com\/channel\/[a-zA-Z0-9_-]+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?discord\.com\/\S+/gi
];

lucky({
  on: 'body'
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  participants
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) return;

    const containsLink = linkPatterns.some(pattern => pattern.test(body));
    if (!containsLink) return;

    const whitelist = config.LINK_WHITELIST?.split(',') || [];
    const isWhitelisted = whitelist.some(link => body.includes(link));
    if (isWhitelisted) return;

    // Delete the message
    if (config.DELETE_LINKS === 'true') {
      await conn.sendMessage(from, { delete: m.key }, { quoted: m });
    }

    // Add a warning
    if (!warnings[from]) warnings[from] = {};
    if (!warnings[from][sender]) warnings[from][sender] = 0;

    warnings[from][sender]++;
    saveWarnings();

    const warnCount = warnings[from][sender];
    const limit = parseInt(config.LINK_WARN_LIMIT || 3);

    const senderName = participants.find(p => p.id === sender)?.notify || sender.split('@')[0];
    await conn.sendMessage(from, {
      text: `⚠️ @${senderName} posted a link. Warning ${warnCount}/${limit}.`,
      mentions: [sender]
    });

    // Kick or mute if limit exceeded
    if (warnCount >= limit) {
      if (config.LINK_ACTION === 'kick') {
        await conn.groupParticipantsUpdate(from, [sender], 'remove');
      } else if (config.LINK_ACTION === 'mute') {
        const until = Math.floor(Date.now() / 1000) + 60 * 10; // 10 mins
        await conn.groupParticipantsUpdate(from, [sender], 'restrict', { mute: until });
      }

      warnings[from][sender] = 0;
      saveWarnings();
    }

  } catch (err) {
    console.error('Link moderation error:', err);
  }
});