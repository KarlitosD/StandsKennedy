import { connection } from "@/server/db/client.js"

const handlers = {
    async GET(event){
        try {
            const [rows] = await connection.query(`
                SELECT standId, COUNT(standId) as votes ,stands.name 
                    FROM stands_user INNER JOIN stands ON stands.id = stands_user.standId 
                    GROUP BY stands_user.standId ORDER BY COUNT(standId) DESC
            `)
            const stands = rows.map(stand => ({ ...stand, votes: Number(stand.votes)}))
            return stands
        } catch (err) {
            console.log(err.message)
            return []
        }
    },

}

export default defineEventHandler(async event => {
    const method = await getMethod(event)
    const handler = handlers[method]
    if(!handler) return { error: "Method not allowed" }
    return await handler(event)
})