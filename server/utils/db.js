import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO = process.env.MONGO_URL

const connectDB = async (dbName) => {
    const dynamic = `${MONGO}${dbName}`
    try{
        const connection = await mongoose.connect(dynamic,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return connection;
    } catch (err){
        console.log("Error in connecting DB", err)
        throw err;
    }

}
export default connectDB ;
