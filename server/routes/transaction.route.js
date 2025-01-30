import express from 'express'
import getAllTransactions from '../controllers/transaction.controller.js'

const transactionRoute = express.Router()

transactionRoute.post('/', getAllTransactions)

export default transactionRoute;