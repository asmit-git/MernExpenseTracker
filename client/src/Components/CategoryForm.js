import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CategoryForm = ({ getExpenseCategory, hidden, setHidden }) => {
    const [type, setType] = useState("");
    const [color, setColor] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/expense/transaction-type`, {
                type, color
            });
            if (res.data && res.data.success) {
                toast.success(res.data && res.data.message)
                setHidden(!hidden);
                getExpenseCategory();
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    return (
        <>
            <h1 className='font-bold pb-4 text-xl'>Add Transaction Category</h1>
            <form id='category-form'>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input type="text" name="type" value={type} onChange={(e) => setType(e.target.value)} placeholder='Savings, Expenses, Investments' className='form-input' />
                    </div>
                    <div className="input-group">
                        <input type="text" name="color" value={color} onChange={(e) => setColor(e.target.value)} placeholder='Unique Color Code' className='form-input' />
                    </div>
                    <div className="submit-btn">
                        <button onClick={(e) => handleSubmit(e)} className='border py-2 text-white bg-teal-500 w-full'>Add Category</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CategoryForm