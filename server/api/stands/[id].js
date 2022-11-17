import { connection } from "../../db/client.js"


const handlers = {
    async GET(event){
        const params = getRouterParams(event)
        const [stand] = await connection.execute("SELECT * FROM stands_user WHERE standId = ?", [params.id])
        // const voted = stand.votes.includes(id)
        return stand
    },
    async POST(event){
        const { clientId } = event.context
        const params = getRouterParams(event)
        await connection.execute("INSERT INTO stands_user VALUES (?, ?)", [params.id, clientId])
        return { message: "Voted" }
    }
}

export default defineEventHandler(async event => {
    const params = getRouterParams(event)
    // if(!stand) throw createError({ statusCode: 404, statusMessage: 'Stand no fue encontrado' })
    // event.context.stand = stand
    const [stand] = await connection.execute("SELECT * FROM stands WHERE id = ?", [params.id])
    if(stand.length < 1){
        console.log(stand.length)
        return { error: "404" }
    }
    const method = await getMethod(event)
    const handler = handlers[method]
    if(!handler) return { error: "Method not allowed" }
    return await handler(event)
})