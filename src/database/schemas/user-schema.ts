import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('users', {
  id: text('id').primaryKey().notNull(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  picture: text('picture'),
  email: text('email'),
  phone: text('phone'),
  email_confirmed_at: text('email_confirmed_at').notNull(),
});