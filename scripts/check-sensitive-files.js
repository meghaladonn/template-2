#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// List of sensitive files and patterns to check
const sensitivePatterns = [
  '.env',
  '.env.local',
  '.env.*',
  '*.pem',
  '*.key',
  '*.cert',
  '*.crt',
  'id_rsa',
  'id_dsa',
  '*.p12',
  '*.pfx',
  '*.pem',
  '*.key',
  '*.cert',
  '*.crt',
  'config.json',
  'credentials.json',
  'secrets.json',
  'api-keys.json',
];

// Get list of staged files
const stagedFiles = execSync('git diff --cached --name-only', {
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

// Check each staged file against sensitive patterns
const sensitiveFiles = stagedFiles.filter((file) =>
  sensitivePatterns.some((pattern) => {
    const regex = new RegExp(pattern.replace('.', '\\.').replace('*', '.*'));
    return regex.test(file);
  })
);

if (sensitiveFiles.length > 0) {
  console.error('\n🚫 Error: Attempting to commit sensitive files:');
  sensitiveFiles.forEach((file) => console.error(`   - ${file}`));
  console.error('\nPlease remove these files from your commit.');
  console.error(
    'If these files are necessary, consider using environment variables instead.'
  );
  process.exit(1);
}

process.exit(0);
