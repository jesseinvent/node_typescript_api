import dotenv from "dotenv"
dotenv.config()

// console.log(process.env.dbUri);

export default {
    port: 1337,
    host: process.env.host,
    dbUri: process.env.dbUri,
    saltWorkFactor: process.env.saltWorkFactor,
    accessTokenTtl: process.env.accessTokenTtl,
    refreshTokenTtl: process.env.refreshTokenTtl,
    privateKey: process.env.privateKey
}