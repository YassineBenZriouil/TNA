const blessed = require('ytui').blessed;

function createScreens(screen) {
    const sidebar = blessed.box({
        top: 0,
        left: 0,
        width: '25%',
        height: '100%',
        label: 'Commands',
        border: { type: 'line' },
        style: { border: { fg: 'cyan' } }
    });

    const main = blessed.box({
        top: 0,
        left: '25%',
        width: '75%',
        height: '100%',
        label: 'Notes',
        border: { type: 'line' },
        style: { border: { fg: 'green' } }
    });

    screen.append(sidebar);
    screen.append(main);

    return { sidebar, main };
}

module.exports = { createScreens };
