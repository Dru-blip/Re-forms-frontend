"use client";

import { Option } from "@/types";
import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface Props {
    options: Option[];
}

export default function PieChartComponent({ options }: Props) {
    const generatePieColors = () => {
        return options.map(() => "#" + Math.floor(Math.random() * 16777215).toString(16));
    };

    const getOptionValues = () => {
        return options.map((option) => {
            return { option:option.text, count: option._count.answers };
        });
    };
    const colors = useMemo(() => generatePieColors(), [options]);
    const data = useMemo(() => getOptionValues(), [options]);

    return (
        <PieChart width={730} height={350}>
            <Pie dataKey="count" nameKey="option" cx="50%" cy="50%"  label data={data}>
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))
                }
            </Pie>
            <Legend />
            <Tooltip />
        </PieChart>
    );
}
