"use client";

import { useState } from "react";


export function Total({children,sale,type}:{children:React.ReactNode, sale:string ,type:string}){
  const [isReveal , setIsReveal] = useState<boolean>(true);
  
 return <figure className="relative cursor-pointer">
        <div className={`-z-20 flex w-[20rem] items-start justify-between rounded-lg bg-white shadow-md p-4 transition-all`}>
          {/* ${isReveal ? "blur-[3.5px]" : "blur-0"} transition-all`}> */}
          <div className="flex items-center justify-center text-[3rem] text-white bg-[#ff6600] p-3 rounded-lg">
            <div className="roun absolute -z-10 h-[4rem] w-[4rem] rounded-xl bg-[#e0f2fe]"></div>
            {children} 
          </div>
          {/* text-[#374151]  */}
          <div className="flex flex-col gap-2 text-black">
            <p className="text-xl font-normal">{type}</p>
            <p className="font-bold text-2xl">{sale}</p>
          </div>
        </div>
        {/* <div onClick={()=>setIsReveal(s => s = !s)} className="absolute top-0 right-0 m-1 cursor-pointer"> */}
        {/* <p>{isReveal ? <BiSolidHide /> :<GrView /> }</p></div> */}
        </figure>
}