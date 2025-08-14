#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verificando preparación para despliegue...\n');

const checks = [
  {
    name: 'package.json',
    path: '../package.json',
    required: true,
    check: (content) => {
      const pkg = JSON.parse(content);
      return pkg.scripts && pkg.scripts.start;
    }
  },
  {
    name: 'Procfile',
    path: '../Procfile',
    required: true,
    check: (content) => content.includes('web:')
  },
  {
    name: 'index.js',
    path: '../index.js',
    required: true,
    check: (content) => content.includes('process.env.PORT')
  },
  {
    name: 'config/db.js',
    path: '../config/db.js',
    required: true,
    check: (content) => content.includes('process.env.DATABASE_URL')
  },
  {
    name: 'railway.json',
    path: '../railway.json',
    required: false,
    check: () => true
  },
  {
    name: '.gitignore',
    path: '../.gitignore',
    required: true,
    check: (content) => content.includes('.env')
  }
];

let allPassed = true;

for (const check of checks) {
  const filePath = path.join(__dirname, check.path);
  
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const isValid = check.check(content);
      
      if (isValid) {
        console.log(`✅ ${check.name} - OK`);
      } else {
        console.log(`❌ ${check.name} - No cumple con los requisitos`);
        allPassed = false;
      }
    } else if (check.required) {
      console.log(`❌ ${check.name} - No encontrado`);
      allPassed = false;
    } else {
      console.log(`⚠️  ${check.name} - No encontrado (opcional)`);
    }
  } catch (error) {
    console.log(`❌ ${check.name} - Error al leer: ${error.message}`);
    allPassed = false;
  }
}

console.log('\n📋 Variables de entorno requeridas:');
console.log('   - DATABASE_URL (obligatoria)');
console.log('   - JWT_SECRET (obligatoria)');
console.log('   - PORT (automática en Railway)');

console.log('\n🚀 Pasos para desplegar:');
console.log('   1. git add . && git commit -m "Preparado para Railway"');
console.log('   2. git push origin main');
console.log('   3. Conectar repositorio en Railway');
console.log('   4. Configurar variables de entorno');
console.log('   5. Desplegar');

if (allPassed) {
  console.log('\n🎉 ¡Tu proyecto está listo para desplegar en Railway!');
} else {
  console.log('\n⚠️  Hay algunos problemas que necesitas resolver antes del despliegue.');
}

console.log('\n📖 Consulta DEPLOYMENT.md para instrucciones detalladas.');
