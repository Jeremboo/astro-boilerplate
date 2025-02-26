import { atom } from 'nanostores';

// TODO 2025-02-07 jeremboo: Make them persistent
export const $isSoundActive = atom(true);
export const $isMotionActive = atom(true);


// TODO 2025-02-26 jeremboo: Should not be necessary
export const $isMenuOpen = atom(false);