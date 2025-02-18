import connectDB from "../utils/db.js";

const getAllTransactions = async (req, res) => {
    const { email } = req.body;  // Ensure email is passed correctly from the request
    console.log("Requested Email:", email); // Log the email

    try {
        // Connect to the database
        const getDB = await connectDB('payment');
        const db = getDB.connection.db;
        const collection = db.collection('transactions');

        // Check if email is valid (not empty)
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Case-insensitive email search using regex
        const transactions = await collection.find({
            email: { $regex: new RegExp(`^${email}$`, 'i') }
        }).toArray();

        console.log("Transactions found:", transactions); // Log the result from the query

        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this email" });
        }

        return res.status(200).json(transactions);
    } catch (error) {
        console.log("Error at transaction controller", error);
        return res.status(500).json({ message: "Error at transaction controller" });
    }
};

export default getAllTransactions;
