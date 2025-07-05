const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { tmpdir } = require('os');
const Crypto = require('crypto');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Fetch an image from a given URL.
 * @param {string} url - The image URL.
 * @returns {Promise<Buffer>} - The image buffer.
 */
async function fetchImage(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error("Error fetching image:", error);
        throw new Error("Could not fetch image.");
    }
}

/**
 * Fetch a GIF from a given API URL.
 * @param {string} url - API endpoint to fetch GIF.
 * @returns {Promise<Buffer>} - The GIF buffer.
 */
async function fetchGif(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error("Error fetching GIF:", error);
        throw new Error("Could not fetch GIF.");
    }
}

/**
 * Converts a GIF buffer to WebP sticker format.
 * @param {Buffer} gifBuffer - The GIF buffer.
 * @returns {Promise<Buffer>} - The WebP sticker buffer.
 */
async function gifToSticker(gifBuffer) {
    const outputPath = path.join(tmpdir(), Crypto.randomBytes(6).toString('hex') + ".webp");
    const inputPath = path.join(tmpdir(), Crypto.randomBytes(6).toString('hex') + ".gif");

    fs.writeFileSync(inputPath, gifBuffer);

    await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec", "libwebp",
                "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split [a][b];[a] palettegen=reserve_transparent=on:transparency_color=ffffff [p];[b][p] paletteuse",
                "-loop", "0",
                "-preset", "default",
                "-an",
                "-vsync", "0"
            ])
            .toFormat("webp")
            .save(outputPath);
    });

    const webpBuffer = fs.readFileSync(outputPath);
    fs.unlinkSync(outputPath);
    fs.unlinkSync(inputPath);

    return webpBuffer;
}

module.exports = { fetchImage, fetchGif, gifToSticker };
          
