import Link from "next/link";
import GenreList from "./GenreList"
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
function SidePanel() {

    const panelListStyle = `flex gap-2 p-2 items-center cursor-pointer hover:bg-neutral-700 hover:text-white hover:rounded-xl`

    return (<>
        <div className="fixed z-20 w-60 h-screen bg-[#242528] hidden md:block">
            <div className="flex flex-col px-4 py-4 gap-2 ">
                <Link href={"/tournaments"}><div className={panelListStyle}>
                    <MdOutlineSportsMartialArts />
                    <div >E-Sports Tournaments</div>
                </div>
                </Link>
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