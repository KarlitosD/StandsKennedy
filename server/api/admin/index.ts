import * as v from "valibot"

const bodySchema = v.object({
    password: v.string([v.minLength(1)])
})

type BodySchema = v.Output<typeof bodySchema>

export default defineEventHandler(async event => {
    const method = event.method
    const req = toWebRequest(event)
    req.method
    if(method !== "POST") {
        setResponseStatus(event, 405, "Method not allowed" )
        return { statusMessage: "Method not allowed", statusCode: 405 }
    }
    const config = useRuntimeConfig()
    const body = await readValidatedBody<BodySchema>(event, (data) => v.parse(bodySchema, data))
    const isAdmin = body.password === config.adminPassword
    return { isAdmin }
})
