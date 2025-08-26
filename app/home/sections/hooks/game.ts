'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!;

const requestHeaders = {
  "Client-ID": "8t38bg3wjw6cfu643bmvww73yp3d0h",
  "Authorization": "Bearer " + apiKey
};

export function useHighestRatedQuery () {
  
    const gameQuery = useQuery({
    queryKey: ["highest_rated"],
    queryFn: async () => {
      const response = await axios.post(
        `/api/games`,
        "fields id, cover; sort rating desc;",
        {
          headers: requestHeaders,
        }
      );
      return response.data;
    },
  });
  return gameQuery
};

export function useCoversQuery(gameQueryisFetched:boolean, gameIds:string[]){
    
    // console.log("Is Game Query Fetched : ", gameQueryisFetched, "For Games : ", gameIds)
    const coverQuery = useQuery({
        queryFn: async () => {
            const response = await axios.post('/api/covers', `fields id,game,height,url,width, image_id; where game = (${gameIds.join(",")});`, {
                headers: requestHeaders
            })
            return response.data
        },

        enabled: gameQueryisFetched,

        queryKey: ['game_cover']
    })

    return coverQuery

}

