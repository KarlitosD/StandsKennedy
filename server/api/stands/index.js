import { connection } from "@/server/db/client.js"
import { uid } from "uid"

const handlers = {
    async GET(event){
        const [rows] = await connection.query("SELECT * FROM stands")
        console.log(rows)
        return rows
    },
    async POST(event){
        
        const { name } = await readBody(event)
        const newStand = { 
            id: uid(3),
            name,
            votes: []
        }
        const res = await connection.execute(`INSERT INTO stands VALUES ('${newStand.id}', '${name}' );`)
        console.log(res[0])
        return newStand
    }
}

export default defineEventHandler(async event => {
    const method = await getMethod(event)
    const handler = handlers[method]
    if(!handler) return { error: "Method not allowed" }
    return await handler(event)
})