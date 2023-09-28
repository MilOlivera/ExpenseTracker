const IncomeSchema = require("../models/IncomeModel")

exports.addIncome = async(req, res) =>{

    const {title, amount, category, description, date} = req.body

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Ingreso agregado'})
    } catch(error){
        res.status(500).json({message: 'Error de servidor'}) 
    }

    console.log(income)
}

    exports.getIncomes = async(req, res) => {
        try{
            const incomes = await IncomeSchema.find().sort({createdAt: -1}) // para que nos aparezca el ingreso nuevo arriba de todo y no al final
            res.status(200).json(incomes)
        } catch (error) {
            res.status(500).json({message:'Error de servidor'})
        }
    }
   
    exports.deleteIncome = async(req, res) => {
        
        const { id } = req.params;
        console.log(id)
        IncomeSchema.findByIdAndDelete(id)
            .then((income) => {
                res.status(200).json({message: 'Item borrado correctamente'})
            })
            .catch((error) => {
                res.status(500).json({message: 'Server error'})
            })
    }
