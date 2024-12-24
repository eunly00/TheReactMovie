const fs = require('fs');
const env = process.env.REACT_APP_ENV || 'development';
const srcPath = `.env-${env}`;
const destPath = '.env';

if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Environment file ${srcPath} copied to ${destPath}`);
} else {
    console.error(`Environment file ${srcPath} does not exist`);
}
