import React from "react"
import Link from "next/link"
import { loadTournaments } from "./lib/tournament"
import { Tournament } from "@/app/models/tournament_model"
import TournamentCard from "@/app/components/common/TournamentCard"
import DraggableScroll from "@/app/components/common/DraggableScroll"

function isLive(t: Tournament, now = Date.now()) {
  const start = t.start_date instanceof Date ? t.start_date.getTime() : new Date(t.start_date).getTime()
  const end = t.end_date instanceof Date ? t.end_date.getTime() : new Date(t.end_date).getTime()
  return start <= now && now <= end
}


export default function TournamentsPage() {
  const tournaments = loadTournaments()
  const now = Date.now()

  const live = tournaments.filter((t) => isLive(t, now))
  const upcoming = tournaments.filter((t) => {
    const start = t.start_date instanceof Date ? t.start_date.getTime() : new Date(t.start_date).getTime()
    return start > now
  })

  const HorizontalList = ({ items, showRegister = false }: { items: Tournament[]; showRegister?: boolean }) => (
    <div className="overflow-x-auto">
      <div className="py-2 px-2 sm:px-4">
        <DraggableScroll>
          {items.map((t) => (
            <TournamentCard key={t.tournament_id} t={t} live={isLive(t, now)} showRegister={showRegister} />
          ))}
        </DraggableScroll>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full min-h-screen gap-8 p-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Tournaments</h1>
          <Link
            href="/create_tournament"
            className="inline-flex items-center gap-2 px-3 py-2 bg-amber-600 text-black font-medium rounded hover:bg-amber-500"
          >
            Create tournament
          </Link>
        </header>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Live Tournaments</h2>
            <span className="text-sm text-neutral-400">{live.length} live</span>
          </div>

          {live.length === 0 ? (
            <div className="text-sm text-neutral-400">No live tournaments right now.</div>
          ) : (
            <HorizontalList items={live} />
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Tournaments</h2>
            <span className="text-sm text-neutral-400">{upcoming.length} upcoming</span>
          </div>

          {upcoming.length === 0 ? (
            <div className="text-sm text-neutral-400">No upcoming tournaments.</div>
          ) : (
            <HorizontalList items={upcoming} showRegister />
          )}
        </section>
      </div>
    </div>
  )
  return (<div className=" h-screen w-full flex justify-center items-center text-2xl"><p className="text-amber-500 border rounded-xl p-2 italic bold hover:bg-amber-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"> Coming Soon! Be Ready </p></div>)
}