import { sql } from "@/server/db/client.js"
import { uid } from "uid"

const handlers = {
    async GET(event){
        // const [stands] = await connection.query("SELECT * FROM stands")
        const stands = await sql`select * from stands`
        return stands
    },
    async POST(event){
        const { name } = await readBody(event)
        const newStand = { id: uid(3), name }
        await sql`INSERT INTO stands VALUES (${newStand.id}, ${name})`
        return newStand
    }
}

export default defineEventHandler(async event => {
    const method = await getMethod(event)
    const handler = handlers[method]
    if(!handler) return { error: "Method not allowed" }
    return await handler(event)
})