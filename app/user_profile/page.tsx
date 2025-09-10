'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../api"
import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "../hooks"
import { logoutUser } from "../userSlice"
import { signOut } from "next-auth/react"


function UserProfile() {

    const router = useRouter()

    const dispatch = useAppDispatch()

    const queryClient = useQueryClient()
    
    const logUserOut = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => logout(),
        onSuccess: async () => {
            dispatch(logoutUser())
            
            // nuke auth-related queries so stale data doesn't keep you "logged in"
            queryClient.removeQueries({ queryKey: ['auto_login'] });
            queryClient.removeQueries({ queryKey: ['refresh_token'] });
            queryClient.removeQueries({ predicate: q => String(q.queryKey[0]).startsWith('user_') });
   
            await signOut({redirect:false})
            router.replace("/")
            router.refresh()  
        }
    })

    const handleLogOut = (e: React.FormEvent) => {
        e.preventDefault()
        logUserOut.mutate()
    }

    return (<>
        <form>
        <button type="button" onClick={handleLogOut} className="m-8 border border-red-700 text-red-800 p-2 w-fit rounded-xl cursor-pointer hover:bg-red-800 hover:text-white transition-all duration-200 ease-in-out">Logout</button>
        </form>
    </>)
}

export default UserProfile