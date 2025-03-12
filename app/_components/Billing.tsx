"use client";


import axios from "axios";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import "react-toastify/dist/ReactToastify.css";
import { GiEmptyHourglass } from "react-icons/gi";

import { apiResponse, itemTypes } from "../types";
import { useItem } from "../lib/ItemContexts";
import { billUpload } from "../lib/actions";



export function Billing() {

  const { isItem, removeItem, resetItem } = useItem();

  function reset() {
    resetItem();
  }

  let total = 0;

  for (let i = 0; i < isItem.length ; i++){
    let itemQuantity = isItem[i].quantity ? isItem[i].quantity : 1;
    total = total + isItem[i].price * itemQuantity;
  }

  async function printHandler() {

    if (isItem.length === 0 && !total) {
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:3001/print",{
        items: isItem,
        totalPrice: total,
      });


      if (res.data.message == "success") {
       const response : apiResponse = await axios.post("/api/upload",{soldItem:isItem});
      //  await billUpload({soldItem:isItem});
      //@ts-ignore
       if(response.status == true){
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
                   "Please Connect your printer!",
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

  async function saveHandler() {
    
    if (isItem.length === 0 && !total) {
      return;
    }
      const response : apiResponse = await axios.post("/api/upload",{soldItem:isItem});
      // const response = await billUpload({soldItem:isItem});
       if(response.status == true){
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

  async function kitchenHandler() {
    if (isItem.length === 0) {
      return;
    }

// /api/food/kitchen"
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
    }
  }

 return (
  
  <div className="flex flex-col justify-between bg-slate-50 px-4 py-6 font-bold overflow-y-scroll">
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
              <div className="flex justify-between py-8">
                <p className="inline-block">Total:</p>
                <p className="inline-block">{`₹ ${total}`}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end py-2">
            <button onClick={() => reset()} className="underline">
              Clear All
            </button>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <button
              disabled={!isItem.length}
              onClick={() => printHandler()}
              className="w-full rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
            >
              Print
            </button>
            <p>(or)</p>
            <button
              disabled={!isItem.length}
              onClick={() => kitchenHandler()}
              className="w-full rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
              >
              Kitchen Order
            </button>
            <p>(or)</p>
            <button
              disabled={!isItem.length}
              onClick={() => saveHandler()}
              className="w-full rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
            >
              Save and Don't Print
            </button>
          </div>
        </div>
        <div className=""></div>
        <div></div>
      </>
     : <>
     <div className="flex self-center justify-self-center justify-center items-center">
      <p className="py-2 text-red-600">
          <GiEmptyHourglass />
      </p>
      <p>No item here!</p>
     </div>
    </>
}     
</div>
)
}