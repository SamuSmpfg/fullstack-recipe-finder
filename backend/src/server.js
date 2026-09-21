import express from 'express'
import { ENV } from './config/env.js'
import { db } from './config/db.js'
import { favoritesTable } from './db/schema.js'
import { and, eq } from 'drizzle-orm'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/api/health', (req,res) => {
    res.status(200).json({success: true})
})

// Adicionando uma receita aos Favoritos 

app.post('/api/favorites', async (req,res) => {
    try {
        const { userId, recipeId, image, title, cookTime, servings } = req.body 

        if(!userId, !recipeId, !title) {
            return res.status(400).json({error: "Missing required fields"})
        }

        const newFavorite = await db.insert(favoritesTable).values({
            userId,
            recipeId,
            image,
            title,
            cookTime,
            servings
        }).returning()

        res.status(201).json(newFavorite[0])

    } catch (err) {
        console.log("Error adding favorite")
        res.status(500).json({error: "Something went wrong"})
    }
})

// Retornar todas as receitas Favoritadas

app.get('/api/favorites/:userId', async (req, res) => {
    try {
        const { userId } = req.params

       const userFavorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId,userId))

       res.status(201).json(userFavorites)
    } catch (err) {
        console.log("Error fetching the favorite")
        res.status(500).json({error: "Something went wrong"})
    }
})

// Deletar uma receita dos Favoritos

app.delete('/api/favorites/:userId/:recipeId', async (req,res) => {
    try {
        const {userId, recipeId} = req.params

        await db.delete(favoritesTable).where(
            and(eq(favoritesTable.userId,userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
        // and é usado para verificar se os valores do primeiro e segundo userId e recipeId são os mesmos 
        )

        res.status(200).json({message: "Favorite Removed Sucessfully" })
    } catch (err) {
        console.log("Error removing a favorite")
        res.status(500).json({error: "Something went wrong"})
    }
})

app.listen(PORT, () => {
    console.log('server is running on port 3000', PORT)
})