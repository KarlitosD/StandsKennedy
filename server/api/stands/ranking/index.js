import { connection } from "@/server/db/client.js"

const handlers = {
    async GET(event){
        const [rows] = await connection.query("SELECT standId, COUNT(*) as votes ,stands.NAME FROM stands_user INNER JOIN stands ON stands.id = stands_user.standId GROUP BY stands_user.standId")
        console.log(rows)
        return rows
    },

}

export default defineEventHandler(async event => {
    const method = await getMethod(event)
    const handler = handlers[method]
    if(!handler) return { error: "Method not allowed" }
    return await handler(event)
})