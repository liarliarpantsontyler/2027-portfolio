# Klocky portfolio capture

Source: latest local Klocky app in the sibling `Klocky` directory. Work from a temporary copy so capture setup cannot change the product checkout. Never capture private account data; use a clean local profile, manual America/Chicago timezone, English locale, and no account.

## Delivery contract

- Six clock clips: Meridian, Fold, Sunday, Lucent, Index, Quarters; 12–16 seconds each.
- Landscape: 844 × 390 CSS pixels at 3× output (2532 × 1170).
- Portrait: 390 × 844 CSS pixels at 3× output (1170 × 2532).
- Motion enabled; wait for fonts and ready shader canvases before the first frame.
- Render 60 distinct source frames per second. Do not interpolate or duplicate low-rate captures to claim 60 fps.
- Export H.264, yuv420p, CRF 18, fast-start MP4 without audio. Generate fresh WebP posters from the same footage.
- Retain actual product animation timing. No artificial motion layered on still screenshots.
- Use continuous capture through each interaction. Hold outcomes; do not cut out intermediate steps.

## Shot list

| File | Framing | Sequence |
| --- | --- | --- |
| `meridian.mp4` through `quarters.mp4` | Landscape | Preset in ambient mode, controls hidden, 14-second loop with a short matched dissolve at the boundary |
| `hero.mp4` | Landscape | Current welcome carousel drifting naturally for 14 seconds |
| `onboarding.mp4` | Portrait | Welcome (3s), Get Started, time/place (4s), manual timezone and format selection (6s), Choose a Clock, inspect/select Meridian (7s), finished display (8s) |
| `customization.mp4` | Portrait | Meridian display (3s), open editor (3s), select Chroma background (5s), choose Fold (5s), select Antonio (5s), close editor and hold result (7s) |
| `fullscreen.mp4` | Landscape | Sunday with controls initially visible; allow automatic fade, then hold ambient result for 14 seconds total |

Use a short fade at demo replay boundaries. For the six ambient loops, match the outgoing/incoming background with a short dissolve without ghosting different clock digits. Record a consistent date/time within a single minute for each loop.

## Verification

1. Validate Index first: inspect fine dot detail, distinct consecutive frames, and motion cadence before the full batch.
2. Inspect metadata: dimensions, 60 fps, duration, no audio, and fast-start container.
3. Watch full demos and two cycles of each loop; reject clipping, skipped steps, stutters, blurry text, and abrupt seams.
4. Verify desktop/mobile presentation, browser playback, keyboard pause/resume, reduced-motion posters, near-viewport loading, offscreen/background pausing, and media failure fallback.
5. Run TypeScript and a production build in an isolated temporary copy if a development server is running on port 3000.

## Capture tooling and reproducibility

The refresh was rendered from Klocky commit `aa2d300` (September 20, 2026). The product checkout was left unchanged. `scripts/capture-klocky.mjs` uses the sibling app's installed Playwright dependency; the portfolio does not need another runtime dependency.

1. Copy Klocky to a temporary directory, excluding `.git`, `node_modules`, `dist`, test output, and old capture assets. Symlink its installed `node_modules` and set Vite's `cacheDir` inside the temporary directory.
2. In that temporary copy only, raise the shader renderer's DPR cap from 2 to 3 and its pixel budget from 2,200,000 to 8,000,000. This renders fresh high-resolution shader detail rather than enlarging old recordings. Start Vite on `http://127.0.0.1:5173`.
3. Run `node scripts/capture-klocky.mjs sample` before the batch. The capture script advances the real product's animation callbacks, timers, and CSS animations at 1/60-second intervals and renders every frame. Capture wall-clock speed does not affect playback cadence. Intermediate frames use maximum-quality JPEG; sample/inspection stills use PNG. Intermediate H.264 uses CRF 16; delivery uses CRF 18.
4. Render each named shot with `node scripts/capture-klocky.mjs <name>`, then run `node scripts/encode-klocky.mjs <name>`. Supported final names are the six clock IDs, `hero`, `onboarding`, `customization`, and `fullscreen`. `KLOCKY_ROOT`, `KLOCKY_URL`, and `CAPTURE_OUT` override the source dependency directory, preview URL, and temporary output directory.
5. Run `python3 scripts/check-klocky-media.py` for dimensions, frame count, duplicate-frame, fast-start, and seam diagnostics. Run `node scripts/verify-klocky.mjs` for Chromium/WebKit desktop/mobile playback checks (`PORTFOLIO_URL` defaults to localhost:3000).

All display loops use September 20 at 3:24 PM in Chicago so loop boundaries do not ghost changing digits. Motion remains enabled. Onboarding begins with the device timezone set to New York and visibly changes to Chicago. Its 24-hour/12-hour selections are both shown.

Hero uses a 1688×780 CSS viewport at 1.5× to fit the complete welcome screen without clipping its controls; output remains 2532×1170. Other landscape shots use 844×390 at 3×. Portrait shots use 390×844 at 3×.

The final customization sequence selects **Chroma → Fold → Antonio**, scrolls back to confirm the selected font, closes the editor at 24 seconds, and holds the result through 32 seconds. The app's transitions remain in place; CSS/Web Animations are sampled on the capture timeline. Scrolling is stepped continuously with easing and recorded on every frame.

All six display loops are 14 seconds after a one-second matched dissolve with eased blending at both ends. Hero and immersive display are 14 seconds; onboarding is 30 seconds; customization is 32 seconds. The demos use brief fades only at replay boundaries, with no interior cuts.

## Refresh validation

The delivered ten clips passed the resolution, exact 60 fps, duration, silent-track, and fast-start checks. Every clip had zero consecutive duplicate decoded frames. The six ambient clips completed more than two playback cycles together in Chromium with less than 1% dropped frames during concurrent rendering. The four final demos played end-to-end without media errors, dropping only 1–2 frames per clip in the desktop Chromium check. These measurements describe this local test environment, not every device/network.

Chromium and WebKit checks passed at desktop and mobile sizes for autoplay, nearby loading, keyboard pause/resume, document-visibility event handling, offscreen pausing, reduced-motion posters, failed-media fallback, and horizontal overflow. TypeScript and the isolated Next.js production build passed. No publishing was performed.
