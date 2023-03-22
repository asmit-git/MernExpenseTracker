import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import CategoryForm from './CategoryForm';
import List from './List';

const Form = ({ getTransactions, transactions, categories, getExpenseCategory }) => {
    const [hidden, setHidden] = useState(true);
    const { register, handleSubmit, resetField } = useForm();



    const onSubmit = async (data) => {
        try {
            console.log(data)
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/expense/add-transaction`, data);
            if (res.data && res.data.success) {
                toast.success(res.data && res.data.message)
                resetField('name');
                resetField('amount');
                getTransactions();
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        setHidden(!hidden);
    }

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className='font-bold pb-4 text-xl'>Transactions</h1>
            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input type="text" {...register('name')} placeholder='Salary, House Rent, SIP' className='form-input' />
                    </div>
                    <div className='flex justify-between items-center gap-4'>
                        <select className='form-input' {...register('type')} >
                            <option value="">select</option>
                            {categories && categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.type}</option>
                            ))}
                        </select>
                        <box-icon onClick={(e) => handleClick(e)} name='folder-plus' size="md"></box-icon>
                    </div>
                    {!hidden && <CategoryForm getExpenseCategory={getExpenseCategory} setHidden={setHidden} hidden={hidden} />}
                    <div className="input-group">
                        <input type="text" {...register('amount')} placeholder='Amount' className='form-input' />
                    </div>
                    <div className="submit-btn">
                        <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                    </div>
                </div>
            </form>
            <List transactions={transactions} getTransactions={getTransactions} />
        </div>
    )
}

export default Form