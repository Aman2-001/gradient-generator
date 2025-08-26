# Auto-Playing Unmuted Video

This project creates a simple HTML page with a video that automatically plays unmuted when you enter or reload the page.

## Features

- ✅ Autoplay video on page load/reload
- ✅ Always unmuted (never muted)
- ✅ Infinite loop
- ✅ No controls or progress bar visible
- ✅ Full viewport coverage
- ✅ Handles browser autoplay restrictions
- ✅ Maintains unmuted state even if browser tries to mute

## Files

- `index.html` - Main HTML structure
- `style.css` - CSS styling to hide controls and make video fullscreen
- `script.js` - JavaScript to ensure video is always unmuted
- `README.md` - This documentation

## Setup

1. Add your video file(s) to the project directory:
   - `sample-video.mp4` (recommended format)
   - `sample-video.webm` (fallback format)

2. Open `index.html` in a web browser

## Video Requirements

- Use MP4 format for best compatibility
- Consider adding a WebM version for broader browser support
- Keep file size reasonable for faster loading

## How It Works

### HTML
- Video element with `autoplay`, `loop`, `muted` (initially), and `playsinline` attributes
- No `controls` attribute to hide all video controls

### CSS
- Full viewport coverage with `object-fit: cover`
- Explicitly hides all webkit media controls
- Removes scroll bars and sets black background

### JavaScript
- Immediately attempts to unmute and play video on page load
- Handles browser autoplay restrictions by waiting for user interaction
- Monitors volume changes and prevents muting
- Maintains unmuted state when tab becomes visible again
- Prevents context menu and double-click controls

## Browser Compatibility

Most modern browsers have autoplay restrictions for unmuted videos. The JavaScript handles this by:

1. Initially trying to play unmuted
2. If blocked, waiting for any user interaction (click, keypress, touch)
3. Once user interacts, the video will play unmuted
4. All subsequent page loads/reloads will remember this permission

## Testing

Open `index.html` in your browser. The video should:
- Start playing automatically
- Be unmuted (you should hear audio)
- Loop continuously
- Have no visible controls
- Fill the entire viewport

If the video doesn't play unmuted immediately, click anywhere on the page once.
