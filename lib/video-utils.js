const fs = require('fs');
const path = require('path');
const { tmpdir } = require('os');
const Crypto = require('crypto');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Converts a video or GIF buffer to a WebP sticker format.
 * @param {Buffer} videoBuffer - The video or GIF buffer to convert.
 * @returns {Promise<Buffer>} - The converted WebP sticker buffer.
 */
async function videoToWebp(videoBuffer) {
  const outputPath = path.join(
    tmpdir(),
    Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + '.webp'
  );
  const inputPath = path.join(
    tmpdir(),
    Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + '.mp4'
  );

  // Save the video buffer to a file
  fs.writeFileSync(inputPath, videoBuffer);

  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .on('error', reject)
      .on('end', () => resolve(true))
      .addOutputOptions([
        '-vcodec', 'libwebp',
        '-vf', "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split [a][b];[a] palettegen=reserve_transparent=on:transparency_color=ffffff [p];[b][p] paletteuse",
        '-loop', '0', // Loop forever
        '-ss', '00:00:00', // Start time (optional)
        '-t', '00:00:05', // Duration (optional)
        '-preset', 'default',
        '-an', // No audio
        '-vsync', '0'
      ])
      .toFormat('webp')
      .save(outputPath);
  });

  const webpBuffer = fs.readFileSync(outputPath);
  fs.unlinkSync(outputPath);
  fs.unlinkSync(inputPath);

  return webpBuffer;
}

module.exports = {
  videoToWebp
};
