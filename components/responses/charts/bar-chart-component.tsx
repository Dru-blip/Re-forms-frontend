

"use client"

import { Answer, Option } from "@/types";
import { useEffect, useMemo, useRef } from "react";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts"

interface Props {
    options: Option[]
}

export default function BarChartComponent({ options}: Props) {

    const generatePieColors = () => {
        return options.map(() => ("#" + Math.floor(Math.random() * 16777215).toString(16)))
    }

    const getOptionValues = () => {
        return options.map((option) => {
            return { option:option.text, count: option._count.answers };
        });
    };

    const colors=useMemo(()=>generatePieColors(),[options])
    const data = useMemo(() => getOptionValues(), [options])
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