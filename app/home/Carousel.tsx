'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const imageList:string[] = ['/r6.png' ,'/fc-25.jpeg']

function Carousel(){

    //This will store index of current image on banner
        const [currImageOnBanner, setImage] = useState<number>(0)
        const [isTransitioning, setTransition] = useState<boolean>(true)

        useEffect(()=>{

            if(isTransitioning){

            const intervalId = setInterval(()=>{
                setImage((prevIndex)=>(prevIndex+1)%imageList.length)
            },5000)
            
            return () =>{
                clearInterval(intervalId)
            }
        }else{
            const timeOutID = setTimeout(()=>setTransition(true),20000)

            return ()=>{
                clearTimeout(timeOutID)
            }
        }
        },)
    
        useEffect(()=>{
            console.log(currImageOnBanner)
        })
    
        const handleNextArrowBtn = ()=>{
            setImage((prevIndex)=>(prevIndex+1)%imageList.length)
            setTransition(false)
        }
    
        const handlePrevArrowBtn = ()=>{
            setImage((prevIndex)=>Math.abs(prevIndex-1)%imageList.length)
            setTransition(false)
        }

    return (<>
         <div className="mt-8 relative w-full h-8/12 md:h-96 flex items-center justify-between">
                            <div onClick={handlePrevArrowBtn} className="rounded-full hover:border bg-black/50 h-8 w-8 z-10 m-8 flex items-center justify-center cursor-pointer">
                                <MdKeyboardArrowLeft className="text-xl"/>
                            </div>
                            {/* <img src="" className="absolute w-full bg-green-600 h-full"/> */}
        
                            {/* <img className="h-full w-fit rounded-2xl" src={"/r6.png"} alt="Main Carousel Banner"/> */}
                            <div className="relative select-none "><Image className="rounded-xl cursor-grab" src={imageList[currImageOnBanner]} alt="Main Carousel" height={620} width={720} objectFit="cover" /></div>
                            <div onClick={handleNextArrowBtn} className="rounded-full hover:border bg-black/50 h-8 w-8 z-10 m-8 flex items-center justify-center cursor-pointer">
                                <MdKeyboardArrowRight className="text-2xl"/>
                            </div>
                        </div>
        
                        <div className="flex w-full gap-2 justify-center mt-8">
                            {imageList.map((value,index)=>{
                                
                                return (<div key={index} onClick={()=>setImage(index)} className={index===currImageOnBanner?"bg-blue-400 h-2 w-2 rounded-full border":"bg-white h-2 w-2 rounded-full "}></div>)
                            })}
                        </div>
    </>)
}

export default Carousel