import { MdOutlineSearch } from "react-icons/md";

interface SearchBarFields{

    name?:string
    type:string //type : text | number | password
    placeholder:string 
}

function SearchBar(prop:SearchBarFields){

    return (<>
    <div className="bg-[#161719] rounded-xl px-2 py-1 w-xs flex gap-2 items-center">
        <MdOutlineSearch className="text-xl"/>
        <input type={prop.type} name={prop.name} placeholder={prop.placeholder} className="w-full focus:outline-none" />
    </div>
    </>)
}

export default SearchBar