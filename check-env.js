#!/usr/bin/env node

console.log('🔍 Checking environment configuration...\n');

// Check if .env.local exists
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 To fix this:');
  console.log('   1. Copy env.example to .env.local:');
  console.log('      cp env.example .env.local');
  console.log('   2. Edit .env.local with your actual credentials');
  process.exit(1);
}

console.log('✅ .env.local file found');

// Load environment variables
require('dotenv').config({ path: envPath });

// Check required environment variables
const requiredVars = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'ADMIN_EMAIL',
  'NEXT_PUBLIC_APP_URL'
];

let missingVars = [];
let configuredVars = [];

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value.includes('your_') || value.includes('change-this') || value.includes('sk_test_your_') || value.includes('whsec_your_')) {
    missingVars.push(varName);
    console.log(`❌ ${varName}: Not configured or using placeholder value`);
  } else {
    configuredVars.push(varName);
    console.log(`✅ ${varName}: Configured`);
  }
});

console.log('\n📊 Summary:');
console.log(`✅ Configured: ${configuredVars.length}/${requiredVars.length}`);
console.log(`❌ Missing: ${missingVars.length}/${requiredVars.length}`);

if (missingVars.length > 0) {
  console.log('\n❌ Missing or incomplete configuration:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  
  console.log('\n📝 To fix this:');
  console.log('   1. Edit .env.local file');
  console.log('   2. Replace placeholder values with actual credentials');
  console.log('   3. Get Stripe keys from: https://dashboard.stripe.com/apikeys');
  console.log('   4. Get Resend API key from: https://resend.com/api-keys');
  console.log('   5. Set up Stripe webhook for local development');
  process.exit(1);
}

console.log('\n✅ All environment variables are configured!');
console.log('\n🔧 Next steps to get emails working:');
console.log('   1. Set up Stripe webhook for local development');
console.log('   2. Use Stripe CLI: stripe listen --forward-to localhost:3000/api/webhooks');
console.log('   3. Or use ngrok: ngrok http 3000');
console.log('   4. Test a payment to trigger the webhook');




























