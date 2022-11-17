import { uid } from "uid"

export default defineEventHandler(event => {
    let clientId = getCookie(event, "id")
    if (!clientId) {
        clientId = uid(10)
        setCookie(event, "id", clientId)
        console.log(event.req.url)
    }
    event.context.clientId = clientId

})