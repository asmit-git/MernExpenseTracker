import React from 'react'
import 'boxicons'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ transactions, getTransactions }) => {
    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-xl'>History</h1>
            {transactions.map((transaction, i) => (
                <Transaction key={i} transaction={transaction} getTransactions={getTransactions} />
            ))}
        </div>
    )
}

export default List

const handleDelete = async (id, getTransactions) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/expense/delete-transaction/${id}`);
        if (data.success) {
            toast.success("transaction deleted")
            getTransactions();
        }
    } catch (error) {
        console.log(error);
        toast.error("Error deleting transaction");
    }
}

function Transaction({ transaction, getTransactions }) {
    if (!transaction) return null;
    return (
        <div className='item flex justify-center bg-gray-50 py-2 rounded-r' style={{ borderRight: `8px solid ${transaction.color ?? '#e5e5e5'}` }}>
            <button onClick={(e) => handleDelete(transaction._id, getTransactions)} className='px-3'><box-icon color={transaction.color ?? '#e5e5e5'} name='trash'></box-icon></button>
            <span className='block w-full'>{transaction.name ?? ""}</span>
        </div>
    )
}