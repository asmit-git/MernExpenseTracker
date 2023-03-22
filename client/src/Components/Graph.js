import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'
import Labels from './Labels';
import { chart_Data, getTotal } from '../Helper/helper';

Chart.register(ArcElement);

export const Graph = ({ transactions }) => {
    return (
        <div className='flex justify-content max-w-xs mx-auto'>
            <div className='item'>
                <div className="chart relative">
                    <Doughnut {...chart_Data(transactions)} />
                    <h3 className='mb-4 font-bold title'>Total
                        <span className='block text-3xl text-emrald-400'>Rs. {getTotal(transactions) ?? 0}</span></h3>
                </div>
                <div className='flex flex-col py-10 gap-4'>
                    {/* Labels */}
                    <Labels
                        transactions={transactions}
                    />
                </div>
            </div>
        </div>
    )
}
