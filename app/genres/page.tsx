'use client'

import { useAppSelector } from "../hooks"

function Genres(){
    const genres = useAppSelector((state)=>state.genres.genres)
    
    return (<div className="m-16">
        {genres.map((value)=>{
            return (<div key={value.id}>{value.name}</div>)
        })}

    </div>)
}

export default Genres