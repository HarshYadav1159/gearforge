'use client'

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Tournament } from '@/app/models/tournament_model';
function formatDate(d: Date) {
  return d.toLocaleString()
}

// add INR formatter
const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export default function TournamentCard({
  t,
  live,
  showRegister,
}: {
  t: Tournament
  live: boolean
  showRegister?: boolean
}) {
  const progress =
    t.total_slots > 0 ? Math.round((t.registered_slots / t.total_slots) * 100) : 0

  const isFull = t.registered_slots >= t.total_slots

  return (
    <article
      className="relative flex-shrink-0 bg-neutral-900/60 border border-neutral-800 rounded-lg overflow-hidden shadow-sm"
      style={{
        minWidth: "220px",
        width: "min(48vw,320px)",
      }}
      aria-labelledby={`t-${t.tournament_id}-title`}
    >
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        {t.cover ? (
          <Image
            src={t.cover}
            alt={t.name}
            fill
            sizes="(max-width:480px) 80vw, (max-width:1024px) 45vw, 320px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-neutral-400">
            No cover
          </div>
        )}

          {live && (
            <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-semibold px-2 py-1 rounded shadow">
              LIVE
            </span>
          )}
        </div>
  
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 id={`t-${t.tournament_id}-title`} className="text-sm font-semibold text-white truncate">
          {t.name}
            </h3>
            <div className="text-xs text-neutral-400">{formatDate(t.start_date)}</div>
          </div>

          {live ? (
            <div className="mt-3 flex items-center justify-end">
          <Link
            href={`/tournaments/${encodeURIComponent(t.tournament_id)}`}
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-500"
          >
            View
          </Link>
            </div>
          ) : (
            <>
              <div className="mt-2 flex items-center gap-3 text-sm text-neutral-400">
                <span className="text-xs">{t.registered_slots}/{t.total_slots} registered</span>
                <div className="flex-1 bg-neutral-800 rounded h-2 overflow-hidden">
                  <div className="bg-white h-full" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* show entry fee and pool price for upcoming tournaments */}
              <div className="mt-2 flex items-center justify-between text-sm text-neutral-300">
                <span>Entry: {formatINR(t.entry_fee ?? 0)}</span>
                <span>Prize: {formatINR(t.pool_price ?? 0)}</span>
              </div>
            </>
          )}

          {showRegister && !live && (
            <div className="mt-3 flex items-center justify-end">
          {!isFull ? (
            <Link
              href={`/tournaments/register?tournament_id=${encodeURIComponent(t.tournament_id)}`}
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-500"
            >
              Register
            </Link>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled
                title="Tournament is full"
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white font-medium rounded cursor-not-allowed opacity-60"
              >
                Full
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}