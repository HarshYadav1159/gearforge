'use client'

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useAppSelector } from "@/app/hooks"
import { useGenreQuery, useCoverQuery } from "@/app/game/hooks/game"
import { GameModel } from "@/app/models/game_model"

function formatYear(dateOrTimestamp: any) {
  if (!dateOrTimestamp) return ""
  const ts =
    typeof dateOrTimestamp === "number"
      ? dateOrTimestamp * 1000
      : Date.parse(String(dateOrTimestamp))
  const d = new Date(ts)
  return isNaN(d.getTime()) ? "" : String(d.getFullYear())
}

export default function GenrePage() {
  const params = useParams()
  const slug = params?.genre_name ?? ""
  const genres = useAppSelector((state) => state.genres.genres ?? [])
  const genre = genres.find((g: any) => g.slug === slug)

  const [page, setPage] = useState<number>(1)
  const pageSize = 5

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  // not found
  if (!genre) {
    return (
      <div className="m-8">
        <Link
          href="/genres"
          className="text-sm text-neutral-400 hover:text-white hover:underline transition"
        >
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

  // fetch games for this genre with pagination
  const gamesQuery = useGenreQuery(genre.id, page, pageSize)
  const games: GameModel[] = gamesQuery.data ?? []

  // Game card component
  function GameCard({ game }: { game: GameModel }) {
    const coverQuery = useCoverQuery(game.id)
    const coverId =
      coverQuery.isFetched &&
      Array.isArray(coverQuery.data) &&
      coverQuery.data[0]?.image_id
        ? coverQuery.data[0].image_id
        : null
    const imageUrl = coverId
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverId}.jpg`
      : null
    const year = formatYear(
      game.first_release_date
    )

    return (
      <Link
        href={`/game/${game.id}`}
        className="group block rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <div className="flex gap-5 p-4">
          {/* Cover */}
          <div className="w-28 h-36 rounded-md overflow-hidden bg-neutral-800 flex-shrink-0">
            {coverQuery.isLoading ? (
              <div className="w-full h-full animate-pulse bg-neutral-700" />
            ) : imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${game.name} cover`}
                width={224}
                height={288}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 640px) 100px, 112px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                No cover
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {game.name}
            </h3>

            <div className="mt-2 flex items-center gap-3 flex-wrap">
              {game.rating !== undefined && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-600/20 text-amber-400 rounded-md">
                  <strong className="text-sm">{Math.round(game.rating)}</strong>
                  <span className="text-neutral-400">/100</span>
                </span>
              )}

              {year && (
                <span className="text-xs text-neutral-400">Released: {year}</span>
              )}
            </div>

            {game.summary && (
              <p className="mt-3 text-sm text-neutral-300 line-clamp-3">
                {game.summary}
              </p>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // vertical skeleton while loading
  const SkeletonList = () => (
    <div className="flex flex-col gap-4 mt-6">
      {Array.from({ length: pageSize }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 animate-pulse"
        >
          <div className="w-28 h-36 rounded-md bg-neutral-800" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-neutral-700 rounded w-2/3" />
            <div className="h-3 bg-neutral-700 rounded w-1/2" />
            <div className="h-3 bg-neutral-700 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  )

  const hasNext = games.length >= pageSize

  return (
    <div className="m-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-neutral-400 mb-6">
        <Link href="/" className="hover:text-white hover:underline transition">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/genres" className="hover:text-white hover:underline transition">
          Genres
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white font-medium">{genre.name}</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">{genre.name}</h1>
        </div>
      </header>

      {/* Content */}
      <main>
        {gamesQuery.isLoading ? (
          <SkeletonList />
        ) : games.length === 0 ? (
          <div className="mt-8 text-sm text-neutral-400">
            No games found for this genre.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>

      {/* Pagination bottom */}
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
            onClick={() => {
              if (hasNext) setPage((p) => p + 1)
            }}
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
