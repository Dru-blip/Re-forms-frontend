"use client"

import { IAnswer } from "@/types";
import { useEffect, useMemo, useRef } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

interface Props {
    options: string[]
    values: IAnswer[]
}

export default function PieChartComponent({ options, values }: Props) {
    
    const generatePieColors = () => {
        return options.map(() => ("#" + Math.floor(Math.random() * 16777215).toString(16)))
    }

    const getOptionValues = () => {
        return options.map((option) => {
            let count = 0
            values.map((value) => {
                if (value.value?.at(0) === option) {
                    count += 1
                }
            })
            return { option, count }
        })
    }
    const colors=useMemo(()=>generatePieColors(),[options])
    const data=useMemo(()=>getOptionValues(),[options,values])
    
    return (
        <PieChart width={730} height={250} >
            <Pie dataKey="count" nameKey="option" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label data={data} >
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))
                }
            </Pie>
            <Legend />
            <Tooltip />
        </PieChart>
    )
}