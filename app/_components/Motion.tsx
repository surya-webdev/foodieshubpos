"use client"

import {motion} from "motion/react"


export function Motion({children }:{
  children:React.ReactNode
}){
 return <motion.section
        className="relative"
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(5px)" }}
        transition={{ duration: 1.3, ease: "easeIn", }}
      >
        {children}
      </motion.section>
}