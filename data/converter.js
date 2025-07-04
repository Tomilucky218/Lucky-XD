const fs = require('fs');
const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { spawn } = require('child_process');

class AudioConverter {
    constructor() {
        this.tempDir = path.join(__dirname, '../temp');
        this.ensureTempDir();
    }

    ensureTempDir() {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    async cleanFile(file) {
        if (file && fs.existsSync(file)) {
            await fs.promises.unlink(file).catch(() => {});
        }
    }

    async convert(buffer, args, ext, ext2) {
        const inputPath = path.join(this.tempDir, `${Date.now()}.${ext}`);
        const outputPath = path.join(this.tempDir, `${Date.now()}.${ext2}`);

        try {
            await fs.promises.writeFile(inputPath, buffer);
            
            return new Promise((resolve, reject) => {
                const ffmpeg = spawn(ffmpegPath, [
                    '-y',
                    '-i', inputPath,
                    ...args,
                    outputPath
                ], { timeout: 30000 });

                let errorOutput = '';
                ffmpeg.stderr.on('data', (data) => errorOutput += data.toString());

                ffmpeg.on('close', async (code) => {
                    await this.cleanFile(inputPath);
                    
                    if (code !== 0) {
                        await this.cleanFile(outputPath);
                        return reject(new Error(`Conversion failed with code ${code}`));
                    }

                    try {
                        const result = await fs.promises.readFile(outputPath);
                        await this.cleanFile(outputPath);
                        resolve(result);
                    } catch (readError) {
                        reject(readError);
                    }
                });

                ffmpeg.on('error', (err) => {
                    reject(err);
                });
            });
        } catch (err) {
            await this.cleanFile(inputPath);
            await this.cleanFile(outputPath);
            throw err;
        }
    }

    toAudio(buffer, ext) {
        return this.convert(buffer, [
            '-vn',
            '-ac', '2',
            '-b:a', '128k',
            '-ar', '44100',
            '-f', 'mp3'
        ], ext, 'mp3');
    }

    toPTT(buffer, ext) {
        return this.convert(buffer, [
            '-vn',
            '-c:a', 'libopus',
            '-b:a', '128k',
            '-vbr', 'on',
            '-compression_level', '10'
        ], ext, 'opus');
    }
}

module.exports = new AudioConverter();
