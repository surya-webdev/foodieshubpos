"use client";

import { useEffect, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { IoIosRocket } from "react-icons/io";
import { getThirtyDaySales, todaySale } from "../lib/actions";
import { daySale } from "../types";
import { Loader } from "../_components/Loader";
import { DayGraph } from "./DayGraph";



export default function DaySale() {

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  // @ts-ignore
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

 
  return (
    <>
    <main className="w-full h-[40rem] grid grid-cols-2 justify-between items-center">
       <DayGraph/>
    <aside className="w-full h-full flex flex-col justify-between items-center">
     <div>
      <p>SELLING ITEM</p>
    </div>  
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={140}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={120}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={5}
            >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Tooltip/>
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="vertical"
            iconType="circle"
            />
        </PieChart>
      </ResponsiveContainer>  
    </aside>
 </main>
    </>
  );
}
