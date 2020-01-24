import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  return success({
    jsonapi: {
      version: '1.0',
      meta: {
        service: 'mitt-helsingborg-io',
        owner: 'Helsingborg Stad',
        description: 'Main touchpoint for mitt helsingborg app, webpage and assistants.',
      },
    },
  });
}
