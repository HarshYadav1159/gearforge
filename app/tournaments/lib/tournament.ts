import fs from "fs"
import path from "path"
import { Tournament } from "@/app/models/tournament_model"

const DATA_PATH = path.join(process.cwd(), "app", "tournaments", "tournament.json")
let tournaments: Tournament[] | null = null

export function parseRaw(raw: any): Tournament {
  return {
    tournament_id: String(raw.tournament_id),
    name: String(raw.name),
    // convert start/end date strings to Date objects (model uses start_date / end_date)
    start_date: raw.start_date ? new Date(raw.start_date) : new Date(),
    end_date: raw.end_date ? new Date(raw.end_date) : new Date(raw.start_date ?? undefined),
    cover: String(raw.cover ?? ""),
    team_size: Number(raw.team_size ?? 1),
    total_slots: Number(raw.total_slots ?? 0),
    registered_slots: Number(raw.registered_slots ?? 0),
    registerd_id: Array.isArray(raw.registerd_id) ? raw.registerd_id.map(String) : [],
    winner_id: String(raw.winner_id ?? ""),
    runnerup_id: String(raw.runnerup_id ?? ""),
    tournament_division: Number(raw.tournament_division ?? 0),
    pool_price: Number(raw.pool_price ?? 0),
    entry_fee: Number(raw.entry_fee ?? 0),
    game_type: String(raw.game_type ?? ""),
  }
}

export function loadTournaments(): Tournament[] {
  // Backend logic to load tournaments
  if (tournaments) return tournaments
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8")
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) {
      tournaments = []
      return tournaments
    }
    tournaments = arr.map(parseRaw)
    return tournaments
  } catch (e) {
    tournaments = []
    return tournaments
  }
}

export function getLiveAndUpcoming(): { live: Tournament[]; upcoming: Tournament[] } {
  const list = loadTournaments()
  const now = Date.now()

  const live: Tournament[] = []
  const upcoming: Tournament[] = []

  for (const t of list) {
    const start = t.start_date.getTime()
    const end = t.end_date.getTime()
    if (start <= now && now <= end) {
      live.push(t)
    } else if (start > now) {
      upcoming.push(t)
    }
  }

  live.sort((a, b) => a.start_date.getTime() - b.start_date.getTime())
  upcoming.sort((a, b) => a.start_date.getTime() - b.start_date.getTime())

  return { live, upcoming }
}
