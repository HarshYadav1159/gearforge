'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

interface SearchBarFields {

    name?: string
    type: string //type : text | number | password
    placeholder: string
    className?: string
}

interface SearchResults {
    id: number
    name: string
}


const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!

const requestHeaders = {
    'Client-ID': '8t38bg3wjw6cfu643bmvww73yp3d0h',
    'Authorization': 'Bearer ' + apiKey
}

function SearchBar(prop: SearchBarFields) {

    const [inputField, setInput] = useState<string>('')
    const searchInputandler = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

    const searchQuery = useQuery({
        queryFn: async () => {
            const response = await axios.post('/igdb/games', `fields id,name; search "${inputField}";`, {
                headers: requestHeaders
            })
            return response.data
        },
        queryKey: [`search_result`, inputField],
        enabled: inputField.trim().length > 0,
    })

    const searchedItems: SearchResults[] = searchQuery.data

    return (<>
        <div className="relative flex-col">
            <div className={inputField.length == 0 ? `${prop.className} rounded-xl` : `${prop.className} rounded-t-xl`}>
                <MdOutlineSearch className="text-xl" />
                <input onChange={searchInputandler} type={prop.type} name={prop.name} placeholder={prop.placeholder} className="w-full focus:outline-none" />
            </div>
            <div className={inputField.length == 0 ? `hidden` : `absolute bg-[#242528] rounded-b-xl w-full p-2`}>
                {searchQuery.isLoading ? <div className="flex justify-center items-center h-full w-full"><LoadingSpinner /></div>
                    : searchQuery.isError ? <div>Error Retrieving </div>
                        : searchedItems != null ? <div> {searchedItems.map((value) => {
                            return (<Link href={`/game/${value.id}`}  key={value.id}><div onClick={()=>setInput('')}>
                                <p className="leading-relaxed w-full mt-4 p-2 cursor-pointer hover:bg-neutral-700 hover:text-white hover:rounded-xl">{value.name}</p>
                            </div></Link>)
                        })} </div>
                            : <div></div>}
                <br /></div>

        </div>
    </>)
}

export default SearchBar