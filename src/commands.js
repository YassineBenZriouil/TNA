const { commands: baseCommands } = require('ytui/commands');
const { addNote, getNotes, deleteNote } = require('./storage');

function setupCommands(app) {
    // Add note
    baseCommands.new = (args) => {
        const content = args.join(' ');
        if (!content) return;
        addNote(content, (err, id) => {
            if (err) console.error('Add note error:', err);
            else refreshNotes(app);
        });
    };

    // List notes
    baseCommands.list = () => {
        refreshNotes(app);
    };

    // Delete note by index
    baseCommands.delete = (args) => {
        const id = parseInt(args[0]);
        if (isNaN(id)) return;
        deleteNote(id, (err) => {
            if (err) console.error('Delete error:', err);
            else refreshNotes(app);
        });
    };
}

// Refresh main panel
function refreshNotes(app) {
    getNotes((err, rows) => {
        if (err) console.error(err);
        else {
            const text = rows.map(r => `${r.id}: ${r.content}`).join('\n') || 'No notes yet';
            app.layout.main.setContent(text);
            app.screen.render();
        }
    });
}

module.exports = { setupCommands, refreshNotes };
