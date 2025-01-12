const incomeSchema = require("../models/incomeModel")

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const income = incomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are requried!'})
        }
        if(amount <=0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income added!'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try { 
        const incomes= await incomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    incomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch ((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
