// import { Sequelize } from 'sequelize';

import mongoose from 'mongoose'
import { ENV } from './env.config'

// mongoose
if (ENV.mode === 'prod') {
   if (!ENV.db.username || !ENV.db.password || !ENV.db.cluster_url || !ENV.db.name) {
      throw new Error(`Missing environment variables for MongoDB connection`)
   }
}

const DEV_URL = `mongodb://localhost:27017/${ENV.db.name}`

const PROD_URL = `mongodb+srv://${ENV.db.username}:${ENV.db.password}@${ENV.db.cluster_url}/${ENV.db.name}?retryWrites=true&w=majority`

const MONGODB_URI = PROD_URL

export async function initDB() {
   try {
      await mongoose.connect(MONGODB_URI)
      console.log('db connected')
   } catch (error) {
      console.log('db failed', error)
      process.exit()
   }
}

// sequelize
// const sequelizeDb = new Sequelize(
//     ENV.db.name,
//     ENV.db.username,
//     ENV.db.password,
//     {
//         host: ENV.db.host,
//         dialect: ENV.db.dialect,
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false, // This line is used for self-signed certificates
//             },
//         },
//         logging: false
//     }
// );

// export async function initSequelizeDb(){
//     try{
//         await sequelizeDb.sync()
//         console.log("db running")
//     }catch(err){
//         console.error("db error", err)
//     }
// }
