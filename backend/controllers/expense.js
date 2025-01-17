const { body, validationResult, param } = require('express-validator');
const expenseSchema = require("../models/expenseModel")

//Validation Middleware
exports.validateExpense =[
    body('title').notEmpty().withMessage('Title is required.'),
    body('amount')
        .isFloat({ gt: 0 })
        .withMessage('Amount must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 40 })
        .withMessage('Description must not exceed 40 characters'),
    body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Date must be YYYY-MM-DD')
];

//Add Expense
exports.addExpense = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const {title, amount, category, description, date} = req.body;

    const expense = expenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        await expense.save()
        res.status(200).json({message: 'Expense added!'})
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error: error.message})
    }
    console.log(expense)
}

exports.getExpenses = async (req, res) => {
    try { 
        const expenses= await expenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    expenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch ((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
