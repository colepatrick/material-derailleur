const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src/generated');
const destDir = path.resolve(__dirname, '../dist/generated');

function copyDir(src, dest) {
    if (!fs.existsSync(src)) {
        throw new Error(`Source directory does not exist: ${src}`);
    }

    fs.mkdirSync(dest, { recursive: true });

    for (const name of fs.readdirSync(src)) {
        const srcPath = path.join(src, name);
        const destPath = path.join(dest, name);
        const stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyDir(srcDir, destDir);
console.log(`Copied generated Prisma client from ${srcDir} to ${destDir}`);
