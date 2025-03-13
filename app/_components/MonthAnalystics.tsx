"use client"

import { useEffect, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IoIosRocket } from "react-icons/io";

import { getThirtyDaySales, todaySale } from "../lib/actions";
import { daySale } from "../types";
import { Loader } from "../_components/Loader";



export function MonthAnalystics(){
  
const [isData, setIsData] = useState<daySale[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [isMonth , setIsMonth] = useState<number>(120);

  async function handler() {
    try {
      setIsLoading(true);
    
      const response = await getThirtyDaySales(isMonth);
      // @ts-ignore
      setIsData(() => response)

    } catch (error) {
      console.error(error);
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handler();
  }, [isMonth]);

  if (isLoading) {
    return <Loader />;
  }

  if(isData.length == 0 || !isData ) return <div className="w-full h-full flex justify-center items-center font-bold text-2xl my-5">Sale is not started yet!!</div>

  return (
    <>
  
        <div >
        </div>
        <div className="w-full">
          <div className="flex justify-center items-center gap-2 font-bold text-2xl my-5">
            <p>Monthly Sales</p>
            <p><IoIosRocket/></p>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setIsMonth(30)} className="bg-main">30 Days</button>
              <button onClick={()=>setIsMonth(60)} className="bg-main">60 Days</button>
              <button onClick={()=>setIsMonth(90)} className="bg-main">90 Days</button>
              <button onClick={()=>setIsMonth(120)} className="bg-main">120 Days</button>
            </div>
          <ComposedChart width={1000} height={500} data={isData}>
           <XAxis dataKey="month" />
           <YAxis dataKey='totalSales' />
           <Tooltip />
           <Legend />
           <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" name="Dish" dataKey="typedish" fill="#8884d8" stroke="#8884d8" />
            <Area type="monotone" name="Quantity" dataKey="quantity" fill="#000000" stroke="#000000" />
            <Bar  name="Sales" dataKey="totalSales" barSize={20} fill="#413ea0" />
           <Line type="monotone" name="Sales" dataKey="sale" stroke="#ff7300" />
          </ComposedChart>
        </div>
  
    </>)
}

// {id: 'ff7a744a-d7a0-4858-ae94-0a96f552e97e', created_at: Wed Mar 12 2025 19:16:28 GMT+0530 (India Standard Time), day: Wed Mar 12 2025 05:30:00 GMT+0530 (India Standard Time), sale: 120, typedish: 'Paneer Chilli', …}
// {id: '585be3d5-beb8-4b03-93d4-d72deb4659c1', created_at: Thu Mar 13 2025 12:21:15 GMT+0530 (India Standard Time), day: Thu Mar 13 2025 05:30:00 GMT+0530 (India Standard Time), sale: 100, typedish: 'fish', …}
// {id: '0d663ce7-9853-4517-a046-bdce5454d0d7', created_at: Thu Mar 13 2025 10:38:26 GMT+0530 (India Standard Time), day: Thu Mar 13 2025 