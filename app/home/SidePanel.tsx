import GenreList from "./GenreList"
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
function SidePanel() {

    const panelListStyle = `flex gap-2 p-2 items-center cursor-pointer hover:bg-neutral-700 hover:text-white hover:rounded-xl`

    return (<>
        <div className="w-[280px] h-screen bg-[#242528]">

            <div className="flex flex-col px-4 py-8 gap-2 ">
                <div className={panelListStyle}>
                    <MdOutlineSportsMartialArts />
                    <div >E-Sports Tournaments</div>
                </div>
                <div className={panelListStyle}>
                    <MdLiveTv/>
                    <div >Watch Live Tournament</div>
                </div>
                <GenreList />
                
            </div>
        </div>
    </>)
}

export default SidePanel