import express from 'express';
import { createOrder, captureOrder } from '../controllers/payment.controller.js';

const paymentRoute = express.Router();

paymentRoute.post("/", createOrder)
paymentRoute.post("/capture", captureOrder)

export default paymentRoute;