import Razorpay from 'razorpay';  
import dotenv from 'dotenv';
import connectDB from '../utils/db.js';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

const createOrder = async (req, res) => {
    try {
        const options = {
            amount: req.body.amount,  
            currency: "INR",
            receipt: "12345",
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ message: 'Failed to create order' });
        }

        const getDB = await connectDB('payment');
        const db = getDB.connection.db;
        const collection = db.collection('transactions');

        const newTransaction = await collection.insertOne({
            email: req.body.email,
            name: req.body.name,
            profilePic: req.body.profilePic,
            amount: order.amount,
            orderId: order.id,
            status: order.status,
            createdAt: new Date()
        });

        console.log(newTransaction);

        return res.status(200).json(order);

    } catch (error) {
        console.error('Error creating order', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
}

const captureOrder = async (req, res) => {
    const { payment_id, order_id, amount } = req.body;
    console.log("Payload", payment_id, order_id, amount);

    try {
        
        if (!razorpay) {
            return res.status(500).json({ message: 'Razorpay client is not initialized' });
        }

        const payment = await razorpay.payments.fetch(payment_id);
        console.log(payment.status);

        const getDB = await connectDB('payment');
        const db = getDB.connection.db;
        const collection = db.collection('transactions');

        if (payment.status === 'captured') {
            console.log('Payment already captured');

            const transaction = await collection.findOneAndUpdate(
                { orderId: order_id },
                { $set: { status: "successful" } }, 
                { new: true }
            );

            console.log("Transaction already captured:", transaction);

            return res.status(200).json({ success: true, message: "Order status updated", payment });

        }

        const capture = await razorpay.payments.capture(payment_id, amount);

        console.log("Capturing", capture);

        const transaction = await collection.findOneAndUpdate(
            { orderId: order_id },
            { $set: { status: 'successful' } },  
            { new: true }
        );

        console.log("Transaction:", transaction);

        return res.status(200).json({ success: true, message: "Order status updated", capture});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error capturing payment' });
    }
}


export { createOrder, captureOrder };
