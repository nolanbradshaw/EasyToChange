# EasyToChange

**EasyToChange**

"Did the thing I just did make the overall system easier or harder to change? Do it when you save a file. Do it when you write a test. Do it when you fix a bug." - David Thomas, Andrew Hunt in The Pragmatic Programmer

## Table of Contents

- [Installation](#installation)
- [Supported File Extensions](#supported-file-extensions)
- [Configuring Extra File Extensions](#configuring-extra-file-extensions)
- [Usage](#usage)

## Installation

1. **Open the Extensions View in VS Code:**
   - Click on the **Extensions** icon in the Activity Bar on the side of the window.
   - Alternatively, use the keyboard shortcut:
     - **Windows/Linux:** `Ctrl + Shift + X`
     - **macOS:** `⇧⌘X`

2. **Search and install the extension:**
   - Search for `Easy to Change`.
   - Select it and click install.

3. **Install:**
   - Click the **Install** button.

## Supported File Extensions

By default, EasyToChange supports editing the following file types:

- `.cpp`
- `.cs`
- `.go`
- `.java`
- `.js`
- `.jsx`
- `.kt`
- `.php`
- `.py`
- `.rb`
- `.rust`
- `.swift`
- `.ts`
- `.tsx`
- `.vb`

## Configuring Extra File Extensions

EYou can configure additional file extensions to support through VS Code settings:

1. Open VS Code settings.
2. Search for `Easy to Change`
3. Click edit in `settings.json`
4. Include extra extensions configuration in the file and save.

### Example Configuration

```json
{
    "easyToChange.extraExtensions": [
        ".json",
        ".html",
        ".md"
    ]
}
