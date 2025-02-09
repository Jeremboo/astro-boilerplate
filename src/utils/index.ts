export const validateEmail = (email: string) => email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

/*
 * * *******************
 * * MATH
 * * *******************
 */

// https://gist.github.com/Jeremboo/cb55bdbff02c96f89e23
export const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;
export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomElement = <T>(arr: T[], randomValue?: number) =>
  arr[Math.floor((randomValue || Math.random()) * arr.length)];

export const randomNumbers = (length: number) => {
  return String(Math.floor(Math.random() * 10 ** length)).padStart(length, '0');
};

export const lerp = (min: number, max: number, x: number) => min + x * (max - min);
export const inverseLerp = (min: number, max: number, x: number) => Math.max(0, Math.min(1, (x - min) / (max - min)));

// https://stackoverflow.com/questions/6137986/javascript-roundoff-number-to-nearest-0-5
export const roundHalf = (num: number) => {
  return Math.round(num * 2) / 2;
};

/*
 * * *******************
 * * OBJ
 * * *******************
 */

export const enumKeyFromValue = <T extends object>(_enum: T, value: any) =>
  Object.keys(_enum)[Object.values(_enum).indexOf(value)];

export const deepCopy = (obj: object) => JSON.parse(JSON.stringify(obj));

export const jsonToBody = (obj: object) =>
  Object.keys(obj).reduce((accumulator, key) => {
    let newContent = '';
    if (accumulator.length > 0) {
      newContent += '&';
    }
    const data = obj[key as keyof object];
    newContent += `${key}=${data}`;
    return accumulator + newContent;
  }, '');

/*
 * * *******************
 * * ASYNC
 * * *******************
 */

export const loadImg = (path: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = path;
    img.onload = () => resolve(img);
    img.onabort = reject;
  });
};

export const forEachAsync = <T, TResult>(arr: T[], asyncCallback: (option: T, idx: number) => Promise<TResult>) => {
  const promises: Promise<TResult>[] = [];
  arr.forEach((option, idx) => {
    promises.push(asyncCallback(option, idx));
  });
  return Promise.all(promises);
};

export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/*
 * * *******************
 * * CLIPBOARD
 * * *******************
 */

// https://stackoverflow.com/questions/69438702/why-does-navigator-clipboard-writetext-not-copy-text-to-clipboard-if-it-is-pro
export const copyToClipboard = async (text: string) => {
  if (typeof navigator !== 'undefined' && typeof navigator.clipboard !== 'undefined') {
    await navigator.clipboard.writeText(text);
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.classList.add('sr-only');
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (e) {
      document.body.removeChild(textarea);
      throw e;
    }
  } else {
    throw new Error('None of copying methods are supported by this browser!');
  }
};
