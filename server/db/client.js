import postgres from 'postgres'

const config = useRuntimeConfig()
export const sql = postgres(config.db.url)