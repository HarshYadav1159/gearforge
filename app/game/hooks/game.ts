import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!;

const requestHeaders = {
  "Client-ID": "8t38bg3wjw6cfu643bmvww73yp3d0h",
  "Authorization": "Bearer " + apiKey
};

export function useGameQuery(gameId: number){

    return useQuery({
        queryFn: async () => {
            const response = await axios.post('/api/games', `fields *; where id=${gameId};`, {
                headers: requestHeaders
            })

            return response.data
        },
        queryKey: [`game_${gameId}`]
    })
}

export function useCoverQuery(gameId: number, coverId?: string| null){
        
    return useQuery({
        queryFn:async()=>{
            const response = await axios.post('/api/covers', `fields game,height,image_id,url; where game = ${gameId};`,{
                headers:requestHeaders
            })
            return response.data
        },

        queryKey:[`${gameId}_cover`],
        enabled:coverId==null
    })
}

export function useGenreQuery(genreId: number, page: number = 1, pageSize: number = 10){

    return useQuery({
        queryFn: async () => {
            const offset = (page - 1) * pageSize

            // first request: genres referenced directly
            const body1 = `fields *; where genres=${genreId}; limit ${pageSize}; offset ${offset};`
            const response1 = await axios.post('/api/games', body1, {
                headers: requestHeaders
            })

            // second request: genre id enclosed in parentheses
            const body2 = `fields *; where genres=(${genreId}); limit ${pageSize}; offset ${offset};`
            const response2 = await axios.post('/api/games', body2, {
                headers: requestHeaders
            })

            const data1 = Array.isArray(response1.data) ? response1.data : []
            const data2 = Array.isArray(response2.data) ? response2.data : []

            // combine and dedupe by id
            const combined = [...data1, ...data2]
            const dedupMap = new Map<number, any>()
            for (const item of combined) {
                if (item && typeof item.id === "number") dedupMap.set(item.id, item)
            }
            const result = Array.from(dedupMap.values())

            return result
        },
        queryKey: [`genre_${genreId}`, `page_${page}`, `size_${pageSize}`]
    })
}