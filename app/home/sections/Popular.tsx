'use client'

import DraggableScroll from "@/app/components/common/DraggableScroll"
import GameCard from "@/app/components/common/GameCard"
import LoadingSpinner from "@/app/components/common/LoadingSpinner"
import { GameCardModel } from "@/app/models/game_card_model"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Popularity {
    //From Popularity primitives
    id: number
    game_id: number
    value: number
    popularity_source: number
    external_popularity_source: number
    [key: string]: number | string
}

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!

function Popular() {

    let gameIds: string[] = []
    const popularQuery = useQuery({

        queryFn: async () => {
            const response = await axios.post('/api/popularity_primitives', 'fields *; sort id asc; limit 10; sort value desc;', {
                headers: {
                    'Client-ID': '8t38bg3wjw6cfu643bmvww73yp3d0h',
                    'Authorization': 'Bearer ' + apiKey
                }
            })
            return response.data
        },
        queryKey: ['popular_games'],
    })

    const gameQuery = useQuery({
        queryFn: async () => {
            
            const response = await axios.post('/api/games', `fields *; where id=(${gameIds.join(",")});`, {
                headers: {
                    'Client-ID': '8t38bg3wjw6cfu643bmvww73yp3d0h',
                    'Authorization': 'Bearer ' + apiKey
                }
            })
            return response.data
        },
        queryKey: ['game_data'],
        enabled: popularQuery.isFetched
    })

    if (popularQuery.isFetched) {
        gameIds = popularQuery.data.map((e: Popularity) => e.game_id)
    }


    if (popularQuery.isLoading) {
        //Handle Card animation here
        return (<div></div>)
    }

    if (popularQuery.isError) {
        //Handle Card animation here
        return (<div>Error retrieving data</div>)
    }

    if (popularQuery.isFetched) {
        if (gameQuery.isLoading) {
            return (<LoadingSpinner />)
        }
        if (gameQuery.isError) {
            return (<div></div>)
        }
    }

    const data: Popularity[] = popularQuery.data
    console.log(data)

    return (<div className="ml-12 mr-12 mb-4">
        <p className="text-white text-3xl">
            Recently Popular
        </p>

        <div className="flex flex-col">
            <DraggableScroll>
                {gameQuery.data.map((value: GameCardModel, index: number) => {
                    return (<div key={index}><GameCard game={value} /></div>)
                })}
            </DraggableScroll>

        </div>
    </div>)
}

export default Popular