# THENUKA SRI LANKA

An immersive, cinematic Sri Lankan travel discovery experience designed for **Thenuka Sri Lanka**.

## Run locally

```bash
npm start
```

The preview listens on `http://localhost:3000` (or the configured `PORT`). The app is intentionally dependency-light and loads GSAP/ScrollTrigger and fonts from CDNs.

## Build static output

```bash
npm run build
```

The build copies the standalone site into `dist/`.

## Integration seams

- `ai.js` exposes `travelAI.generateItinerary()` and `travelAI.search()` for a future AI endpoint.
- `data.js` stores destinations, hotels, experiences, gallery, food, weather demo data, planner stops and route templates.
- `map.js` is a self-contained canvas terrain enhancement with a non-WebGL dependency and can later be upgraded to a GLTF/Three.js terrain layer.
- Hotel BOOK / availability actions are intentionally UI-level until a real booking provider is connected.
- Weather and travel conditions are explicitly marked demo data until a live API is available.

## Brand requirements

The site name is always **THENUKA SRI LANKA** and the ownership credit is always **Designed, Created & Owned by Thenuka Sathmitha Jayasinghe**.
