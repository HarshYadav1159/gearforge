'use client'
import GameCard from "@/app/components/common/GameCard"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const highestRated:string[] = ['Game 1', 'Game 2', 'Game 3']
const apiKey = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN

function HighestRated(){

    const query = useQuery({
        queryKey:['highest_rated'],
        queryFn: async ()=>{

           const response =  await axios.post(`/api/games`,'fields *;', {
            headers:{
                'Client-ID':'8t38bg3wjw6cfu643bmvww73yp3d0h',
                'Authorization':'Bearer ' + apiKey
            }
           })
           return response.data
        }
    })

    if(query.isLoading){
        return (<div>Loading Data</div>)
    }

    if(query == null){
        return (<div>There is some error</div>)
    }

    console.log(query.data)

    return (<div className="m-12">
                    <p className="text-white text-3xl">
                        Highest Rated
                    </p>

                    <div className="flex flex-col w-fit">
                        <div className="flex gap-4 mt-4">
                            {query.data.map((value, index:number) => {
                                return (<div key={index}><GameCard/></div>)
                            })}
                        </div>
                        <div className="flex flex-row-reverse">
                            <p className="p-2 cursor-pointer hover:text-white">View All Highest Rated</p>
                        </div>
                    </div>
                </div>)
}

export default HighestRated