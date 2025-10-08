'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Tournament } from "@/app/models/tournament_model"

export default function CreateTournamentPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [cover, setCover] = useState("") // URL
  const [gameType, setGameType] = useState<string>("") // NEW field
  const [teamSize, setTeamSize] = useState<number>(1)
  const [totalSlots, setTotalSlots] = useState<number>(8)
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  // const [registeredIds, setRegisteredIds] = useState<string>("") // comma separated
  // const [winnerId, setWinnerId] = useState<string>("")
  // const [runnerupId, setRunnerupId] = useState<string>("")
  const [tournamentDivision, setTournamentDivision] = useState<number>(1)
  const [poolPrice, setPoolPrice] = useState<number>(0)
  const [entryFee, setEntryFee] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // ...existing code for validate and onSubmit...
  function validate(): boolean {
    if (!name.trim()) {
      setError("Game name is required.")
      return false
    }
    if (!startDate || !endDate) {
      setError("Start and end date/time are required.")
      return false
    }
    const s = new Date(startDate).getTime()
    const e = new Date(endDate).getTime()
    if (Number.isNaN(s) || Number.isNaN(e) || s >= e) {
      setError("Start date must be before end date.")
      return false
    }
    if (teamSize <= 0) {
      setError("Team size must be at least 1.")
      return false
    }
    if (totalSlots <= 0) {
      setError("Total slots must be at least 1.")
      return false
    }
    setError(null)
    return true
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)

    const tournament: Tournament = {
      tournament_id: `t_${Date.now()}`,
      name: name.trim(),
      start_date: new Date(startDate),
      end_date: new Date(endDate),
      cover: cover.trim(),
      game_category: gameType.trim(), // NEW
      team_size: Number(teamSize),
      total_slots: Number(totalSlots),
      registered_slots: 0,
      //================================= THESE VALUES HAVE TO BE CHANGED ==============================
      // registerd_id: registeredIds.split(",").map((s) => s.trim()).filter(Boolean),
      // winner_id: winnerId.trim(),
      // runnerup_id: runnerupId.trim(),
      registered_id:["a","b"],
      winner_id:"a",
      runnerup_id:"b",
      //=================================================================================================
      tournament_division: Number(tournamentDivision),
      pool_price: Number(poolPrice),
      entry_fee: Number(entryFee),
      status:'upcoming'
    }

    try {
      // Implement Backend logic to create new tournament
      const key = "tournaments_local_additions"
      const existing = JSON.parse(sessionStorage.getItem(key) ?? "[]")
      existing.push({
        ...tournament,
        
        start_date: tournament.start_date.toISOString(),
        end_date: tournament.end_date.toISOString(),
      })
      sessionStorage.setItem(key, JSON.stringify(existing))

      // optional: navigate back to tournaments listing
      router.push("/tournaments")
    } catch (err) {
      setError(`Failed to save tournament locally : ${err}`)
      setSaving(false)
      return
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl bg-neutral-900/60 border border-neutral-800 rounded-lg p-6 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-white">Create Tournament</h1>

        {error && <div className="text-sm text-rose-400">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-300">Game name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
              placeholder="Enter game / tournament name"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Cover (URL)</label>
            <input
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Game type</label>
            <input
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
              placeholder="e.g. FPS, MOBA, Sports"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Team size</label>
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value || 1)))}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
              min={1}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Total slots</label>
            <input
              type="number"
              value={totalSlots}
              onChange={(e) => setTotalSlots(Math.max(1, Number(e.target.value || 1)))}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
              min={1}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Start date & time</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">End date & time</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Tournament division</label>
            <input
              type="number"
              value={tournamentDivision}
              onChange={(e) => setTournamentDivision(Number(e.target.value || 1))}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
              min={0}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Pool price (INR)</label>
            <input
              type="number"
              value={poolPrice}
              onChange={(e) => setPoolPrice(Number(e.target.value || 0))}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
              min={0}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Entry fee (INR)</label>
            <input
              type="number"
              value={entryFee}
              onChange={(e) => setEntryFee(Number(e.target.value || 0))}
              className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white"
              min={0}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            disabled={saving}
            className={
              "px-4 py-2 rounded font-medium " +
              (saving ? "bg-neutral-700 text-neutral-300 cursor-not-allowed" : "bg-amber-600 text-black")
            }
          >
            {saving ? "Saving…" : "Create Tournament"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/tournaments")}
            className="text-sm text-neutral-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
//