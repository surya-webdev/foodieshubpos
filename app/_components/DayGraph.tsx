"use client"

import { IoIosRocket } from "react-icons/io"
import { Area, AreaChart, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Loader } from "./Loader";
import { useEffect, useState } from "react";
import { getSale, todaySale } from "../lib/actions";
import { daySale } from "../types";


type dayResponse = {
  daySale:number
  dayItem: {
    sale: number;
    day: string;
    id: string;
    created_at: Date;
    typedish: string;
    quantity: number;
}[]
}

export function DayGraph(){

  const [isData, setIsData] = useState<daySale[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

   async function handler() {
      try {
        setIsLoading(true);
        const response : dayResponse = (await getSale()) ||  { daySale: 0, dayItem: [] };
        // const res = await getThirtyDaySales({days:7});
        // console.log(response )
        // @ts-ignore
        setIsData(() => 
          response?.dayItem
          // response?.map((item) => {
          //   return {
          //     ...item,
          //     sale:item.sale * item.quantity,
          //     day: item?.day.toLocaleString("en-US",{
          //       day:"2-digit",
          //       month:"long",
          //       // year:"numeric"
          //     }),
          //   };
          // }),
        );
  
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    }
  
    useEffect(() => {
      handler();
    }, []);
  
    if (isLoading) {
      return <Loader />;
    }
  
    if(!isData.length) return <div className="w-full h-full flex justify-center items-center font-bold text-2xl my-5">Sale is not started yet!!</div>
  
console.log(isData)
  return <>
   <aside className="flex flex-col justify-center items-center w-full h-full">
            <article className="flex justify-center items-center gap-2 font-bold text-2xl my-5">
              <p>Today Sale</p>
              <p><IoIosRocket/></p>
            </article>  
            <div>
          {/* <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={700} 
            height={500} 
            data={isData}
            syncId="sale"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="" />
            <YAxis dataKey='day'  />
            <Tooltip />
            <Area type="monotone" dataKey="sale" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer> */}

            <ComposedChart width={700} height={500} data={isData}>
             <XAxis label={""} dataKey="day" />
             <YAxis dataKey='sale' />
             <Tooltip />
             <Legend />
             <CartesianGrid stroke="#f5f5f5" />
              <Area type="monotone" name="Dish"  dataKey="typedish" fill="#8884d8" stroke="#8884d8" />
              <Area type="monotone" name="Order" dataKey="quantity" fill="#000000" stroke="#000000" />
             <Line type="monotone" name="Sales" dataKey="sale" stroke="#ff7300" />
            </ComposedChart>
           </div>
          </aside>
  </>
}
{/* <Bar  name="Sales" dataKey="sale" barSize={20} fill="#413ea0" /> */}