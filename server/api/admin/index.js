export default defineEventHandler(async event => {
    const method = getMethod(event)
    if(method !== "POST") return { statusMessage: "Method not allowed", statusCode: 405 }
    const config = useRuntimeConfig()
    const body = await readBody(event)
    const isAdmin = body.password === config.adminPassword
    return { isAdmin }
})