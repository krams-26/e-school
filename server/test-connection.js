import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔍 Test de connexion à la base de données...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'eschool',
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Connexion réussie !');

    // Test des utilisateurs
    const [users] = await connection.query('SELECT id, email, name, role FROM users');
    console.log(`\n📊 Utilisateurs trouvés: ${users.length}`);
    
    if (users.length > 0) {
      console.log('\nUtilisateurs:');
      users.forEach(user => {
        console.log(`  - ${user.email} (${user.role}) - ID: ${user.id}`);
      });

      // Test du mot de passe pour admin
      const [adminUser] = await connection.query(
        'SELECT password FROM users WHERE email = ?',
        ['admin@eschool.com']
      );

      if (adminUser.length > 0) {
        const hashedPassword = adminUser[0].password;
        const isValid = await bcrypt.compare('password', hashedPassword);
        console.log(`\n🔐 Test mot de passe admin@eschool.com: ${isValid ? '✅ Valide' : '❌ Invalide'}`);
      }
    } else {
      console.log('\n⚠️ Aucun utilisateur trouvé. Exécutez: npm run seed');
    }

    await connection.end();
    console.log('\n✅ Test terminé avec succès');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   → Vérifiez les identifiants MySQL dans server/.env');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('   → La base de données "eschool" n\'existe pas. Exécutez: npm run migrate');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   → MySQL n\'est pas démarré. Démarrez WAMP');
    }
    process.exit(1);
  }
};

testConnection();

