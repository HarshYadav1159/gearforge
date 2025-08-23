'use client'
import { useState } from "react"
import About from "./sections/About"
import Media from "./sections/Media"
import Platforms from "./sections/Paltforms"
import { GameModel } from "@/app/models/game_model"

interface GameDetailsProps{

    gameModel : GameModel
    companiesName : string[]

}

function GameDetails({gameModel,companiesName}: GameDetailsProps) {

    const [clickedItem, setClickItem] = useState<string>('About')

    const onClickItemHandler = (item: string) => {
        setClickItem(item)
    }

    function renderSection(sectionName: string,gameModel:GameModel) {

        switch (sectionName) {
            case 'About':
                return <About gameModel={gameModel} companies_name={companiesName} className="grid grid-cols-2 gap-2 text-white"/>
            case 'Media':
                return <Media gameModel={gameModel} className="w-[60vw] flex flex-col justify-center items-center"/>
            case 'Platforms':
                return <Platforms />
            default:
                return <div>Some Error</div>
        }

    }

    return (<><div className="relative text-xl m-4 h-auto w-fit flex select-none">
        <div onClick={() => onClickItemHandler('About')} className={`absolute py-2 px-4 cursor-pointer  rounded-tl-2xl rounded-tr-2xl ${clickedItem === 'About' ? 'transition-all duration-300 ease-in-out bg-gray-800 z-10 text-white' : 'bg-gray-600 z-0'}`}>About</div>
        <div onClick={() => onClickItemHandler('Media')} className={`absolute py-2 px-4 cursor-pointer bg-gray-600  rounded-tl-2xl rounded-tr-2xl ml-19 ${clickedItem === 'Media' ? 'transition-all duration-300 ease-in-out bg-gray-800 z-10 text-white' : 'bg-gray-600 z-0'}`}>Media</div>
        <div onClick={() => onClickItemHandler('Platforms')} className={`absolute py-2 px-4 cursor-pointer bg-gray-600 rounded-tl-2xl rounded-tr-2xl ml-38 ${clickedItem === 'Platforms' ? 'transition-all duration-300 ease-in-out bg-gray-800 z-10 text-white' : 'bg-gray-600 z-0'}`}>Platforms</div>
    </div>
        <div className="mt-7 w-fit min-w-150 max-w-[80vw]  h-auto bg-gray-800 p-4 rounded-xl">
            {renderSection(clickedItem,gameModel )}
        </div>
    </>)
}

export default GameDetails