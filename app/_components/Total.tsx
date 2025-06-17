"use client";

import { useState } from "react";


export function Total({children,sale,type}:{children:React.ReactNode, sale:string ,type:string}){
  const [isReveal , setIsReveal] = useState<boolean>(true);
  
 return <figure className="relative cursor-pointer">
        <div className={`-z-20 flex w-[18rem] items-start justify-between rounded-lg bg-slate-100 p-4 transition-all`}>
          {/* ${isReveal ? "blur-[3.5px]" : "blur-0"} transition-all`}> */}
          <div className="flex items-center justify-center text-[3.8rem] text-[#0369a1]">
            <div className="roun absolute -z-10 h-[4rem] w-[4rem] rounded-xl bg-[#e0f2fe]"></div>
            {children} 
          </div>
          <div className="text-[#374151]">
            <p className="text-2xl">{type}</p>
            <p>{sale}</p>
          </div>
        </div>
        {/* <div onClick={()=>setIsReveal(s => s = !s)} className="absolute top-0 right-0 m-1 cursor-pointer"> */}
        {/* <p>{isReveal ? <BiSolidHide /> :<GrView /> }</p></div> */}
        </figure>
}