require('dotenv-flow').config();

const config = {
    dev: process.env.NODE_ENV === 'development',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
};

module.exports = config;
