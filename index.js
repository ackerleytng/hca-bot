import sendDebugMessage from './src/common/sendDebugMessage.js';
import dispatch from './src/handlers/dispatch.js';
import handleMessage from './src/handlers/message.js';
import handleListUsers from './src/handlers/users.js';


async function handleRequest(event) {
  let ret;

  try {
    if (event.request.url.endsWith(`/webhook/${telegramWebHookToken}/`)) {
      const body = await event.request.json();
      ret = await dispatch(body);
    } else if (event.request.url.endsWith(`/listUsers/${hcaClientToken}/`)) {
      ret = await handleListUsers();
    } else if (event.request.url.endsWith(`/sendMessage/${hcaClientToken}/`)) {
      const body = await event.request.json();
      ret = await handleMessage(body);
    } else {
      ret = "Unknown endpoint";
    }
  } catch (err) {
    // Without event.waitUntil(), our fetch() to our logging service may
    // or may not complete.
    event.waitUntil(sendDebugMessage({errorStack: err.stack}));

    ret = err.stack || "No error stack!";
  }

  return new Response(JSON.stringify(ret), {
    headers: { 'Content-Type': 'application/json' },
  });
}

addEventListener('fetch', event => {
  // Have any uncaught errors thrown go directly to origin
  event.passThroughOnException()
  event.respondWith(handleRequest(event))
})
