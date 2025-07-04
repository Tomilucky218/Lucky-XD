const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

class StickerConverter {
    constructor() {
        this.tempDir = path.join(__dirname, '../temp');
        this.ensureTempDir();
    }

    ensureTempDir() {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    async convertStickerToImage(stickerBuffer) {
        const tempPath = path.join(this.tempDir, `sticker_${Date.now()}.webp`);
        const outputPath = path.join(this.tempDir, `image_${Date.now()}.png`);

        try {
            // Save sticker to temp file
            await fs.promises.writeFile(tempPath, stickerBuffer);

            // Convert using fluent-ffmpeg (same as your video sticker converter)
            await new Promise((resolve, reject) => {
                ffmpeg(tempPath)
                    .on('error', reject)
                    .on('end', resolve)
                    .output(outputPath)
                    .run();
            });

            // Read and return converted image
            return await fs.promises.readFile(outputPath);
        } catch (error) {
            console.error('Conversion error:', error);
            throw new Error('Failed to convert sticker to image');
        } finally {
            // Cleanup temp files
            await Promise.all([
                fs.promises.unlink(tempPath).catch(() => {}),
                fs.promises.unlink(outputPath).catch(() => {})
            ]);
        }
    }
}

module.exports = new StickerConverter();
