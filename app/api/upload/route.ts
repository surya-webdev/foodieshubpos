import prisma from "@/app/lib/db";
import { itemTypes } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
const today = new Date();
const formattedDate = today.toISOString().split("T")[0];

const {soldItem} = await req.json();

if(!soldItem || soldItem.length == 0){
  return NextResponse.json({status:false})
}

try{
  await Promise.all(
  soldItem.map(async (item :itemTypes) => {
    const response = await prisma.dashboard.create({
      data:{
        quantity:item.quantity,
        sale: item.price,
        typedish:item.name,
        day: new Date(formattedDate),
      }
    }) 
  }))

  return NextResponse.json({status:true});
  }catch(error){
    console.error("Error",error);
    return NextResponse.json({status:false});
  }
}