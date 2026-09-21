import 'dotenv/config'

// Definindo as Variaveis ENV para usar durante o projeto

export const ENV = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
}