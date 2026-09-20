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
| `customization.mp4` | Portrait | Meridian display (3s), open editor (3s), select Chroma background (5s), choose a different layout (5s), select a font (5s), close editor and hold result (7s) |
| `fullscreen.mp4` | Landscape | Sunday with controls initially visible; allow automatic fade, then hold ambient result for 14 seconds total |

Use a short fade at demo replay boundaries. For the six ambient loops, match the outgoing/incoming background with a short dissolve without ghosting different clock digits. Record a consistent date/time within a single minute for each loop.

## Verification

1. Validate Index first: inspect fine dot detail, distinct consecutive frames, and motion cadence before the full batch.
2. Inspect metadata: dimensions, 60 fps, duration, no audio, and fast-start container.
3. Watch full demos and two cycles of each loop; reject clipping, skipped steps, stutters, blurry text, and abrupt seams.
4. Verify desktop/mobile presentation, browser playback, keyboard pause/resume, reduced-motion posters, near-viewport loading, offscreen/background pausing, and media failure fallback.
5. Run TypeScript and a production build in an isolated temporary copy if a development server is running on port 3000.
