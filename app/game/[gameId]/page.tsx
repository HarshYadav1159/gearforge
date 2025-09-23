'use client'

import LoadingSpinner from "@/app/components/common/LoadingSpinner"
import { GameModel } from "@/app/models/game_model"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import React from "react"
import GameDetails from "./game_details/GameDetails"
import { useAppSelector } from "@/app/hooks"
import { useCoverQuery, useGameQuery } from "../hooks/game"

interface InvolvedCompanyData {
    id: number,
    company: number,
}

interface CompanyData {
    id: number,
    name: string
}

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!

function GamePage({ params }: { params: { gameId: number } }) {
    const queryParams = useSearchParams()
    const { gameId } = params
    const genreList = useAppSelector(state => state.genres.genres)
    const genres: string[] = []
    const involved_companies_id: string[] = []
    const companies_id: string[] = []
    const companiesName: string[] = []

    let coverId = queryParams.get("cover")
    let gameData: GameModel

    const headerObject = {
        'Client-ID': '8t38bg3wjw6cfu643bmvww73yp3d0h',
        'Authorization': 'Bearer ' + apiKey
    }

    const gameQuery = useGameQuery(gameId)

    const { data: gameCover, isLoading: coverIsLoading, isFetched: coverFetched } = useCoverQuery(gameId, coverId!)
    
    const involvedcompaniesQuery = useQuery({
        queryKey: [`involved_companies_${gameId}`],
        queryFn: async () => {
            const response = await axios.post('/igdb/involved_companies', `fields id,company; where id = (${involved_companies_id.join(",")});`, {
                headers: headerObject
            })
            return response.data
        },
        enabled: gameQuery.isSuccess && !!gameQuery.data[0]?.involved_companies
    })
    
    const companyQuery = useQuery({
        queryKey: [`companies_for_${gameId}`],
        queryFn: async () => {
            const response = await axios.post('/igdb/companies', `fields name,id; where id = (${companies_id.join(",")});`, {
                headers: headerObject
            })
            return response.data
        },
        enabled: involvedcompaniesQuery.isSuccess && companies_id.length > 0
    })

    if (gameQuery.isSuccess && gameQuery.data[0]) {
        gameData = gameQuery.data[0]
        if (gameData.genres) {
            gameData.genres.forEach((curr_genre_id) => {
                const genre = genreList.find((curr_genre) => curr_genre.id === curr_genre_id)
                if (genre) genres.push(genre.name)
            })
        }
        if (gameData.involved_companies) {
            gameData.involved_companies.forEach((curr_involved_company: number) => {
                involved_companies_id.push(curr_involved_company.toString())
            })
        }
    }

    if (involvedcompaniesQuery.isSuccess) {
        involvedcompaniesQuery.data.forEach((company_id: InvolvedCompanyData) => {
            companies_id.push(company_id.company.toString())
        })
    }

    if (companyQuery.isSuccess) {
        companyQuery.data.map((value: CompanyData) => {
            companiesName.push(value.name)
        })
    }

    if (coverId == null && coverFetched && gameCover && gameCover[0]) {
        coverId = gameCover[0].image_id
    }
    
    const imageUrl: string = `https://images.igdb.com/igdb/image/upload/t_1080p/${coverId}.jpg`

    if (gameQuery.isLoading) {
        return (<div className="w-screen h-screen flex justify-center items-center"><LoadingSpinner /></div>)
    }

    if (!gameQuery.data || gameQuery.data.length === 0) {
        return <div className="p-8 text-center">Game not found.</div>
    }

    gameData = gameQuery.data[0];

    return (
        <div className="m-4 md:m-8 lg:m-12 max-w-screen flex flex-col min-h-screen">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start w-full">

                <div className="w-56 self-center md:w-56 lg:w-64 md:self-start h-auto rounded-xl flex-shrink-0">
                    {coverIsLoading ? <div className="w-full aspect-[3/4] rounded-xl bg-gray-800 animate-pulse"></div> : <Image className="w-full h-auto rounded-xl" src={imageUrl} height={1080} width={720} alt="Game Cover Image" />}
                </div>

                <div className="flex flex-col gap-2 mt-4 md:mt-0 text-center md:text-left">
                    <div><p className="text-2xl md:text-3xl lg:text-4xl text-white">{gameData.name || `Game Data`}</p></div>
                    <div><p className="text-sm md:text-base">Developed By : {companyQuery.isSuccess ? companiesName.join(", ") : `Loading...`}</p></div>
                    <div><p className="text-sm md:text-base">Rating : {gameData.rating !== undefined ? gameData.rating.toFixed(2) : `N/A`}</p></div>
                    <div><p className="text-sm md:text-base">Genre : {genres.length > 0 ? genres.join(", ") : `N/A`}</p></div>
                </div>
            </div>
            <div className="w-full mt-8 md:mt-12"><p className="pr-0 md:pr-8 text-base md:text-lg lg:text-xl leading-relaxed break-words ">{gameData.summary || `Game Summary`}</p></div>
            <hr className="mt-8 border-gray-700" />
            <GameDetails gameModel={gameData} companiesName={companiesName} />
        </div>
    );
}

export default GamePage;