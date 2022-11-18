import { uid } from "uid"

export default defineEventHandler(event => {
    let clientId = getCookie(event, "id")
    if (!clientId) {
        clientId = uid(10)
        setCookie(event, "id", clientId)
    }
    event.context.clientId = clientId

})