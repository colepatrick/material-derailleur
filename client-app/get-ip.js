const os = require('os');
const fs = require('fs');

const FILE = '.env';

const ip =
    Object.values(os.networkInterfaces())
        .flat()
        .find(i => i && i.family === 'IPv4' && !i.internal)?.address ||
    '127.0.0.1';

let text = fs.existsSync(FILE) ? fs.readFileSync(FILE, 'utf8') : '';

if (text.includes('REACT_APP_BACKEND_API_BASE_URL=')) {
    text = text.replace(
        new RegExp(`REACT_APP_BACKEND_API_BASE_URL=.*`),
        `REACT_APP_BACKEND_API_BASE_URL=\"http://${ip}:5000/\"`,
    );
} else {
    text +=
        (text.endsWith('\n') ? '' : '\n') +
        `REACT_APP_BACKEND_API_BASE_URL=\"http://${ip}:5000/\"\n`;
}

fs.writeFileSync(FILE, text);
