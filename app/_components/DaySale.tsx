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
import { getThirtyDaySales, getTotalSale, todaySale } from "../lib/actions";
import { daySale } from "../types";
import { Loader } from "../_components/Loader";
import { DayGraph } from "./DayGraph";



export default function DaySale() {

  const [datas , setDatas] = useState<any>([])
  const [sortedData , setSorteddata] = useState<any>([])

async function handler(){
  const responseTotalSale = (await getTotalSale()) || [];
  setDatas(responseTotalSale)
}

const map:any = []

datas?.forEach((item:any)=>{
map[item?.typedish] ? 
map[item?.typedish]={...map[item?.typedish], order: map[item.typedish].order + item.quantity} 
: map[item?.typedish]={name:item?.typedish, order:item?.quantity};
})


function sortedOrder() {
  const entries = Object.values(map); 
  // @ts-ignore
  entries.sort((a, b) => b.order - a.order); 

  setSorteddata(entries)
}

// sortedOrder()

useEffect(()=>{
  handler()
})
  const data = [
    { name: 'Chicken Biryani', value: 400 },
    { name: 'Butter Naan', value: 300 },
    { name: 'Tandoori', value: 300 },
    { name: 'Chicken Fried Rice', value: 200 },
    { name: 'Crispy Chicken', value: 300 },
    { name: 'Paneer Butter Masala ', value: 300 },
    { name: 'Lemon Coriandor Soup', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#000', '#00C49F', '#FFBB28', '#FF8042'];
  
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
      <p className="font-bold text-2xl ">Top Selling Item</p>
    </div>  
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={140}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={80}
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
