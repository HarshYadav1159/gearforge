"use client"

import { useState } from "react";
import { MdCategory } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

const genreList:string[] = ['Tactical Shooter', 'RPG', 'Racing']

function GenreList() {

    const [expandedGenre, setExpand] = useState<boolean>(false)

    return (<>
        <div className="relative flex flex-col gap-2">
            {/* Show this when Genre is not expanded */}
            <div onClick={()=>setExpand((prevState=>!prevState))}className="relative flex gap-2 items-center hover:bg-neutral-700 hover:text-white hover:rounded-xl p-2 cursor-pointer">
                <MdCategory />
                <div>Genre</div>
                <span><MdKeyboardArrowRight className={expandedGenre ? `h-0 w-0 left-0` : `transition-all text-2xl duration-300 ease-in-out`}/></span>
                <span><MdKeyboardArrowDown  className={expandedGenre ? `transition-all text-2xl duration-300 ease-in-out` : `h-0 w-0 left-0`}/> </span>
                
            </div>
             <span className={expandedGenre ? `h-fit  px-2` : `h-0 w-0 left-0`}>

                {genreList.map((value,index)=>{
                    return(<div key={index} onClick={()=>console.log(value)}className={expandedGenre ? `hover:text-white hover:rounded-xl transition-all duration-300 ease-out mb-2 ml-4 p-2 visible cursor-pointer`:`h-0 w-0 left-0 invisible`}>
                            {value}
                    </div>)
                })}
            </span>
            
        </div>
    </>)
}

export default GenreList