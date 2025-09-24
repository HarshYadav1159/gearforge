'use client'
import { GameCardModel } from "@/app/models/game_card_model"
import Image from "next/image"
import Link from "next/link"

interface CardProps {
    game: GameCardModel
}

function GameCard(props: CardProps) {
    
    // The conditional check for props.game.cover is added to prevent crashes
    if (!props.game.cover) {
        // You can return a placeholder or null if the cover is missing
        return (
            <Link href={`game/${props.game.id}`}>
                <div className="h-44 w-36 sm:h-52 sm:w-44 md:h-60 md:w-52 rounded-2xl flex flex-col cursor-pointer bg-neutral-800 border border-neutral-700">
                    <div className="flex-1 flex items-center justify-center text-center text-xs text-neutral-400 p-2">
                        {'Game'} (No Cover)
                    </div>
                </div>
            </Link>
        );
    }

    const imageUrl: string = `https://images.igdb.com/igdb/image/upload/t_720p/${props.game.cover.image_id}.jpg`
    
    return (
        <Link href={`game/${props.game.id}?cover=${props.game.cover.image_id}`}>
            <div className="h-44 w-36 sm:h-52 sm:w-44 md:h-60 md:w-52 rounded-2xl flex flex-col cursor-pointer">
                <Image className="h-full w-full rounded-2xl object-cover" src={imageUrl} height={1280} width={720} alt="Image banner" />
            </div>
        </Link>
    )
}
export default GameCard