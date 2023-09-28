const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense = async(req, res) =>{

    const {title, amount, category, description, date} = req.body

    const expense = ExpenseSchema({
        title, 
        amount,
        category,
        description,
        date
    })

    try{
        // validaciones por si nuestros inputs estan vacios
        if(!title || !amount || !category || !description || !date){
        return res.status(400).json({message: 'Todos los campos deben ser completados'})
        }
        if(amount <= 0 || !amount === 'number'){
        return res.status(400).json({message: 'La cantidad debe ser un numero positivo'})
        }
        await expense.save()
        res.status(200).json({message: 'Ingreso agregado'})
    } catch(error){
        res.status(500).json({message: 'Error de servidor'}) 
    }

    console.log(expense)
}

    exports.getExpense = async(req, res) => {
        try{
            const expenses = await ExpenseSchema.find().sort({createdAt: -1}) // para que nos aparezca el ingreso nuevo arriba de todo y no al final
            res.status(200).json(expenses)
        } catch (error) {
            res.status(500).json({message:'Error de servidor'})
        }
    }
   
    exports.deleteExpense = async(req, res) => {
        
        const { id } = req.params;
        console.log(id)
        ExpenseSchema.findByIdAndDelete(id)
            .then((expense) => {
                res.status(200).json({message: 'Item borrado correctamente'})
            })
            .catch((error) => {
                res.status(500).json({message: 'Server error'})
            })
    }