import razorpay from 'razorpay';
import dotenv from 'dotenv';
import connectDB from '../utils/db.js';
dotenv.config();

const createOrder = async (req, res) => {
    try{
        const rezorpay = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });
    
        const options = {
            amount: req.body.amount,
            currency: "INR",
            receipt: "12345",
        };
    
        const order = await rezorpay.orders.create(options);

        if(!order) {
            return res.status(500).json({ message: 'Failed to create order' });
        }
        // console.log(order.amount, order.id, order.status);


        const getDB = await connectDB('payment');
        const db = getDB.connection.db;
        const collection = db.collection('transations');

        const newTransaction = await collection.insertOne({
            email: req.body.email,
            amount: order.amount,
            orderId: order.id,
            status: order.status
        });

        console.log(newTransaction)

        return res.status(200).json(order);



    } catch (error) {
        console.error('Error creating order', error);
        res.status(500).json({ message: 'Failed to create order' });
    }

}

const captureOrder = async (req, res) => {
    
}

export default createOrder ;