'use client'

import { updateUserPassword, verifyResetLink } from "@/app/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
import { MdOutlineVisibilityOff, MdVisibility, MdVisibilityOff } from "react-icons/md"

function ResetPassword() {

    const queryParams = useSearchParams()
    const router = useRouter()
    // const { token } = React.use(params)
    const token = useMemo(()=>queryParams.get("token") ?? "", [queryParams])

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isSamePassword, setSamePassword] = useState<boolean>(true)
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)
    const [isConfirmPasswordVisible, setConfirmPasswordVisibile] = useState<boolean>(false)
    const [isValidPasswordLength, setValidPasswordLength] = useState<boolean>(true)

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)

    const handleSetPasswordClick = (e: React.FormEvent) => {
        e.preventDefault()
        update_pwd.mutate()

    }

    useEffect(() => {

        if (password.length >= 8)
            setValidPasswordLength(true)
        else if (password.length !== 0)
            setValidPasswordLength(false)

        if (password === confirmPassword) {
            setSamePassword(true)
        } else if (confirmPassword !== "") {
            setSamePassword(false)
        }
        // console.log("Password : ", password, " Confirm Password: ", confirmPassword)

    }, [confirmPassword, password, setConfirmPassword, setPassword])


    const verification_q = useQuery({
        queryKey: ['verification_token'],
        queryFn: async () => verifyResetLink(token),
        retry:false,
    })

    const update_pwd = useMutation({
        mutationKey: ['pwd_update'],
        mutationFn: async () => updateUserPassword(verification_q.data.user_id, confirmPassword),
        onError: (error: AxiosError) => {
            console.log(verification_q.data.user_id)
            console.log(error)
        },
        onSuccess: () => {

            //Login the user after password reset
            router.replace("/auth")
        }
    })

    if (verification_q.isError) {
        return (<div>Invalid Token / Token Expired</div>)
    }

    if(verification_q.data){
        console.log(verification_q.data.user_id)
    }

    return (<>
        <div className="flex justify-center items-center h-screen">

            <form className="h-fit w-[25vw] bg-[#242528] rounded-2xl p-4 flex flex-col justify-center">

                <h1 className="text-2xl text-white self-center mt-2">Set New Password</h1>
                <div className="p-2 flex flex-col gap-3 mt-2">
                    <div className="relative w-full ">
                        <input onChange={handlePasswordInput} className="p-2 bg-[#161719] rounded w-full" type={isPasswordVisible ? "text" : "password"} placeholder="Password"></input>
                        <div onClick={() => setPasswordVisible(prevState => !prevState)} className="absolute right-3 p-1 top-1/2 -translate-y-1/2 hover:bg-neutral-700 hover:rounded-2xl cursor-pointer text-white select-none text-xl">{isPasswordVisible ? <MdVisibility /> : <MdOutlineVisibilityOff />}</div>
                    </div>
                    <span className={isValidPasswordLength ? "hidden" : ""}>{!isValidPasswordLength ? <p className="text-red-600" >Password must be at least 8 characters</p> : <p></p>}</span>
                    <div className="w-full relative">
                        <input onChange={handleConfirmPassword} className="p-2 bg-[#161719] rounded w-full" type={isConfirmPasswordVisible ? "text" : "password"} placeholder="Confirm Password"></input>
                        <div onClick={() => setConfirmPasswordVisibile(prevState => !prevState)} className="absolute right-3 p-1 top-1/2 -translate-y-1/2 hover:bg-neutral-700 hover:rounded-2xl  cursor-pointer text-white select-none text-xl">{isConfirmPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}</div>
                    </div>
                    <span>{!isSamePassword ? <p className="text-red-600" >Passwords do not match</p> : ""}</span>
                    <div className="flex gap-2">
                        {/* IF NEW PASSWORD IS SET SUCCESSFULLY REDIRECT TO HOME PAGE */}
                        <button onClick={handleSetPasswordClick} className="border p-2 w-full rounded-xl cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out">Set Password</button >
                    </div>
                </div>
            </form>
        </div>
    </>)
}

export default ResetPassword