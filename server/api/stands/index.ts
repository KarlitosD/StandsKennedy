import type { Handlers } from "@/server/utils/createHandler"

import { db } from "@/server/db/client"
import { uid } from "uid"

const getStandsQuery = db.select().from(stands).prepare("get_stands")

const handlers: Handlers = {
    async GET(event){
        const standsCollection = await getStandsQuery.execute()
        // const standsCollection = await db.query.stands.findMany()
        return standsCollection 
    },
    async POST(event){
        const { name } = await readBody<{ name: string }>(event)
        const newStand = { id: uid(3), name }
        await db.insert(stands).values(newStand)
        return newStand
    }
}

export default defineEventHandler(async event => {
    return await createHandler(event, handlers)
})