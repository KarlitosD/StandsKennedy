import type { Handlers } from "@/server/utils/createHandler"

import { db } from "@/server/db/client"
import { desc, eq, sql } from "drizzle-orm"
// import { stands_user, stands } from "~/server/db/schema"

const rankingQuery = db
                .select({ standId: stands_user.standId, name: stands.name, votes: sql`count(${stands_user.standId})` })
                .from(stands_user)
                .innerJoin(stands, eq(stands.id, stands_user.standId))
                .groupBy(stands_user.standId, stands.name)
                .orderBy(desc(sql`count(${stands_user.standId})`))
                .prepare("ranking")

const handlers: Handlers = {
    async GET(event) {
        try {
            const rows = await rankingQuery.execute()

            const standsCollection = rows.map(stand => ({ ...stand, votes: Number(stand.votes) }))
            return standsCollection
        } catch (err) {
            if (err instanceof Error){
                console.log(err.message)
            }
            return []
        }
    },

}

export default defineCachedEventHandler(async event => {
    return await createHandler(event, handlers)
})