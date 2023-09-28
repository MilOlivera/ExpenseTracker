import React, { createContext, useState, useContext } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5010/api/v1/"; 

const GlobalContext = createContext()


export const GlobalProvider = ( {children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

  
// INGRESOS CALCULADOS

    const addIncome = async(income) =>{
        const response = await axios.post(`${BASE_URL}add-income`, income) // "URL que designamos arriba/" + la ruta que le asignamos aca
            .catch((error) => {
                setError(error.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount;   
        })

        return totalIncome;
    }

// EGRESOS CALCULADOS

    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount

        })

    return totalExpense;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

    return history.slice(0, 3)
    }



    console.log(totalIncome(), 'TOTAL')

    return(
        <GlobalContext.Provider value={{addIncome, getIncomes, incomes, deleteIncome, totalIncome, expenses, addExpense, getExpenses, deleteExpense, totalExpenses, totalBalance, transactionHistory, error, setError}}> 
            {children}
        </GlobalContext.Provider>
    )
}
    
    export const useGlobalContext = () => {

        return useContext(GlobalContext)
    }
