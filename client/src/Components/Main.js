import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import Form from './Form'
import { Graph } from './Graph'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import axios from 'axios'

const Main = () => {
    const [auth, setAuth] = useAuth();
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const logout = async (e) => {
        e.preventDefault();
        await setAuth({
            ...auth,
            user: null,
            token: ""
        })
        await localStorage.removeItem("auth")
        await toast.success("Logged out Successfully");
        navigate('/login')
    }

    const getExpenseCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/expense/all-transaction-types`);
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting transaction categories");
        }
    }

    const getTransactions = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/expense/all-transactions`);
            if (data.success) {
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting transaction categories");
        }
    }

    useEffect(() => {
        getExpenseCategory();
        getTransactions();
    }, [])

    return (
        <div className="App">
            <ToastContainer />
            <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
                <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">Expense Tracker <span className='flex items-center justify-center mt-2'><box-icon onClick={(e) => logout(e)} name='log-out' color='#ffff' size='md' flip='horizontal' animation='fade-right-hover'></box-icon></span></h1>
                {/* grid columns */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Chart */}
                    <Graph
                        transactions={transactions}
                    />
                    {/* Form */}
                    <Form
                        categories={categories}
                        setCategories={setCategories}
                        transactions={transactions}
                        setTransactions={setTransactions}
                        getExpenseCategory={getExpenseCategory}
                        getTransactions={getTransactions}
                    />
                </div>
            </div>
        </div>
    )
}

export default Main