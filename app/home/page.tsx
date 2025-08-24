'use client'

import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import HighestRated from "./sections/HighestRated";
import Popular from "./sections/Popular";
import { autoLogin, refreshToken } from "../api";
import { useAppDispatch } from "../hooks";
import { setUserId } from "../userSlice";
import { useEffect, useState } from "react";

function HomePage() {

    const dispatch = useAppDispatch()
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)

    const auto_login = useQuery({
        queryKey: ['auto_login'],
        queryFn: async () => autoLogin(),
        // refetchInterval: 5_000
    })

    useQuery({
        queryKey: ['refresh_token'],
        queryFn: async () => {
            setShouldRefresh(false)
            return await refreshToken()
        },
        enabled: shouldRefresh
    })


    useEffect(() => {
        if (auto_login.isError) {
            console.log(auto_login.error.message)
            setShouldRefresh(true)
        }
    }, [auto_login.isError])


    // if (auto_login.isFetched) {
    //     // console.log(auto_login.data.user_id)
    //     if (auto_login.data?.user_id != null)
    //         dispatch(setUserId(auto_login.data.user_id))
    // }
    useEffect(() => {
        if (auto_login.isFetched && auto_login.data?.user_id != null) {
            dispatch(setUserId(auto_login.data.user_id));
        }
    }, [auto_login.isFetched, auto_login.data?.user_id, dispatch]);

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