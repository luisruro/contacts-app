export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        secret: process.env.JWT_SECRET,
        url: process.env.DATABASE_URL
    }
})