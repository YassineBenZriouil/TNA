const { addNote, getNotes, deleteNote } = require('./storage');
const { COLORS, getTheme } = require('./colors');
// Deep require for now until YTUI index exports it
const { themeManager } = require('ytui/src/theme');

function handleCommand(input, print, updatePrompt) {
    const THEME = getTheme();
    const args = input.trim().split(/\s+/);

    const cmd = args[0];

    if (cmd === ':new') {
        // Matches :new "Title" "Body"
        const fullArgs = input.slice(4).trim(); // remove ':new '
        const regex = /(['"])(.*?)\1\s+(['"])(.*?)\3/;
        const match = fullArgs.match(regex);

        if (match) {
            const title = match[2];
            const content = match[4];
            addNote(title, content, (err, id) => {
                if (err) print(`${THEME.ERROR}Error: ${err.message}${COLORS.RESET}`);
                else print(`${THEME.SUCCESS}Note "${title}" added.${COLORS.RESET}`);
            });
        } else {
            print(`${THEME.ERROR}Usage: :new "Title" "Body"${COLORS.RESET}`);
        }
    }
    else if (cmd === ':list') {
        getNotes((err, rows) => {
            if (err) print(`${THEME.ERROR}Error: ${err.message}${COLORS.RESET}`);
            else {
                if (rows.length === 0) {
                    print(`${THEME.BODY}No notes yet.${COLORS.RESET}`);
                } else {
                    const text = rows.map(r => {
                        const title = r.title ? r.title : '(No Title)';
                        return `${THEME.ID}[${r.id}]${COLORS.RESET} ${THEME.TITLE}${title}${COLORS.RESET}\n    ${THEME.BODY}${r.content}${COLORS.RESET}`;
                    }).join('\n\n');
                    print(text);
                }
            }
        });
    }
    else if (cmd === ':delete') {
        const id = parseInt(args[1]);
        if (isNaN(id)) {
            print(`${THEME.ERROR}Usage: :delete [id]${COLORS.RESET}`);
            return;
        }
        deleteNote(id, (err) => {
            if (err) print(`${THEME.ERROR}Error: ${err.message}${COLORS.RESET}`);
            else print(`${THEME.SUCCESS}Note ${id} deleted.${COLORS.RESET}`);
        });
    }
    else if (cmd === ':ytui') {
        if (args[1] === 'theme' && args[2] === 'list') {
            const themes = themeManager.getThemes().join(', ');
            print(`${THEME.BANNER}Available Themes:${COLORS.RESET} ${THEME.BODY}${themes}${COLORS.RESET}`);
        } else if (args[1] === 'set' && args[2] === 'theme') {
            const name = args[3];
            if (themeManager.setTheme(name)) {
                // Refresh theme for this message
                const NEW_THEME = getTheme();
                print(`${NEW_THEME.SUCCESS}YTUI Theme set to: ${name}${COLORS.RESET}`);
                if (updatePrompt) updatePrompt();
            } else {
                print(`${THEME.ERROR}Unknown theme: ${name}${COLORS.RESET}`);
            }
        } else {
            print(`${THEME.ERROR}Usage: :ytui theme list | :ytui set theme [name]${COLORS.RESET}`);
        }
    }
    else if (cmd === ':help' || cmd === 'help' || (cmd === 'tna' && args[1] === 'help')) {
        print(
            `${THEME.BANNER}Available Commands:${COLORS.RESET}\n` +
            `  ${THEME.TITLE}:new "Title" "Body"${COLORS.RESET}  ${THEME.BODY}Create a new note${COLORS.RESET}\n` +
            `  ${THEME.TITLE}:list${COLORS.RESET}                  ${THEME.BODY}View all notes${COLORS.RESET}\n` +
            `  ${THEME.TITLE}:delete [id]${COLORS.RESET}           ${THEME.BODY}Delete a note by ID${COLORS.RESET}\n` +
            `  ${THEME.TITLE}:ytui theme list${COLORS.RESET}       ${THEME.BODY}List available themes${COLORS.RESET}\n` +
            `  ${THEME.TITLE}:ytui set theme [name]${COLORS.RESET} ${THEME.BODY}Set current theme${COLORS.RESET}\n` +
            `  ${THEME.TITLE}:help${COLORS.RESET}                  ${THEME.BODY}Show this help message${COLORS.RESET}\n` +
            `  ${THEME.TITLE}:q${COLORS.RESET}                     ${THEME.BODY}Quit the application${COLORS.RESET}`
        );
    }
    else if (cmd === ':q' || cmd === 'exit') {
        process.exit(0);
    }
    else {
        if (input.trim()) print(`${THEME.ERROR}Unknown command. Type :help for usage.${COLORS.RESET}`);
    }
}

module.exports = { handleCommand };
