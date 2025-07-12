//Implement this as game model
'use client'
import { GameCardModel } from "@/app/models/game_card_model"
import Image from "next/image"
import Link from "next/link"
interface CardProps {
    game: GameCardModel
}

function GameCard(props: CardProps) {
    
    const imageUrl: string = `https://images.igdb.com/igdb/image/upload/t_720p/${props.game.cover.image_id}.jpg`
    
    return (<Link href={`game/${props.game.id}?cover=${props.game.cover.image_id}`}><div className="h-60 w-54 rounded-2xl flex flex-col cursor-pointer">
        <Image className="h-full w-full rounded-2xl" src={imageUrl} height={1280} width={720} alt="Image banner" />
    </div>
    </Link>)
}
export default GameCard