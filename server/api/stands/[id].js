import { connection } from "../../db/client.js"


const handlers = {
    async GET(event){
        const { stand } = event.context
        const params = getRouterParams(event)
        const [votes] = await connection.execute("SELECT voted FROM stands_user WHERE standId = ?", [params.id])
        return { ...stand, votes: votes.map(({ voted }) =>  voted) }
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

    const [stands] = await connection.execute("SELECT * FROM stands WHERE id = ?", [params.id])
    if(stands.length < 1){
        return { error: "404" }
    }
    event.context.stand = stands[0]
    const method = await getMethod(event)
    const handler = handlers[method]
    if(!handler) return { error: "Method not allowed" }
    return await handler(event)
})