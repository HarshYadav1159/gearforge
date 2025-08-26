'use client'

import Link from "next/link"
import { useAppSelector } from "../hooks"

function Genres(){
    const genres = useAppSelector((state)=>state.genres.genres ?? [])

    return (
        <div className="m-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.length === 0 ? (
                <div className="text-sm text-muted">No genres available</div>
            ) : (
                genres.map((value) => (
                    console.log(`/genres/${encodeURIComponent(value.slug)}`),
                    <Link
                        key={value.id}
                        href={`/genres/${encodeURIComponent(value.slug)}`}
                        className="block p-4 border rounded hover:bg-neutral-800 hover:text-white transition"
                    >
                        <div className="text-lg font-medium">{value.name}</div>
                        <div className="text-sm text-neutral-400">{value.slug}</div>
                    </Link>
                ))
            )}
        </div>
    )
}

export default Genres