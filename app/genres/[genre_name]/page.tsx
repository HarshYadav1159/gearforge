"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useAppSelector } from "@/app/hooks"
import { useGenreQuery } from "@/app/game/hooks/game"
import { GameModel } from "@/app/models/game_model"
import GenreGameCard from "./sections/GenreGameCard"
import SkeletonList from "./sections/SkeletonList"

type Genre = {
  id: number
  name: string
  slug: string
  url?: string
}

export default function GenrePage() {
  const params = useParams() as { genre_name?: string }
  const slug = params?.genre_name ?? ""

  const genres = useAppSelector((state) => (state.genres.genres ?? []) as Genre[])
  const genre = genres.find((g) => g.slug === slug)

  const [page, setPage] = useState<number>(1)
  const pageSize = 5

  const gamesQuery = useGenreQuery(genre?.id ?? -1, page, pageSize)
  const games: GameModel[] = gamesQuery.data ?? []

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  if (!genre) {
    return (
      <div className="m-8">
        <Link href="/genres" className="text-sm text-neutral-400 hover:text-white hover:underline transition">
          ← Back to genres
        </Link>
        <div className="mt-6 max-w-3xl">
          <h1 className="text-2xl font-bold text-white">Genre not found</h1>
          <p className="text-sm text-neutral-400 mt-2">
            No genre matches <span className="font-medium">{slug}</span>.
          </p>
        </div>
      </div>
    )
  }

  const hasNext = games.length >= pageSize

  return (
    <div className="m-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-neutral-400 mb-6">
        <Link href="/" className="hover:text-white hover:underline transition">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/genres" className="hover:text-white hover:underline transition">Genres</Link>
        <span className="mx-2">/</span>
        <span className="text-white font-medium">{genre.name}</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-white">{genre.name}</h1>
      </header>

      {/* Games list */}
      <main>
        {gamesQuery.isLoading ? (
          <SkeletonList pageSize={pageSize} />
        ) : games.length === 0 ? (
          <div className="mt-8 text-sm text-neutral-400">No games found for this genre.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {games.map((game) => (
              <GenreGameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>

      {/* Pagination */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="text-sm text-neutral-400">
          Showing {games.length} game{games.length !== 1 && "s"}
        </div>
        <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 transition"
          >
            Prev
          </button>
          <div className="text-sm text-white">Page {page}</div>
          <button
            onClick={() => hasNext && setPage((p) => p + 1)}
            disabled={!hasNext}
            className="px-3 py-1 text-sm rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
