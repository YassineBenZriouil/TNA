# TNA (Terminal Notes App)

A minimal, high-performance note retention tool designed for terminal power users who prioritize speed, efficiency, and data sovereignty.

TNA is engineered to eliminate the latency and distractions inherent in modern graphical applications. It operates entirely within the shell environment, providing instant access to information retrieval and storage.

## Security and Data Sovereignty

TNA is built with a "Zero-Trust" architecture regarding external connectivity.

*   **100% Local Storage**: All data is stored in a local SQLite database (`~/.tna/notes.db`) on your machine. No data is ever transmitted to the cloud.
*   **Offline First**: The application requires no internet connection, ensuring your data remains isolated from network vulnerabilities.
*   **German Security Standard**: Designed for users who demand absolute control over their information. If you value privacy and data ownership equivalent to strict data protection standards, TNA provides that assurance. Your notes never leave your hard drive.

## Features

*   **Instantaneous Startup**: The application initializes in milliseconds.
*   **Distraction-Free Environment**: A pure command-line interface with no visual clutter.
*   **Persistent Configuration**: Theme preferences and settings are stored locally via the YTUI framework.

## Installation

For standard users, no compilation or environment setup is required. The application is distributed as a self-contained, offline binary.

**Download Latest Release (v1.0.0):**

*   **Windows**: [Download TNA for Windows (x64)](https://github.com/USER/TUI/releases/download/v1.0.0/TNA.exe-win.exe)
*   **macOS**: [Download TNA for macOS (x64)](https://github.com/USER/TUI/releases/download/v1.0.0/TNA.exe-macos)
*   **Linux**: [Download TNA for Linux (x64)](https://github.com/USER/TUI/releases/download/v1.0.0/TNA.exe-linux)

> **Note on Security**: As this software is compiled for high-security environments, it is not signed by Apple or Microsoft. You may need to manually allow execution in your system settings (e.g., "Run Anyway").

## Developer / Source Installation

If you prefer to audit the source code and build from scratch:

```bash
# Clone and Install
git clone https://github.com/USER/TUI.git
npm install
npm run build-TNA
```

## Usage

### Command Reference

| Command | Action | Example |
| :--- | :--- | :--- |
| :new | Create a new note | `:new "Meeting" "Discuss Q1 goals"` |
| :list | vitalize all stored notes | `:list` |
| :delete | Remove a note permanently | `:delete 1` |
| :ytui theme | Change interface theme | `:ytui set theme red` |
| :help | Display command assistance | `:help` |
| :q | Terminate application | `:q` |

## Theming system

The application supports multiple high-contrast themes optimized for terminal legibility: `red`, `green`, `yellow`, `purple`, `cloud`, and `monokai`.

```bash
TNA> :ytui theme list
TNA> :ytui set theme green
```

## Architecture

*   **YTUI**: The underlying Terminal User Interface framework.
*   **blessed**: The low-level terminal interface library.

---
v1.0.0
