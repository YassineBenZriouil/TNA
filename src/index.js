const { YTUIApp } = require('ytui');
const { setupCommands } = require('./commands');
const { createScreens } = require('./screens');

// Initialize TNA app
const app = new YTUIApp('TNA - Terminal Notes App');

// Replace default layout with TNA screens
app.layout = createScreens(app.screen);

// Setup commands
setupCommands(app);

// Initial refresh to show existing notes
require('./commands').refreshNotes(app);

// Optional: show command list in sidebar
app.layout.sidebar.setContent('Commands:\n:new [text]\n:list\n:delete [id]\n:q to quit');

// Start the app
app.start();
