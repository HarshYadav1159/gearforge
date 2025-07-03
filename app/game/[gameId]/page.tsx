'use client'

import LoadingSpinner from "@/app/components/common/LoadingSpinner"
import { GameModel } from "@/app/models/game_model"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import {useSearchParams } from "next/navigation"
import React from "react"

interface PlayerPerspective {
    id: number
    name: string
}

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!

function GameDetails({params}:{params:Promise<{gameId:string}>}) {

    const queryParams = useSearchParams()
    const {gameId} = React.use(params)
    let coverId = queryParams.get("cover")
    
    let gameData : GameModel
   
    const headerObject = {
        'Client-ID': '8t38bg3wjw6cfu643bmvww73yp3d0h',
        'Authorization': 'Bearer ' + apiKey
    }

    const playerPercpectiveQuery = useQuery({
        queryFn: async () => {
            const response = await axios.post('/api/player_perspectives', 'fields id,name;', {
                headers: headerObject
            })
            return response.data
        },
        queryKey: ['player_perspective']
    })

    const gameQuery = useQuery({
        queryFn: async () => {
            const response = await axios.post('/api/games', `fields *; where id=${gameId};`, {
                headers: headerObject
            })
            return response.data
        },
        queryKey: [`game_${gameId}`]
    })

    // const {data:gameScreenshots=[],isLoading:screenshotsIsLoading, isFetched:screenshotFetched} = useQuery({
    //     queryFn: async () => {
    //         const response = await axios.post('/api/screenshots', `fields game,height,image_id,url,width; where game = ${gameId};`, {
    //             headers: headerObject
    //         })
    //         return response.data
    //     },
    //     queryKey: [`${gameId}_ss`],
    //     enabled:gameQuery.isFetched && (gameQuery.data[0].screenshots !== undefined)
    // })

    const {data:gameCover, isLoading:coverIsLoading, isFetched:coverFetched} = useQuery({
        queryFn:async()=>{
            const response = await axios.post('/api/covers', `fields game,height,image_id,url; where game = ${gameId};`,{
                headers:headerObject
            })
            return response.data
        },

        queryKey:[`${gameId}_cover`],
        enabled:coverId==null
    })
    if(coverId==null && coverFetched){
        coverId=gameCover[0].image_id
    }
    
    const imageUrl : string =`https://images.igdb.com/igdb/image/upload/t_1080p/${coverId}.jpg`
    
    const perspectiveMap: Map<number, string> = new Map<number, string>()
    
    if (playerPercpectiveQuery.isFetched) {
        playerPercpectiveQuery.data.forEach((curr_item: PlayerPerspective) => {
            perspectiveMap.set(curr_item.id, curr_item.name)
        })
    }

    if(gameQuery.isLoading){
        return (<div className="w-screen h-screen justify-center items-center"><LoadingSpinner/></div>)
    }

    if(gameQuery.isFetched){
        // if(screenshotsIsLoading){
        //     return (<div className="w-screen h-screen justify-center items-center"><LoadingSpinner/></div>)
        // }
    }

    if(gameQuery.isFetched){
        gameData = gameQuery.data[0]
    }

    // if(screenshotFetched){
        
    // }

    return (
        <div className="m-12 w-full flex flex-col min-h-screen">
            <div className="flex gap-2 items-center w-full">

            <div className="w-54 h-54 rounded-xl">
                   {coverIsLoading? <div className="w-54 h-54 rounded-xl bg-gray-800 animate-pulse"></div>: <Image className="w-54 h-60 rounded-xl" src={imageUrl} height={1080} width={720} alt="Game Cover Image"/>}
            </div>
            <div className="flex flex-col gap-2">
            <div><p className="text-2xl text-white">{gameData! !== undefined && gameData.name !== null ? gameData.name : `Game Data`}</p></div>
            <div><p className="">Developed By : {gameData! !== undefined && gameData.involved_companies !== null ? gameData.involved_companies : `Game Data`}</p></div>
            <div><p className="">Rating : {gameData! !== undefined && gameData.rating !== undefined ? gameData.rating.toFixed(2) : `N/A`}</p></div>
            </div>
            </div>
            <div className="px-4 w-full"><p className="mt-8 pr-8 text-xl leading-relaxed break-words ">Description :<br/>{gameData! !== undefined && gameData.summary !== null ? gameData.summary : `Game Summary`}</p></div>
            <hr className="mt-8"/>
        </div>
    );
}

export default GameDetails