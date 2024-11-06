"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getThirtyDaySales } from "../lib/actions";
import { daySale } from "../types";

// const data = [{ name: "Oct 1", uv: 400, pv: 2400, amt: 2400 }];

export default function Page() {
  //
  const [isData, setIsData] = useState<daySale[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handler() {
    try {
      setIsLoading(true);
      const response = await getThirtyDaySales();

      setIsData(() =>
        response.map((item) => {
          return {
            ...item,
            day: String(item.day).split(" ").join("").slice(3, 8),
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
    return <p>...Loading</p>;
  }

  console.log(isData);

  return (
    <>
      <div className="py- flex flex-col gap-10 px-10">
        <div>
          <LineChart
            width={600}
            height={300}
            data={isData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="sale" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis dataKey="sale" />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </>
  );
}
