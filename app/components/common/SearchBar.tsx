import { MdOutlineSearch } from "react-icons/md";

interface SearchBarFields{

    name?:string
    type:string //type : text | number | password
    placeholder:string 
    className?:string
}

function SearchBar(prop:SearchBarFields){

    return (<>
    <div className={prop.className}>
        <MdOutlineSearch className="text-xl"/>
        <input type={prop.type} name={prop.name} placeholder={prop.placeholder} className="w-full focus:outline-none" />
    </div>
    </>)
}

export default SearchBar