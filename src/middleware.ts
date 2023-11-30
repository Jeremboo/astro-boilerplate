// import { defineMiddleware } from 'astro:middleware';

// // https://blog.logrocket.com/working-astro-middleware/
// export const onRequest = defineMiddleware(({ locals, request }, next) => {
//   // intercept response data from a request
//   // optionally, transform the response by modifying `locals`
//   // locals.title = 'New title';

//   // return a Response or the result of calling `next()`
//   return next();
// });

import { sequence } from 'astro/middleware';
import { useAstroI18n } from 'astro-i18n';

// src / middleware.ts;
const astroI18n = useAstroI18n();

export const onRequest = sequence(astroI18n);
