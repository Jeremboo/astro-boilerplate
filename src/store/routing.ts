// https://github.com/nanostores/nanostores#guide
import { atom } from 'nanostores';

/*
 * * *******************
 * * ANIMATED ROUTE
 * * *******************
 */

// TODO 2023-12-04 jeremboo: HRM error here. Check https://github.com/vitejs/vite/issues/3301 to see how to solve it
export const $currentRouteAnimated = atom<string>('/');