'use client'

import { useAppSelector } from "@/app/hooks"
import { GameModel } from "@/app/models/game_model"
import { format, fromUnixTime } from 'date-fns'

interface AboutProps {
    gameModel: GameModel
    companies_name: string[]
}

interface PlayerPerspective {
    id: number
    name: string
}

function About({ gameModel, companies_name }: AboutProps) {
    const player_perspective_data: PlayerPerspective[] = useAppSelector((state) => state.playerPerspective.player_perspective)
    const genreList = useAppSelector((state) => state.genres.genres)

    const player_perspectives: string[] = []
    if (gameModel.player_perspectives) {
        gameModel.player_perspectives.forEach((curr_id) => {
            const value = player_perspective_data.find((curr_elem) => curr_elem.id == curr_id)
            if (value) player_perspectives.push(value.name)
        })
    }

    const genres: string[] = []
    if (gameModel.genres) {
        gameModel.genres.forEach((curr_genreId) => {
            const genre = genreList.find((curr_genre) => curr_genre.id === curr_genreId)
            if (genre) genres.push(genre.name)
        })
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-white">
            <div className="font-semibold text-gray-400">Name</div>
            <div>{gameModel.name}</div>
            
            <div className="font-semibold text-gray-400">Release Date</div>
            <div>{gameModel.first_release_date ? format(fromUnixTime(gameModel.first_release_date), 'dd/MM/yyyy') : 'N/A'}</div>
            
            <div className="font-semibold text-gray-400">Franchise</div>
            <div>[Names]</div> {/* Placeholder */}
            
            <div className="font-semibold text-gray-400">Player Perspective</div>
            <div>{player_perspectives.length > 0 ? player_perspectives.join(", ") : 'NA'}</div>
            
            <div className="font-semibold text-gray-400">Involved Companies</div>
            <div>{companies_name.length > 0 ? companies_name.join(", ") : 'N/A'}</div>
            
            <div className="font-semibold text-gray-400">Game Engines</div>
            <div>Unreal, Unity</div> {/* Placeholder */}

            <div className="font-semibold text-gray-400">Genres</div>
            <div>{genres.length > 0 ? genres.join(", ") : 'N/A'}</div>
        </div>
    )
}

export default About