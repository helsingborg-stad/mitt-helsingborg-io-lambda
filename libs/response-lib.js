export const success = (body) => buildResponse(200, body);
export const failure = (body) => buildResponse(500, body);

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.parse(JSON.stringify(body)),
  };
}
