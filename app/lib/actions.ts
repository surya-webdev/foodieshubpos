"use server";

import { endOfDay, startOfDay, subDays } from "date-fns";

import { cookies } from "next/headers";
import { itemTypes, monthKey, topSelling } from "../types";
import prisma from "./db";


export async function getTiffin() {
  try {
    const data = await prisma.tiffin.findMany();

    if (!data) throw new Error("NO DATA");

    return data;
  } catch (err) {
    console.error("error", err);
  }
}


export async function getStarter() {
  try {
    const data = await prisma.starters.findMany();

    if (!data) throw new Error("NO DATA");

    return data;
  } catch (err) {
    console.error("error", err);
  }
}

export async function getCurrentOrder(){

  try {
 const order = await prisma.order.findUnique({
  where:{
    id:"1"
  }
 }) ?? {id:"1",order:1};
return order;
  }catch(err){
    console.error(err,"Error while fetching!")
  }

}

export async function getGravy() {
  
  try {
    const data = await prisma.gravy.findMany();

    if (!data) throw new Error("NO DATA");
    return data;
  } catch (err) {
    console.error("error", err);
  }
}

export async function getBiriyani() {
  
  try {
    const data = await prisma.biriyani.findMany();

    if (!data) throw new Error("NO DATA");
    return data;
  } catch (err) {
    console.error("error", err);
  }
}

export async function getBreads() {
  
  try {
    const data = await prisma.bread.findMany();

    if (!data) throw new Error("NO DATA");
    return data;
  } catch (err) {
    console.error("error", err);
  }
}

export async function getBbqCourse() {
  
  try {
    const data = await prisma.bbq.findMany();

    if (!data) throw new Error("NO DATA");
    return data;
  } catch (err) {
    console.error("error", err);
  }
}


export async function getMainCourse() {
  try {
    const data = await prisma.maincourse.findMany();

    if (!data) throw new Error("NO DATA");
    return data;
  } catch (err) {
    console.error("error", err);
  }
}

export async function getSoups() {
  try {
    const data = await prisma.soups.findMany();

    if (!data) throw new Error("NO DATA");
    return data;
  } catch (err) {
    console.error("error", err);
  }
}

// get the dashboard details

const today = new Date();
const formattedDate = today.toISOString().split("T")[0];

export async function getSale() {
  
  try{
    const res = await prisma.dashboard.findMany({
      where: {
        day: new Date(formattedDate),
      },
    });
  const dayItem = res?.map((item) => {
    return {
      ...item,
      sale:item.sale * item.quantity,
      day: item?.day.toLocaleString("en-US",{
        day:"2-digit",
        month:"long",
        // year:"numeric"
      }),
    };
  })

  const daySale = res?.reduce((sum, item) => sum +=(item?.sale * item.quantity || 0), 0);
  const dayOrder = res?.reduce((sum, item) => sum +=(item.quantity || 0), 0);

  return ({daySale , dayItem , dayOrder});

  }catch(err){
    console.error("Error while fetching!" , err);
  }

}

// Total Sale

export async function getTotalSale() {

  try{
    const res = await prisma.dashboard.findMany();

    const totalRevenue : number = res?.reduce((sum , item) => sum +=(item?.sale * item.quantity || 0), 0); 
    const totalOrders  : number = res?.reduce((sum , item) => sum +=(item?.quantity || 0), 0);
    
    // TOP SELLING PRODUCTS:
    const map:topSelling[] = [];

    res?.forEach((item:any)=>{
     map[item?.typedish] ? 
    map[item?.typedish]={...map[item?.typedish], order: map[item.typedish].order + item.quantity} 
  : map[item?.typedish]={name:item?.typedish, order:item?.quantity};
  
    });

    const topSelling = Object.values(map); 
    // @ts-ignore
    topSelling.sort((a, b) => b.order - a.order);   

    return {totalRevenue, topSelling , totalOrders};

  }catch(err){
    console.error("Error while fetching!" , err);
  }
}


export async function todaySale(){
  
  const daySale = (await prisma.dashboard.findMany({
    where:{
      day:new Date(formattedDate)
    }
  })||[])

  return daySale;
}

const WEEK = 7;

export async function getWeeklySale() {
  
  try {
    const startDate = startOfDay(subDays(today, WEEK - 1));
    const endDate = endOfDay(today);
    console.log(startDate,endDate)
    
    const result = await prisma.dashboard.findMany({
      where: {
        day: {
          gte: startDate,
          lte: endDate
        }
      }
    });
    
    if (!result || result.length === 0) return;
    
    const salesByMonth: Record<string, monthKey> = {};
    
    result.forEach((item) => {
      const salesDate = item.day;
      
      const monthKey = `${salesDate.getDay()}-${salesDate.getFullYear()}-${String(salesDate.getMonth() + 1).padStart(2, '0')}`;
      const monthDisplay = salesDate.toLocaleString("en-US", {day:"numeric", month: "long", year: "numeric" });
      
      if (!salesByMonth[monthKey]) {
        salesByMonth[monthKey] = {
          month: monthDisplay,
          sales: [],
          totalSales: 0,
          sortKey: monthKey
        };
      }
      
      salesByMonth[monthKey].sales.push(item);
      salesByMonth[monthKey].totalSales += item.sale * item.quantity;
    });
    
    const monthData = Object.values(salesByMonth).sort((a, b) => 
      b.sortKey.localeCompare(a.sortKey)
    );
    
    return monthData;
  } catch (error) {
    console.error("Error fetching thirty day sales:", error);
    throw error;
  }


}

export async function getThirtyDaySales(days: number = 30) {
 
  try {
    const startDate = startOfDay(subDays(today, days - 1));
    const endDate = endOfDay(today);
    console.log(startDate,endDate)
    
    const result = await prisma.dashboard.findMany({
      where: {
        day: {
          gte: startDate,
          lte: endDate
        }
      }
    });
    
    if (!result || result.length === 0) return;
    
    const salesByMonth: Record<string, monthKey> = {};
    
    result.forEach((item) => {
      const salesDate = item.day;
      
      const monthKey = `${salesDate.getFullYear()}-${String(salesDate.getMonth() + 1).padStart(2, '0')}`;
      const monthDisplay = salesDate.toLocaleString("en-US", { month: "long", year: "numeric" });
      
      if (!salesByMonth[monthKey]) {
        salesByMonth[monthKey] = {
          month: monthDisplay,
          sales: [],
          totalSales: 0,
          sortKey: monthKey
        };
      }
      
      salesByMonth[monthKey].sales.push(item);
      salesByMonth[monthKey].totalSales += item.sale * item.quantity;
    });
    
    const monthData = Object.values(salesByMonth).sort((a, b) => 
      b.sortKey.localeCompare(a.sortKey)
    );
    
    return monthData;
  } catch (error) {
    console.error("Error fetching thirty day sales:", error);
    throw error;
  }
}


export async function billUpload({soldItem}:{soldItem: itemTypes[] | []}) {

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  
try{

  soldItem.forEach(async (item,index) => {
    const response = await prisma.dashboard.create({
      data:{
        quantity:item.quantity,
        sale: item.price,
        typedish:item.typedish,
        day: new Date(formattedDate),
      }
    }) 
  })
  return { status:true }
  }catch(error){
    console.error("Error",error);
    return {status:false}
  }
}


export async function logout(){
  // @ts-ignore
  const cookieStore = cookies();
  // @ts-ignore
   const cookie = cookieStore.get("pos-token");
   if(cookie?.value){
     cookieStore.delete("pos-token")
    return true
   }
  //  console.log(cookie)
   return false;
}