import React from 'react'
import { getLabels } from '../Helper/helper'


const obj = [
    {
        type: "Savings",
        color: "#f9c74f",
        percent: 45
    },
    {
        type: "Investment",
        color: "#800080",
        percent: 20
    },
    {
        type: "Expenses",
        color: "#f9c74f",
        percent: 10
    }
]

const Labels = ({ getTransactions, transactions, categories, getExpenseCategory }) => {
    let object = getLabels(transactions);
    console.log(object);
    return (
        <>
            {object.map((v, i) => (
                <LabelComponent key={i} data={v} />
            ))}
        </>
    )
}

export default Labels

function LabelComponent({ data }) {
    if (!data) return <></>;
    return (
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
                <div className='w-2 h-2 rounded py-3' style={{ background: `${data.color ?? '#FFBF00'} ` }} />
                <h3 className='text-md'>{data.type ?? ''}</h3>
            </div>
            <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
        </div>
    )
}