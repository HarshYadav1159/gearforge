"use client"
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar"
import Link from 'next/link'
import { MdMenu } from "react-icons/md";
import { useAppDispatch,  } from "@/app/hooks";
import { togglePanel } from "./side_panel/sidePanelSlice";

const navLink = [{name:'Home', href:'/'},
    {name:'Browse', href:'/browse_games'},
    {name:'Tournaments', href:'/tournaments'},
    {name:'Sign In', href:'/auth'}
]

function NavBar() {

    const pathName:string = usePathname()
    // const isSidePanelOpen = useAppSelector((state)=>state.sidePanel.isOpen)
    const dispatch = useAppDispatch()
    return (<>
        <div className="fixed z-50 h-fit p-3.5 w-full bg-[#242528] border-b border-black shadow-md shadow-black/50 flex justify-between items-center">
            <div className="hidden md:block">Logo</div>
            <MdMenu className="md:hidden" onClick={()=>{dispatch(togglePanel())}}/>
            <SearchBar className="bg-[#161719] rounded-xl px-2 py-1 w-xs gap-2 items-center hidden md:flex" type="text" name="game_search_field" placeholder="Search Game"/>
            <div className="flex gap-4 h-full ">
                {navLink.map((link)=>{
                    const isActive = pathName===link.href
                    return (
                        //Render only these items inside client
                        <Link
              key={link.name}
              href={link.href}
              className={`
                relative  
                flex items-center px-2
                hover:text-white
                ${isActive ? 'text-sm md:text-[1rem] text-blue-400' : 'text-sm md:text-[1rem]'}
                group                   
                overflow-hidden          
              `}
            >
              {link.name}
              {/* This is the actual animated underline */}
              <span 
                className={`
                  absolute bottom-0 left-0
                  h-[2px]              
                  bg-blue-400              
                  transition-all duration-300 ease-out 
                  origin-left           
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                `}
              ></span>
            </Link>
                    ) 
                })}
            </div>
        </div>
    </>)
}

export default NavBar