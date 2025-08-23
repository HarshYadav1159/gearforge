'use client'

import LoadingSpinner from "@/app/components/common/LoadingSpinner"
import { GameModel } from "@/app/models/game_model"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import {useSearchParams } from "next/navigation"
import React from "react"
import GameDetails from "./game_details/GameDetails"
import { useAppSelector } from "@/app/hooks"
import { useCoverQuery, useGameQuery } from "../hooks/game"

interface InvolvedCompanyData{
    id:number,
    company:number,
}

interface CompanyData{
    id:number,
    name:string
}

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!

function GamePage({params}:{params:Promise<{gameId:number}>}) {

    const queryParams = useSearchParams()
    const {gameId} = React.use(params)
    const genreList = useAppSelector(state=>state.genres.genres)
    const genres:string[] = []
    const involved_companies_id : string[] = []
    const companies_id : string[] = []
    const companiesName:string[] = []

    let coverId = queryParams.get("cover")
    let gameData : GameModel    

    const headerObject = {
        'Client-ID': '8t38bg3wjw6cfu643bmvww73yp3d0h',
        'Authorization': 'Bearer ' + apiKey
    }

    //Query To get All Game Data : Mapping to endpoint : https://api.igdb.com/v4/games
    // const gameQuery = useQuery({
    //     queryFn: async () => {
    //         const response = await axios.post('/api/games', `fields *; where id=${gameId};`, {
    //             headers: headerObject
    //         })
    //         return response.data
    //     },
    //     queryKey: [`game_${gameId}`]
    // })

    const gameQuery = useGameQuery(gameId)

    const {data:gameCover, isLoading:coverIsLoading, isFetched:coverFetched} = useCoverQuery(gameId, coverId!)
    // const {data:gameCover, isLoading:coverIsLoading, isFetched:coverFetched} = useQuery({
    //     queryFn:async()=>{
    //         const response = await axios.post('/api/covers', `fields game,height,image_id,url; where game = ${gameId};`,{
    //             headers:headerObject
    //         })
    //         return response.data
    //     },

    //     queryKey:[`${gameId}_cover`],
    //     enabled:coverId==null
    // })

    /*
        Publishers List will be retrieved by following steps:
        1. Fetch Game Data
        2. Then Fetch Involved Companies Data from involved Companies Data
        3. From this, take company id
        4. Get data from Companies Endpoint
    */
   
    const involvedcompaniesQuery = useQuery({
        queryKey:[`involved_companies_${gameId}`],
        queryFn:async()=>{
            // console.log(`fields id,company; where id = (${involved_companies.join(",")});`)
            const response = await axios.post('/api/involved_companies', `fields id,company; where id = (${involved_companies_id.join(",")});`, {
                headers:headerObject
            })
           
            return response.data
        },
        enabled:gameQuery.isFetched
    })
    // console.log(involved_companies.join(","))

    const companyQuery = useQuery({
        queryKey:[`companies_for_${gameId}`],
        queryFn:async()=>{
            // console.log(`fields name,id; where id = (${companies.join(",")});`)
            const response = await axios.post('/api/companies', `fields name,id; where id = (${companies_id.join(",")});`,{
                headers:headerObject
            })
            return response.data
        },
        enabled:involvedcompaniesQuery.isFetched
    })

    if(gameQuery.isFetched){
        gameData = gameQuery.data[0]
        gameData.genres.forEach((curr_genre_id)=>{
        const genre = genreList.find((curr_genre)=>curr_genre.id===curr_genre_id)
        genres.push(genre!.name)
    })

    if(gameQuery.data[0].involved_companies !== undefined){

        console.log(gameQuery.data[0].involed)
            gameQuery.data[0].involved_companies.forEach((curr_involved_company:number)=>{
            involved_companies_id.push(curr_involved_company.toString())
        })   
        // fetchInvolvedCompaniesData = true    
    }
        // console.log("Involved Companies Are", involved_companies)
    }

    if(involvedcompaniesQuery.isFetched){

            involvedcompaniesQuery.data.forEach((company_id:InvolvedCompanyData)=>{
                companies_id.push(company_id.company.toString())
            })
            console.log("These are :", companies_id)

    }      
    // console.log(`(${involved_companies.join(",")})`)

    if(companyQuery.isFetched){
        companyQuery.data.map((value:CompanyData)=>{
            companiesName.push(value.name)
        })
    }

    if(coverId==null && coverFetched){
        coverId=gameCover[0].image_id
    }
    
    const imageUrl : string =`https://images.igdb.com/igdb/image/upload/t_1080p/${coverId}.jpg`

    if(gameQuery.isLoading){
        return (<div className="w-screen h-screen justify-center items-center"><LoadingSpinner/></div>)
    }


    return (
        <div className="m-12 max-w-screen flex flex-col min-h-screen">
            <div className="flex gap-2 items-center w-full">

            <div className="w-54 h-54 rounded-xl">
                   {coverIsLoading? <div className="w-54 h-54 rounded-xl bg-gray-800 animate-pulse"></div>: <Image className="w-54 h-60 rounded-xl" src={imageUrl} height={1080} width={720} alt="Game Cover Image"/>}
            </div>
            <div className="ml-4 flex flex-col gap-2">
            <div><p className="text-2xl text-white">{gameData! !== undefined && gameData.name !== null ? gameData.name : `Game Data`}</p></div>
            <div><p className="">Developed By : {gameData! !== undefined && gameData.involved_companies !== null && companyQuery.isFetched ? companiesName.join(", "): `Loading...`}</p></div>
            <div><p className="">Rating : {gameData! !== undefined && gameData.rating !== undefined ? gameData.rating.toFixed(2) : `N/A`}</p></div>
            <div><p className="">Genre : {gameData! !== undefined && gameData.genres !== undefined ? genres.join(", ") : `N/A`}</p></div>
            </div>
            </div>
            <div className="px-4 w-full"><p className="mt-12 pr-8 text-xl leading-relaxed break-words ">{gameData! !== undefined && gameData.summary !== null ? gameData.summary : `Game Summary`}</p></div>
            <hr className="mt-8"/>
            <GameDetails gameModel={gameData!} companiesName={companiesName}/> 
        </div>
    );
}

export default GamePage