const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const pngToIco = require('png-to-ico');
const rcedit = require('rcedit');
const { Jimp } = require('jimp');

const LOGO_PNG = path.join(__dirname, 'logo.png');
const LOGO_SMALL = path.join(__dirname, 'logo_small.png');
const ICON_ICO = path.join(__dirname, 'logo.ico');
const EXE_NAME = 'tna-win.exe';
const BUILD_PATH = path.join(__dirname, EXE_NAME);

async function build() {
    console.log('1. Converting PNG to ICO...');
    try {
        // Resize to 256x256 for ICO compatibility
        const image = await Jimp.read(LOGO_PNG);
        image.resize(256, 256);
        await image.writeAsync(LOGO_SMALL);

        const buf = await pngToIco.default([LOGO_SMALL]);
        fs.writeFileSync(ICON_ICO, buf);
        console.log('   Icon created at', ICON_ICO);
    } catch (e) {
        console.error('   Error converting PNG to ICO:', e);
        return;
    }

    console.log('2. Packaging TNA executable...');
    // Using npx pkg to build for node18-win-x64
    // We add --public to include assets if needed, but TNA is mostly code.
    // Specifying output explicitly.
    const pkgCmd = `npx pkg src/index.js --targets node18-win-x64 --output ${EXE_NAME}`;

    await new Promise((resolve, reject) => {
        exec(pkgCmd, (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                reject(err);
                return;
            }
            console.log(stdout);
            resolve();
        });
    });
    console.log('   App packaged to', BUILD_PATH);

    console.log('3. Setting Icon (rcedit)...');
    try {
        await rcedit(BUILD_PATH, {
            icon: ICON_ICO,
            "version-string": {
                "CompanyName": "TUI Suite",
                "FileDescription": "Terminal Notes App",
                "ProductName": "TNA",
                "OriginalFilename": EXE_NAME
            }
        });
        console.log('   Icon applied successfully!');
    } catch (e) {
        console.error('   Error setting icon:', e);
    }

    console.log('Done! Executable is ready: ' + BUILD_PATH);
}

build();
