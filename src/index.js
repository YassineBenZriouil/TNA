#!/usr/bin/env node
const readline = require('readline');
const { handleCommand } = require('./commands');
const { COLORS, getTheme } = require('./colors');
const { themeManager } = require('ytui/src/theme');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '' // Set dynamically
});

const refreshPrompt = () => {
    const THEME = getTheme();
    rl.setPrompt(`${THEME.PROMPT}TNA>${COLORS.RESET} `);
};

(async () => {
    // Wait for theme configuration to load from DB
    await themeManager.init();

    refreshPrompt();
    const INITIAL_THEME = getTheme();

    console.log(`${INITIAL_THEME.BANNER}
  _______ _   _    _    
 |__   __| \\ | |  / \\   
    | |  |  \\| | / _ \\  
    | |  | . \` |/ ___ \\ 
    |_|  |_| \\_/_/   \\_\\
${COLORS.RESET}`);
    console.log(`${INITIAL_THEME.BODY}Terminal Notes App v1.0.0${COLORS.RESET}`);
    console.log(`${INITIAL_THEME.ID}Powered By YTUI (https://github.com/YassineBenZriouil/YTUI)${COLORS.RESET}`);
    console.log(`${INITIAL_THEME.ID}YTUI Powered by Node.js Blessed${COLORS.RESET}\n`);

    rl.prompt();
})();

rl.on('line', (line) => {
    handleCommand(line, (msg) => {
        console.log(msg);
    }, refreshPrompt); // Pass refresh callback
    setTimeout(() => rl.prompt(), 100);

}).on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
});
