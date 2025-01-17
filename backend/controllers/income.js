const { body, validationResult, param } = require('express-validator');
const incomeSchema = require("../models/incomeModel.cjs")

//Validation Middleware
exports.validateIncome =[
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

//Add Income
exports.addIncome = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const {title, amount, category, description, date} = req.body;

    const income = incomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        await income.save()
        res.status(200).json({message: 'Income added!'})
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error: error.message})
    }
    console.log(income)
}

//Get Incomes
exports.getIncomes = async (req, res) => {
    try { 
        const incomes= await incomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error: error.message})
    }
}

//Delete Income
exports.validateDeleteIncome =[
    param('id').isMongoId().withMessage('Invalid ID format')
]

exports.deleteIncome = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const {id} = req.params;

    try {
        const income = await incomeSchema.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({message: 'Income not found! '});
        }
        res.status(200).json({message: 'Income Deleted'});
    } catch (error) {
         res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
};