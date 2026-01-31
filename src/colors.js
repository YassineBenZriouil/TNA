const { themeManager } = require('ytui/src/theme');

const COLORS = {
    RESET: '\x1b[0m',
    BRIGHT: '\x1b[1m',
    DIM: '\x1b[2m',
    UNDERSCORE: '\x1b[4m',

    FG_BLACK: '\x1b[30m',
    FG_RED: '\x1b[31m',
    FG_GREEN: '\x1b[32m',
    FG_YELLOW: '\x1b[33m',
    FG_BLUE: '\x1b[34m',
    FG_MAGENTA: '\x1b[35m',
    FG_CYAN: '\x1b[36m',
    FG_WHITE: '\x1b[37m',
};

// Map YTUI generic color names to ANSI codes
const COLOR_MAP = {
    'black': COLORS.FG_BLACK,
    'red': COLORS.FG_RED,
    'green': COLORS.FG_GREEN,
    'yellow': COLORS.FG_YELLOW,
    'blue': COLORS.FG_BLUE,
    'magenta': COLORS.FG_MAGENTA,
    'cyan': COLORS.FG_CYAN,
    'white': COLORS.FG_WHITE,
    // Hex codes support is limited in basic ANSI, mapping roughly or defaulting to white
    '#ff007f': COLORS.FG_MAGENTA,
    '#66d9ef': COLORS.FG_CYAN,
    '#a6e22e': COLORS.FG_GREEN,
    '#272822': COLORS.FG_BLACK,
    '#f8f8f2': COLORS.FG_WHITE,
    '#75715e': COLORS.FG_YELLOW,
    '#f92672': COLORS.FG_RED,
    '#fd971f': COLORS.FG_YELLOW
};

function getAnsi(colorName) {
    return COLOR_MAP[colorName] || COLORS.FG_WHITE;
}

function getTheme() {
    const t = themeManager.get();
    const c = t.colors;

    return {
        PROMPT: getAnsi(c.secondary) + COLORS.BRIGHT,
        SUCCESS: getAnsi(c.success),
        ERROR: getAnsi(c.error),
        TITLE: getAnsi(c.primary) + COLORS.BRIGHT,
        ID: getAnsi(c.warning) + COLORS.DIM,
        BODY: getAnsi(c.fg),
        BANNER: getAnsi(c.primary) + COLORS.BRIGHT
    };
}

module.exports = { COLORS, getTheme };
