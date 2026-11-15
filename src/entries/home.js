import { boot } from '../boot.js';
import * as home from '../home.js';

// First visit shows the poster loader (React + poster chunk). Start fetching it now,
// in parallel with the rest of boot, instead of waiting for boot to reach the loader.
if (document.documentElement.classList.contains('lift-closed')) import('../react/poster.tsx');

boot(home);
