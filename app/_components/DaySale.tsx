"use client";

import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

import { getTotalSale } from "../lib/actions";
import { topSelling } from "../types";
import { DayGraph } from "./DayGraph";



export default function DaySale() {

const [sortedData , setSorteddata] = useState<topSelling[]>([])

async function handler(){
  const responseTotalSale : {totalRevenue:number ,topSelling:topSelling[]}  = (await getTotalSale()) || {totalRevenue:0 ,topSelling:[]};
 console.dir(responseTotalSale);
  setSorteddata(responseTotalSale?.topSelling.slice(0,10));
}

useEffect(()=>{
  handler()
},[])

  const data = [
    { name: 'Chicken Biryani', value: 400 },
    { name: 'Butter Naan', value: 300 },
    { name: 'Tandoori', value: 300 },
    { name: 'Chicken Fried Rice', value: 200 },
    { name: 'Crispy Chicken', value: 300 },
    { name: 'Paneer Butter Masala ', value: 300 },
    { name: 'Lemon Coriander Soup', value: 200 },
  ];
  
  const COLORS = ['#0088FE' , '#ef4444', '#84cc16', '#22c55e', '#14b8a6', "##a855f7" , '#00C49F', '#FFBB28', '#FF8042'];
  
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
    <main className="w-full h-[90rem] grid grid-cols-1 justify-between items-center">
       <DayGraph/>
    <aside className="w-full h-full flex flex-col justify-between items-center">
     <div>
      <p className="font-bold text-2xl">Top Selling Item</p>
    </div>  
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={100}>
          <Pie
            data={sortedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            // innerRadius={100}
            fill="#8884d8"
            dataKey="order"
            paddingAngle={5}
            >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="radial"
            iconType="circle"
            />
        </PieChart>
      </ResponsiveContainer>  
    </aside>
 </main>
    </>
  );
}
