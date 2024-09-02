// ============================================================================================
//
// sendrequest.js -- Export a Simplified Function for Sending & Receiving HTTP Requests
//
// ============================================================================================

/*
"sendRequest()" is a simplified function for sending and receiving HTTP requests.  The caller
need only provide the request method, the resource locator (URL), a body to include (if any)
and the body's MIME content type (if any).  The function handles the transmission and receipt
of the response and automatically converts a received body to an appropriate form.

This saves a couple-dozen of lines of code in the caller's source file.
*/

// ============================================================================================
// GLOBAL CONSTANTS
// ============================================================================================

// array of all valid HTTP request methods
const validMethods = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
  "PATCH"
];

// ============================================================================================
// FUNCTION DEFINITION
// ============================================================================================

/*********************************************************************************************/

export default async function sendRequest(method, resource, headers = null, body = null) {
  /*
  Send an HTTP request and return the response and the resource.

  "method" is the HTTP request method (see
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods for valid methods).  "resource" is
  the URL for the resource being requested.  "body" (optional) is the data to be sent as the
  request's body (note that "GET" and "HEAD" requests don't support bodies).  If "body" is
  specified then "contentType" MUST be the MIME type for "body".

  Return the response from the server (if any) and the body of the response (if any) in an
  array.

  If the server couldn't be reached then the response will be null.  If the response's body (if
  any) will be automatically converted to its appropriate type -- for example, if it's a JSON
  object then the body will be a JavaScript object.
  */

  /*
  First, validate the arguments and build the "fetch()" options.
  */

  const options = {
    // options to be passed to "fetch()"
    method,
    mode: "cors"
  };

  if (headers) options.headers = headers;

  if (!validMethods.includes(method))
    throw new Error(`"${method}" is not a valid HTTP request method`);

  if (body !== null) {
    if (method === "GET" || method === "HEAD")
      throw new Error('"body" can\'t be included in a GET or HEAD request');

    // Skip Content-Type header check if body is FormData as the browser will set the `Content-Type` header automatically, but still enforce this requirement for other body types
    if (!(body instanceof FormData)) {
      if (headers === null || !headers.get("Content-Type"))
        throw new Error('If "body" is specified then a "Content-Type" header must be included');
    }

    options.body = body;
  }

  /*
  Next, fetch the resource and analyze the response.  Use a "try-catch" block to gracefully
  handle an unfulfilled promises (such as never actually receiving a response).
  */

  let response = null; // the response from the server (if any)
  let data = null; // the converted body in that response (if any)

  try {
    response = await fetch(resource, options);

    if (response.body) {
      /*
      Recognize the following MIME types and convert accordingly:

      * "<x>/json" -- convert anything that's JSON to an object
      * "text/<x>" -- after that, convert anything that's text to a string

      Convert data of all other MIME types to BLOB's.
      */

      const dataType = response.headers.get("Content-Type");

      if (dataType.search(/^[^/]+\/json(?:\W|$)/i) === 0) data = await response.json();
      else if (dataType.search(/^text\/\w+/i) === 0) data = await response.text();
      else data = await response.blob();
    }
  } catch {
    /*
    Execution can resume directly if there's an exception.  Anything that wasn't received or
    processed will be returned as null.
    */
  }

  return [response, data];
}

// ============================================================================================
// EXPORTS
// ============================================================================================

export { sendRequest };
