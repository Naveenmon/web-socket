import express from 'express';
import createOrder from '../controllers/payment.controller.js';
const paymentRoute = express.Router();

paymentRoute.post("/", createOrder)
paymentRoute.post("/capture", createOrder)

export default paymentRoute;