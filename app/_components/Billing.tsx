"use client";


import axios from "axios";
import { GiEmptyHourglass } from "react-icons/gi";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useItem } from "../lib/ItemContexts";
import { getCurrentOrder } from "../lib/actions";
import { apiResponse, itemTypes } from "../types";


export function Billing() {


  const { isItem, removeItem, resetItem } = useItem();  
  const [isLoading , setIsLoading] = useState<boolean>(false)

  const [orderType, setOrderType] = useState("Parcel")
  const [paymentStatus, setPaymentStatus] = useState("Paid")
  const [paymentMode, setPaymentMode] = useState("UPI")

  const orderTypes = ["Dine-in", "Parcel"]
  const paymentStatuses = ["Paid", "Not Paid"]
  const paymentModes = ["UPI", "Cash" , "Yet to Pay"]

  function reset() {
    resetItem();
  }

  let total = 0;

  for (let i = 0; i < isItem.length ; i++){
    let itemQuantity = isItem[i].quantity ? isItem[i].quantity : 1;
    total = total + isItem[i].price * itemQuantity;
  }

  async function printHandler() {
  
    setIsLoading(true)
    if (isItem.length === 0 && !total) {
      return;
    }
    
    try {
      const order = await getCurrentOrder();

      const res = await axios.post("http://localhost:3001/print",{
        items: isItem,
        totalPrice: total,
        order:order?.order,
        orderType,
        payStatus:paymentStatus,
        payMode:paymentMode
      });


      if (res.data.message == "success") {

       const response : apiResponse = await axios.post("/api/upload",{soldItem:isItem});

       if(response.data.status == true){
         reset();
         toast.success("Sucessfully added to the database", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
       }else{
        toast.error(
                   "Error Occured!",
                   {
                     position: "top-right",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     theme: "light",
                   },
                 );
       }

      }

    } catch (error) {
      console.error("Error Message", error);
       toast.error(
                   "Please Connect your printer! or Error while fetching",
                   {
                     position: "top-right",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     theme: "light",
                   },
                 );
    }finally{
      setIsLoading(false)
    }
  }

  async function saveHandler() {
    
    setIsLoading(true);

    if (isItem.length === 0 && !total) {
      return;
    }


    try{
      const response : apiResponse = await axios.post("/api/upload",{soldItem:isItem});

      if(response.data.status == true){
        reset();
        toast.success("Sucessfully added to the database", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
       }else{
        toast.error(
          "Error Occured!",
                   {
                     position: "top-right",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     theme: "light",
                   },
                 );
       }
      }catch (error) {
      console.error("Error Message", error);
       toast.error(
                   "Something Wrong with the database!",
                   {
                     position: "top-right",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     theme: "light",
                   },
                 );
    }finally{
      setIsLoading(false)
    }
    }

  async function kitchenHandler() {
    setIsLoading(true);
    
    if (isItem.length === 0) {
      return;
    }
    try {
      const res = await axios.post("http://localhost:3001/kitchen", {
        items: isItem,
      });
      return res;
    } catch (error) {
      console.error("Error Message", error);
       toast.error(
                   "Please Connect your printer!",
                   {
                     position: "top-right",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     theme: "light",
                   }
    );
    }finally{
      setIsLoading(false)
    }
  }

 return (

  <div className="flex flex-col justify-between px-4 py-6 font-bold overflow-y-scroll">
     {isItem.length > 0  ?
     <>
        <div>
          <div className="flex justify-between py-4 text-2xl text-[#d6651f]">
            <p>Food</p>
            <p className="translate-x-8">Quantity</p>
            <p>Price</p>
            <div></div>
          </div>

          {isItem?.map((item: itemTypes) => (
            <>
              <div
                className="flex items-center justify-between py-4"
                key={item.id + Math.random() * 1000}
              >
                <div className="inline-block w-[11.5rem]">
                  <p>{item.name}</p>
                </div>
                <div className="w-[5rem]">{item.quantity ?? 1}</div>
                <div className="inline-block">
                  <p>{item.price * (item.quantity > 1 ? item.quantity : 1)}</p>
                </div>
                <div className="self-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xl text-red-600"
                  >
                    <TiDelete />
                  </button>
                </div>
              </div>
              <hr />
            </>
          ))}
          <div className="my-10">
            <hr />
            {total > 0 && (
              <div className="flex justify-between pt-8">
                <p className="inline-block">Total:</p>
                <p className="inline-block">{`₹ ${total}`}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button onClick={() => reset()} className="underline">
              Clear All
            </button>
          </div>

    <div className="order-info bg-white rounded-md p-4 mt-4 shadow-sm flex gap-6 justify-between items-center">
      <div className="space-y-6">
        {/* Order Type Buttons */}
        <div className="space-y-2">
          <label className="font-semibold text-2xl">Order Type</label>
          <div className="flex gap-2">
            {orderTypes.map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={
                  orderType === type
                    ? "bg-[#d6651f] hover:bg-[#d6651fed] text-white px-4 py-2 rounded-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 px-4 py-2 rounded-md"
                }
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Status Buttons */}
        <div className="space-y-2">
          <label className="font-semibold text-sm">Payment Status:</label>
          <div className="flex gap-2">
            {paymentStatuses.map((status) => (
              <button
                key={status}
                onClick={() => setPaymentStatus(status)}
                className={
                  paymentStatus === status
                     ? "bg-[#d6651f] hover:bg-[#d6651fed] text-white px-4 py-2 rounded-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 px-4 py-2 rounded-md"
                }
              >
                {status}
              </button>
            ))}
          </div>
        </div>

       
      </div>
    <div className="pt-4  text-lg">
          <p className="text-center text-2xl pb-3">
            <>Order Overview</>
          </p>
          <p >
            Order Type: 
            <span className="text-primary">{" "}{orderType}</span>
          </p>
          <p>Payment Status: <span className="text-primary">{" "}{paymentStatus}</span></p>
         
    </div>
      </div>
    </div>


          <div className="flex w-full flex-col items-center justify-center gap-4 pt-8">
            <button
              disabled={!isItem.length || isLoading}
              onClick={() => printHandler()}
              className="w-full rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
            >
              Print
            </button>
            <p>(or)</p>
            <button
              disabled={!isItem.length || isLoading}
              onClick={() => kitchenHandler()}
              className="w-full rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
              >
              Kitchen Order
            </button>
            <p>(or)</p>
            <button
              disabled={!isItem.length || isLoading}
              onClick={() => saveHandler()}
              className="w-full rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
            >
              Save and Don't Print
            </button>
          </div>
        <div className=""></div>
        <div></div>
      </>
     : <>
     <div className="flex self-center justify-self-center py-[50%] justify-center items-center">
      <p className="py-2 text-red-600">
          <GiEmptyHourglass />
      </p>
      <p className="">No item here!</p>
     </div>
    </>
}     
</div>
)}