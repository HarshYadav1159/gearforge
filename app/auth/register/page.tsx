import Image from "next/image"

function Register() {
    return (<><div className="h-screen flex justify-center items-center">

        <form className="bg-[#242528] flex flex-col gap-3 p-4 w-[25vw] h-fit rounded-xl">
            <div className="flex justify-center"><p className="text-2xl text-white">Register</p></div>

            <div className="w-full">
                <input className="p-2 bg-[#161719] rounded w-full" placeholder="Name"></input>
            </div>
            <div className="w-full">
                <input className="p-2 bg-[#161719] rounded w-full" placeholder="Username"></input>
            </div>
             <div className="w-full">
                <input className="p-2 bg-[#161719] rounded w-full" placeholder="Email"></input>
            </div>
             <div className="w-full">
                <input className="p-2 bg-[#161719] rounded w-full" type="password" placeholder="Password"></input>
            </div>
             <div className="w-full">
                <input className="p-2 bg-[#161719] rounded w-full" type="password" placeholder="Confirm Password"></input>
            </div>
            <button className="border rounded-2xl p-2 transition-all duration-200 ease-in-out hover:bg-blue-500 hover:text-white cursor-pointer">Register</button>
            <p className="self-center">or You can sign in with</p>
            <div className="flex gap-2">
                <div className="w-full border rounded flex justify-center items-center p-2 cursor-pointer"><Image src={"/google-symbol.png"} height={30} width={30} alt="Google Logo"/><p>Google</p></div>
                <div className="w-full border rounded flex justify-center items-center p-2 bg-white cursor-pointer"><Image src={"/discord-logo.png"} width={1020} height={1020} alt="Discord Logo"/></div>
            </div>
        </form>
    </div></>)
}

export default Register
