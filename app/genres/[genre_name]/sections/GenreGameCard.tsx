"use client"

import Link from "next/link"
import Image from "next/image"
import { useCoverQuery } from "@/app/game/hooks/game"
import { GameModel } from "@/app/models/game_model"
import { formatYear } from "@/app/genres/[genre_name]/utils/formatYear"

export default function GenreGameCard({ game }: { game: GameModel }) {
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

  const year = formatYear(game.first_release_date ?? undefined)

  return (
    <Link
      href={`/game/${game.id}`}
      className="group block rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 shadow-md hover:shadow-lg"
    >
      <div className="flex gap-5 p-4">
        {/* Cover image */}
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
          <h3 className="text-lg font-semibold text-white truncate">{game.name}</h3>

          <div className="mt-2 flex items-center gap-3 flex-wrap">
            {typeof game.rating !== "undefined" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-600/20 text-amber-400 rounded-md">
                <strong className="text-sm">{Math.round(game.rating)}</strong>
                <span className="text-neutral-400">/100</span>
              </span>
            )}
            {year && <span className="text-xs text-neutral-400">Released: {year}</span>}
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
