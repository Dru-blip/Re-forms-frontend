

"use client"

import { IAnswer } from "@/types";
import { useEffect, useMemo, useRef } from "react";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts"

interface Props {
    options: string[]
    values: IAnswer[]
}

export default function BarChartComponent({ options, values }: Props) {

    const generatePieColors = () => {
        return options.map(() => ("#" + Math.floor(Math.random() * 16777215).toString(16)))
    }

    const getOptionValues = () => {
        return options.map((option) => {
            let count = 0
            values.map((value) => {
                if (value.value?.findIndex((val)=>val===option)!==-1) {
                    count += 1
                }
            })
            return { option, count }
        })
    }
    const colors=useMemo(()=>generatePieColors(),[options])
    const data = useMemo(() => getOptionValues(), [options, values])
    return (
        <BarChart width={730} height={350} data={data}>
            <XAxis dataKey="option" />
            <YAxis />
            <Bar dataKey="count">
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}  />
                    ))
                }
            </Bar>
            <Legend />
            <Tooltip />
        </BarChart>
    )
}