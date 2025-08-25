'use client'

import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import HighestRated from "./sections/HighestRated";
import Popular from "./sections/Popular";
import { autoLogin, getUserData, refreshToken } from "../api";
import { useAppDispatch } from "../hooks";
import { setUser, setUserId } from "../userSlice";
import { useEffect, useState } from "react";

function HomePage() {

    const dispatch = useAppDispatch()
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)
    const [fetchUserData, setFetchUserData] = useState<boolean>(false)
    // const user_id = useAppSelector((state) => state.users.user.user_id)

    const auto_login = useQuery({
        queryKey: ['auto_login'],
        queryFn: async () => autoLogin(),
        // refetchInterval: 5_000
        refetchOnMount:"always"
    })

    useQuery({
        queryKey: ['refresh_token'],
        queryFn: async () => {
            setShouldRefresh(false)
            return await refreshToken()
        },
        enabled: shouldRefresh
    })

    const user_query = useQuery({
        queryKey: [`user_${auto_login.data?.user_id}`],
        queryFn: async () => getUserData(auto_login.data.user_id),
        enabled: fetchUserData
    })

    useEffect(() => {
        if (auto_login.isError) {
            // console.log(auto_login.error.message)
            setShouldRefresh(true)
        }

        if (user_query.isFetched) {
            setFetchUserData(false)
            dispatch(setUser(user_query.data))
        }
    }, [auto_login.isError, user_query.isFetched])


    // if (auto_login.isFetched) {
    //     // console.log(auto_login.data.user_id)
    //     if (auto_login.data?.user_id != null)
    //         dispatch(setUserId(auto_login.data.user_id))
    // }

    useEffect(() => {
        if (auto_login.isFetched && auto_login.data?.user_id != null) {
            dispatch(setUserId(auto_login.data.user_id));
            setFetchUserData(true)
            // dispatch(loginUser())
        }
    }, [auto_login.isFetched, auto_login.data?.user_id,dispatch]);

    return (<main className="flex min-h-screen w-full">
        {/*Content On the Right side of panel*/}
        <div className="flex flex-col w-full min-h-screen">
            <Carousel />
            <HighestRated />
            <Popular />
        </div>

    </main>)
}

export default HomePage