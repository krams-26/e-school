import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger .env depuis le dossier server
dotenv.config({ path: join(__dirname, '.env') });

console.log('Environment variables:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Défini' : '❌ Manquant');
console.log('DB_NAME:', process.env.DB_NAME || '❌ Manquant');
console.log('PORT:', process.env.PORT || '❌ Manquant');

