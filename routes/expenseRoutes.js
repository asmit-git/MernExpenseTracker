import express from 'express'
import { addNewTransaction, createTransactionCategory, deleteTransactionController, getTransactionCategory, getTransactions } from '../controllers/transactionController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

/* router object */
const router = express.Router()

/* ...................... Routing ........................... */
/* Add Transaction Type Route || Method POST */
router.post('/transaction-type', requireSignIn, createTransactionCategory)
/* get all Transaction Types Route || Method Get */
router.get('/all-transaction-types', requireSignIn, getTransactionCategory)
/* Create new Transaction Route || Method POST */
router.post('/add-transaction', requireSignIn, addNewTransaction)
/* get all Transaction Route || Method Get */
router.get('/all-transactions', requireSignIn, getTransactions)
/* Delete Transaction Route || Method Delete */
router.delete('/delete-transaction/:id', requireSignIn, deleteTransactionController)



export default router