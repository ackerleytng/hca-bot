import sendDebugMessage from './src/common/sendDebugMessage.js';
import dispatch from './src/handlers/dispatch.js';


async function handleRequest(event) {
  try {
    const body = await event.request.json();

    let ret;

    if (event.request.url.endsWith(`/webhook/${telegramWebHookToken}/`)) {
      ret = await dispatch(body);
    }

    return new Response(JSON.stringify(ret), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // Without event.waitUntil(), our fetch() to our logging service may
    // or may not complete.
    event.waitUntil(sendDebugMessage({errorStack: err.stack}));

    const stack = JSON.stringify(err.stack) || err;
    // Copy the response and initialize body to the stack trace
    const response = new Response(stack, response);
    // Shove our rewritten URL into a header to find out what it was.
    response.headers.set('X-Debug-stack', stack);
    response.headers.set('X-Debug-err', err);

    return response;
  }
}

addEventListener('fetch', event => {
  // Have any uncaught errors thrown go directly to origin
  event.passThroughOnException()
  event.respondWith(handleRequest(event))
})
