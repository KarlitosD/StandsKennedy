import { relations } from "drizzle-orm"
import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core"


export const stands = pgTable("stands", {
    id: varchar("id", { length: 5 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
})

export const standsRelations = relations(stands, ({ many }) => ({
    voter: many(stands_user)
}))

export type Stand = typeof stands.$inferSelect

export const stands_user = pgTable("stands_user", {
    standId: varchar("standId", { length: 5 }).notNull(),
    voted: varchar("voted", { length: 12 }).notNull(),
}, table => ({
    pk: primaryKey(table.standId, table.voted),
}))


export const stands_user_relations = relations(stands_user, ({ one }) => ({
    stand: one(stands, { fields: [stands_user.standId], references: [stands.id] })
}))


