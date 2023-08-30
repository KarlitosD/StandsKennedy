import type { H3Event, HTTPMethod } from "h3" 

export type Handlers = Partial<Record<HTTPMethod, (event: H3Event) => Promise<any>>>

/**
 * Asynchronously creates a handler function that takes in an H3Event and a
 * Handlers object. It awaits the getMethod function to get the HTTP method from
 * the H3Event, gets the corresponding handler function from the Handlers object
 * based on the HTTP method, and then calls the handler function with the H3Event.
 * If no handler function is found, it sets the response status code to 405 and
 * returns an error object with a "Method not allowed" message.
 *
 * @param {H3Event} event - the H3Event object to be passed to the handler
 * function
 * @param {Handlers} handlers - an object of HTTP method keys with their
 * corresponding handler functions as values
 * @return {Promise<any>} a Promise that resolves to the value returned by the
 * handler function
 */
export const createHandler = async(event: H3Event, handlers: Handlers) => {
    try {
        const method = await getMethod(event)
        const handler = handlers[method]
        if(!handler) {
            setResponseStatus(event, 405)
            return { error: "Method not allowed" }
        }
        return await handler(event)
    } catch(error){
        setResponseStatus(event, 500)
        if(error instanceof Error){
            return { error: error.message }
        }
        return { error }
    }
}
