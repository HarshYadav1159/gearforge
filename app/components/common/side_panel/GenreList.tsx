"use client"

import { addGenre } from "@/app/genres/genreSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Link from "next/link";
import { useState } from "react";
import { MdCategory } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
// const genreList:string[] = ['Tactical Shooter', 'RPG', 'Racing']

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!

const requestHeaders = {
    'Client-ID': '8t38bg3wjw6cfu643bmvww73yp3d0h',
    'Authorization': 'Bearer ' + apiKey
}

// interface GenreQueryResponse{
//     id:number
//     name:string
// }

function GenreList() {

    const [expandedGenre, setExpand] = useState<boolean>(false)
    const genreList = useAppSelector((state)=>state.genres.genres)
    // const [isTransferGenre, setTransfer] = useState<boolean>(true)
    // const genreQuery = useQuery({
    //     queryFn:async()=>{
    //             const response = await axios.post('/api/genres','fields id, name; limit 10;',{
    //                 headers:requestHeaders
    //             } )
    //             return response.data
    //     },
    //     queryKey:['genre_list'],
    //     // enabled:expandedGenre
    // })

    // const dispatch : Dispatch = useAppDispatch()
    // const genreList : GenreQueryResponse[]= genreQuery.data

    // const {data:genres = [], isFetched:genresFetched} = useQuery({
    //     queryFn:async()=>{
    //             const response = await axios.post('/api/genres','fields id, name; limit 50;',{
    //                 headers:requestHeaders
    //             } )
    //             return response.data
    //     },
    //     queryKey:['all_genres'],
    // })

    // if(genresFetched && isTransferGenre){
    //     genres.forEach((element:GenreQueryResponse) => {
    //         dispatch(addGenre(element))
    //     });
    //     setTransfer(false)
    // }


    return (<>
        <div className="relative flex flex-col gap-2 select-none">
            {/* Show this when Genre is not expanded */}
            <div onClick={()=>setExpand((prevState=>!prevState))}className="relative flex gap-2 items-center hover:bg-neutral-700 hover:text-white hover:rounded-xl p-2 cursor-pointer">
                <MdCategory />
                <div>Genre</div>
                <span><MdKeyboardArrowRight className={expandedGenre ? `h-0 w-0 left-0` : `transition-all text-2xl duration-300 ease-in-out`}/></span>
                <span><MdKeyboardArrowDown  className={expandedGenre ? `transition-all text-2xl duration-300 ease-in-out` : `h-0 w-0 left-0`}/> </span>
                
            </div>
             <span className={expandedGenre ? `h-fit  px-2` : `h-0 w-0 left-0`}>

                {genreList==null ? <div></div>:genreList.slice(0,10).map((value,index)=>{
                    return(<div key={index} onClick={()=>console.log(value)}className={expandedGenre ? `hover:text-white hover:rounded-xl transition-all duration-300 ease-out mb-2 ml-4 p-1 visible cursor-pointer`:`h-0 w-0 left-0 invisible`}>
                            {value.name}
                    </div>)
                })}
                <div className={expandedGenre ? `hover:text-white hover:rounded-xl transition-all duration-300 ease-out mb-2 ml-4 p-1 visible cursor-pointer `:`h-0 w-0 left-0 invisible`}>
                    <Link href={"/genres"}><div className="flex gap-2">
                    <p>Explore More</p>
                    <MdArrowForward className="text-2xl"/>
                    </div>
                    </Link>
                </div>
            </span>
            
        </div>
    </>)
}

export default GenreList