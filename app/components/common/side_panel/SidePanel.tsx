'use client'
import Link from "next/link";
import GenreList from "./GenreList"
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { openPanel} from "./sidePanelSlice";
function SidePanel() {

    const panelListStyle = `flex gap-2 p-2 items-center cursor-pointer hover:bg-neutral-700 hover:text-white hover:rounded-xl`

    const dispatch = useAppDispatch()
    const isSidePanelOpen = useAppSelector((state)=>state.sidePanel.isOpen)

    useEffect(()=>{

        //Only display this continuosly if it's viewd in PC
        if(window.innerWidth >= 768){
            dispatch(openPanel())
        }
    },)

    // useEffect(()=>console.log(isSidePanelOpen))

    //Open by default for larger screens but can be toggled
    // className="mt-14 fixed z-20 w-60 h-screen bg-[#242528] hidden md:block"
    return (<>
        <div className={isSidePanelOpen ? `md:mt-14 mt-10 fixed z-20 w-60 h-screen bg-[#242528]` : `hidden`}>
            <div className="flex flex-col px-4 py-4 gap-2 ">
                <Link href={"/tournaments"}><div className={panelListStyle}>
                    <MdOutlineSportsMartialArts />
                    <div >E-Sports Tournaments</div>
                </div>
                </Link>
                {/* WILL BE ADDED LATER */}
                {/* <div className={panelListStyle}>
                    <MdLiveTv />
                    <div >Watch Live Tournament</div>
                </div> */}
                <GenreList />
            </div>
        </div>
    </>)
}

export default SidePanel