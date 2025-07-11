'use client'

import LoadingSpinner from "@/app/components/common/LoadingSpinner"
import { GameModel } from "@/app/models/game_model"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"

interface MediaModel {
    gameModel: GameModel
    className?: string
}

interface Video {
    id: number
    game: number //Id of the game
    video_id: string
    name: string
}

interface Screenshots {
    id:number,
    game:number,
    url:string,
    image_id:number
}

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!

const requestHeaders = {
    'Client-ID': '8t38bg3wjw6cfu643bmvww73yp3d0h',
    'Authorization': 'Bearer ' + apiKey
}

function Media({ gameModel, className }: MediaModel) {

    const vidQuery = useQuery({
        queryKey: [`${gameModel.id}_videos`],
        queryFn: async () => {
            const response = await axios.post('/api/game_videos', `fields id,name,game,video_id; where game = ${gameModel.id};`, {
                headers: requestHeaders
            })
            return response.data
        }
    })

    const ssQuery = useQuery({
        queryKey:[`${gameModel.id}_ss`],
        queryFn:async()=>{
            const response = await axios.post('/api/screenshots', `fields id,game,url, image_id; where game = ${gameModel.id};`,{
                headers:requestHeaders
            })
            return response.data
        }
    })

    if (vidQuery.isLoading) {
        return <LoadingSpinner />
    }

    if(ssQuery.isLoading){
        return <LoadingSpinner/>
    }

    return (<div className={className}>
        
        {/* If there is no video of a game then simply return empty div to not show anything */}
        { vidQuery.data.map((value: Video, index: number) => {
            return (<div key={value.id} className="w-full flex flex-col justify-center items-center p-2">

                <div className="text-2xl text-white">{value.name} #{index + 1}</div>
                {/* Using Embed URL for YouTube */}
                <iframe className='w-[600px] h-96 p-2 rounded-2xl' src={`https://www.youtube.com/embed/${value.video_id}`} title={value.name} allowFullScreen ></iframe>

            </div>)      
        })}

    <div className="text-2xl text-white">Screenshots</div>
        {ssQuery.data.map((value:Screenshots)=>{
                    
                    return (<div key={value.id}><Image className={'border-white w-[600px] h-96 p-2 rounded-2xl'}  src={`https://images.igdb.com/igdb/image/upload/t_720p/${value.image_id}.jpg`} height={1080} width={720} alt="Game Screenshot"/> </div>)
                })}

    </div>)
}

export default Media