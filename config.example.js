/**
 * GitHub Gist Storage Configuration Template
 * 
 * SETUP INSTRUCTIONS:
 * 1. Copy this file and rename it to: config.js
 * 2. Fill in your actual values below
 * 3. Make sure config.js is in .gitignore (so you don't commit your token)
 * 
 * For detailed setup instructions, see: docs/GITHUB_GIST_SETUP.md
 */

window.GITHUB_CONFIG = {
    token: 'YOUR_GITHUB_TOKEN_HERE',      // Replace with your Classic Token (starts with ghp_)
    gistId: 'YOUR_GIST_ID_HERE',          // Replace with your Gist ID (32 character hex string)
    username: 'YOUR_GITHUB_USERNAME'      // Replace with your GitHub username
};

// Debug: Verify token format (check console for details)
console.log('🔍 Token Debug:', {
    tokenLength: window.GITHUB_CONFIG.token.length,
    tokenStart: window.GITHUB_CONFIG.token.substring(0, 10) + '...',
    gistIdLength: window.GITHUB_CONFIG.gistId.length,
    gistIdFormat: window.GITHUB_CONFIG.gistId.length === 32 ? '✅ Valid' : '❌ Invalid'
});

