'use client'

import { useAppSelector } from "@/app/hooks"
import { GameModel } from "@/app/models/game_model"
import { format, fromUnixTime } from 'date-fns'

interface AboutProps{
        className?: string
        gameModel : GameModel
        companies_name : string[]
}

interface PlayerPerspective{
    id:number
    name:string
}

function About({className, gameModel, companies_name}:AboutProps) {
    
    //Player Perspectives From the store
    const player_perspective_data : PlayerPerspective[] = useAppSelector((state)=>state.playerPerspective.player_perspective)
    const genreList = useAppSelector((state)=>state.genres.genres)

    const player_perspectives : string[] = []
    const genres : string[] = []

    if(gameModel.player_perspectives !== undefined){
    //Get Name of Player Perspective from their ID
    gameModel.player_perspectives.forEach((curr_id)=>{
        const value = player_perspective_data.find((curr_elem)=>curr_elem.id==curr_id)
        player_perspectives.push(value!.name)
    })
    }

    console.log(player_perspective_data)

    gameModel.genres.forEach((curr_genreId)=>{
        const genre = genreList.find((curr_genre)=>curr_genre.id===curr_genreId)
        genres.push(genre!.name)
    })

    return (<div className={className}>
        {/* Released in the format of UNIX Time Stamp */}
        <div>Name</div>
        <div>{gameModel.name}</div>
        <div> Release Date </div>
        <div>{format(fromUnixTime(gameModel.first_release_date),'dd/MM/yyyy')}</div>
        <div>Franchise</div>
        <div>[Names]</div>
        <div>Player Perspective  </div>
        <div>{player_perspectives.join(", ")===''?'NA':player_perspectives.join(", ")}</div>
        <div>Involved Companies</div>
        <div>{companies_name.join(",")}</div>
        <div>Game Engines</div>
        <div>Unreal, Unity</div>
        <div>Genres</div>
        <div>{genres.join(", ")}</div>
    </div>)
}

export default About