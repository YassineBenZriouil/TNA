# TNA (Terminal Notes App)

**A minimal, ultra-fast note-taking tool for your terminal.**

TNA removes the clutter of modern note apps. It launches instantly, runs entirely in your shell, and saves your thoughts immediately.

## 🚀 Features

- **Instant Startup**: Ready in milliseconds.
- **Zero-Distraction UI**: Just a clean prompt.
- **Persistent Theming**: Customize your experience with `ytui`.
- **Local Storage**: Notes are saved safely in your home directory.

## 📖 Usage

Start the app:
```bash
tna
# or
tna start
```

### Commands

| Command | Action | Example |
| :--- | :--- | :--- |
| `:new` | Create note | `:new "Meeting" "Discuss Q1 goals"` |
| `:list` | View notes | `:list` |
| `:delete` | Delete note | `:delete 1` |
| `:ytui theme` | Change color | `:ytui set theme red` |
| `:help` | Show help | `:help` |
| `:q` | Quit | `:q` |

## 🎨 Theming

Supported themes: `red`, `green`, `yellow`, `purple`, `cloud`, `monokai`.

```bash
TNA> :ytui theme list
TNA> :ytui set theme green
```

## ⚙️ Powered By
*   **YTUI**: The underlying TUI framework.
*   **blessed**: Terminal interface library.

---
*v1.0.0*
