import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 📁 Chemins absolus vers ton build PWA
const pwaPath = path.resolve(__dirname, '../dist/pwa');
const indexPath = path.resolve(pwaPath, '../index.html');

console.log(pwaPath);
console.log(indexPath);

console.log(path.resolve(__dirname, '../dist/pwa/index.html'));
