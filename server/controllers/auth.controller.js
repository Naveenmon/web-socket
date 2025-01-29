import connectDB from "../utils/db.js"

const saveUserInfo = async (req, res) => {
     try{
        const { name, email, profilePic } = req.body;
        const getDB = await connectDB('payment');
        const db = getDB.connection.db;
        console.log(db)
        const collection = db.collection('users');
        console.log(collection)
        const existUser = await collection.findOne({ email })
        if(existUser){
            return res.status(201).json({ success: false, message: "User Already Exist"})
        }
        const newUser = await collection.insertOne({name, email, profilePic: profilePic})
        return res.status(200).json({success: true, message: "User added Successfully", newUser})
     } catch(err) {
        console.log("Error at login API", err);
        throw err;
     }
}

export default saveUserInfo