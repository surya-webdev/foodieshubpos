"use client";

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



export default function DaySale() {
  const [isData, setIsData] = useState<daySale[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handler() {
    try {
      setIsLoading(true);
      const response = await todaySale();
      // const res = await getThirtyDaySales({days:7});
      // console.log(res)
      // @ts-ignore
      setIsData(() => 
        response?.map((item) => {
          return {
            ...item,
            sale:item.sale * item.quantity,
            day: item?.day.toLocaleString("en-US",{
              day:"2-digit",
              month:"long",
              // year:"numeric"
            }),
          };
        }),
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

  return (
    <>
  
      
        <div className="w-full">
          <div className="flex justify-center items-center gap-2 font-bold text-2xl my-5">
            <p>Today Sale</p>
            <p><IoIosRocket/></p>
            </div>
          <ComposedChart width={1000} height={500} data={isData}>
           <XAxis label={""} dataKey="day" />
           <YAxis dataKey='sale' />
           <Tooltip />
           <Legend />
           <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" name="Dish"  dataKey="typedish" fill="#8884d8" stroke="#8884d8" />
            <Area type="monotone" name="Order" dataKey="quantity" fill="#000000" stroke="#000000" />
            {/* <Bar  name="Sales" dataKey="sale" barSize={20} fill="#413ea0" /> */}
           <Line type="monotone" name="Sales" dataKey="sale" stroke="#ff7300" />
          </ComposedChart>
        </div>
  
    </>
  );
}
