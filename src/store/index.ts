import { atom } from 'nanostores';

// TODO 2025-02-07 jeremboo: Make them persistent
export const $isSoundActive = atom(true);
export const $isMotionActive = atom(true);

export const $isMenuOpen = atom(false);

// If one popup is open
export const $isPopupOpen = atom(true);
