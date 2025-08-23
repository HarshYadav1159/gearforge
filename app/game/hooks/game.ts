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

export function useCoverQuery(gameId: number, coverId: string){
        
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