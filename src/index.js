import { createFactory } from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';
import {
  json,
  send,
  sendError,
} from 'micro';

export default async function renderService(request, response) {
  if (request.method !== 'POST') {
    send(response, 405, {
      type: 'REQUEST_RENDER',
      error: true,
      payload: {
        message: 'Invalid HTTP method',
      },
    });
  }

  try {
    const {
      component = '',
      data = '{}',
    } = await json(request);

    const Component = require(path.resolve(component));

    const html = renderToString(
      createFactory(Component)(JSON.parse(data))
    );

    send(response, 200, html);
  } catch (error) {
    console.error(error);
    sendError(request, response, error);
  }
}
