'use client'

import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import React, { ChangeEvent, useEffect, useState } from "react"
import { login } from "../api"
import { loginUser } from "../userSlice"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import { useAppDispatch } from "../hooks"

function AuthenticationPage() {

    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
    }, [password, email, setEmail, setPassword])

    const login_user = useMutation({
        mutationKey: ['login_user'],
        mutationFn: async () => login({ email: email, password: password }),
        onSuccess: () => {
            dispatch(loginUser())
            router.push("/")
            console.log("User Logged in Successfully")
        },
        onError:(error:AxiosError)=>{
            console.log(error)
        }
    })

    const handleLogin = (e:React.FormEvent) => {
        e.preventDefault()
        login_user.mutate()
    }

    return (<>
        <div className="flex justify-center items-center h-screen">

            <form className="h-fit w-[25vw] bg-[#242528] rounded-2xl p-4 flex flex-col justify-center">

                <h1 className="text-2xl text-white self-center mt-2">Sign in</h1>
                <div className="p-2 flex flex-col gap-3 mt-2">
                    <input onChange={handleEmailInput} className="rounded-xl bg-[#161719] w-full p-2" placeholder="Enter Your Email"></input>
                    <input onChange={handlePasswordInput} className="rounded-xl bg-[#161719] w-full p-2" placeholder="Enter Your Password"></input>
                    <p className="ml-1 text-[0.9rem] hover:underline cursor-pointer w-fit">Forgot Password ?</p>
                    <div className="flex gap-2">
                        <button onClick={handleLogin} className="border p-2 w-full rounded-xl cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200 ease-in-out">Login</button>
                        <Link className="w-full" href={"/auth/register"}><button className="border p-2 w-full rounded-xl cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out">Register</button ></Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button className="flex w-full items-center bg-blue-600 cursor-pointer hover:border"><Image className="bg-white" src={"/google-symbol.png"} width={40} height={40} alt="Google Logo" /><p className="w-full self-center text-white">Sign in With Google</p></button>
                        <button className="flex w-full items-center bg-[#5968F0] cursor-pointer hover:border"><Image className="bg-white" src={"/discord-symbol.png"} width={40} height={50} alt="Discord logo" /><p className="w-full self-center text-white">Sign in With Discord</p></button >
                    </div>
                </div>
            </form>
        </div>
    </>)
}

export default AuthenticationPage