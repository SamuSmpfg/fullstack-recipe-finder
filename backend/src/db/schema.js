import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

// Defindo a Favorites Table com as "rotas" que precisam ter nelas

export const favoritesTable = pgTable('favorites', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    recipeId: integer('recipe_id').notNull(),
    title: text('title').notNull(),
    image: text('image'),
    cookTime: text('cook_time'),
    servings: text('servings'),
    createdAt: timestamp('created_ad').defaultNow()
})