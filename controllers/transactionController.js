import transactionCategoryModel from "../models/transactionCategoryModel.js";
import transactionModel from "../models/transactionModel.js";

export const createTransactionCategory = async (req, res) => {
    try {
        const { type, color } = req.body
        /* Validations */
        if (!type) {
            return res.send({ error: 'Type is Required' })
        }
        if (!color) {
            return res.send({ error: 'Color code is Required' })
        }

        /* Check for exisiting category */
        const exisitingCategory = await transactionCategoryModel.findOne({ $and: [{ user: req.user._id }, { type }] })
        if (exisitingCategory) {
            return res.status(200).send({
                success: true,
                message: "You already have this transaction category"
            })
        }
        const exisitingColor = await transactionCategoryModel.findOne({ color })
        if (exisitingColor) {
            return res.status(200).send({
                success: true,
                message: "Please add unique color code"
            })
        }
        const category = await new transactionCategoryModel({ type, color, user: req.user._id }).save()
        res.status(200).send({
            success: true,
            message: "Transaction Category Creation Successful",
            data: category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while adding transaction category",
            error
        })
    }
}

export const getTransactionCategory = async (req, res) => {
    try {
        const categories = await transactionCategoryModel
            .find({ user: req.user._id })
            .sort({ '_id': -1 })
        res.status(200).send({
            success: true,
            message: "Users categories",
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Geting categories",
            error,
        });
    }
}

export const addNewTransaction = async (req, res) => {
    try {
        const { name, amount, type } = req.body
        /* Validations */
        if (!type) {
            return res.send({ error: 'Type is Required' })
        }
        if (!name) {
            return res.send({ error: 'Name is Required' })
        }
        if (!amount) {
            return res.send({ error: 'Amount is Required' })
        }

        const transactionCategory = await transactionCategoryModel
            .findById(type)
        const transaction = await new transactionModel({ name, amount, type: transactionCategory.type, color: transactionCategory.color, user: req.user._id }).save()
        res.status(200).send({
            success: true,
            message: "New Transaction Created Successfully",
            transaction,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Creating New Transaction",
            error,
        });
    }
}

export const getTransactions = async (req, res) => {
    try {
        const transactions = await transactionModel
            .find({ user: req.user._id })
            .sort({ '_id': -1 })
        res.status(200).send({
            success: true,
            message: "Users transactions",
            transactions,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Geting transactions",
            error,
        });
    }
}

/*-------- Delete Transaction Controller --------- */
export const deleteTransactionController = async (req, res) => {
    try {
        const { id } = req.params;
        await transactionModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "transaction deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error deleting transaction",
        });
    }
}