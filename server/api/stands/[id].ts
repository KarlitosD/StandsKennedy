import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db/client"
import { Handlers } from "@/server/utils/createHandler";

const votesByIdQuery = db.select({ voted: stands_user.voted }).from(stands_user).where(eq(stands_user.standId, sql.placeholder("id"))).prepare("votes_by_id")

const handlers: Handlers = {
    async GET(event){
        const params = getRouterParams(event)
        const stand = event.context.stand!
    
        const votes = await votesByIdQuery.execute({ id: params.id })

        const standResult = { ...stand, votes: votes.map(({ voted }) => voted) }
        return standResult
    },
    async POST(event){
        const { clientId } = event.context
        const params = getRouterParams(event)
        await db.insert(stands_user).values({ standId: params.id, voted: clientId })
        return { message: "Voted" }
    },
    async DELETE(event){
        const params = getRouterParams(event)
        await db.delete(stands).where(eq(stands.id, params.id))
        return { message: "Deleted" }
    }
}

export default defineEventHandler(async event => {
    const params = getRouterParams(event)

    const stand = await db.query.stands.findFirst({
        where: eq(stands.id, params.id)
    })

    if(stand === undefined){
        setResponseStatus(event, 404)
        return { error: "Not found" }
    }
        
    event.context.stand = stand

    return await createHandler(event, handlers)
})
