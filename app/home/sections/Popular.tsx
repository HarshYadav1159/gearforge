'use client'

import DraggableScroll from "@/app/components/common/DraggableScroll";
import GameCard from "@/app/components/common/GameCard";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { GameCardModel } from "@/app/models/game_card_model";
import { CoverArt } from "@/app/models/cover_art_model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCoversQuery } from "./hooks/game";

interface Popularity {
  id: number;
  game_id: number;
  value: number;
  popularity_source?: number;
  external_popularity_source?: number;
  [key: string]: number | string | undefined;
}

const apiKey: string = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN!;
const clientId = '8t38bg3wjw6cfu643bmvww73yp3d0h';

function Popular() {
  // 1) Get popularity primitives (grab extra rows so we can dedupe to 10)
  const popularQuery = useQuery({
    queryKey: ['popular_games'],
    queryFn: async () => {
      const { data } = await axios.post<Popularity[]>(
        '/igdb/popularity_primitives',
        'fields id,game_id,value; sort value desc; limit 50;',
        {
          headers: {
            'Client-ID': clientId,
            Authorization: 'Bearer ' + apiKey,
          },
        }
      );
      return data;
    },
    staleTime: 60_000,
  });

  // 2) Build first 10 unique IDs, preserving popularity order
  const orderedUniqueIds: number[] = (() => {
    if (!popularQuery.isFetched || !Array.isArray(popularQuery.data)) return [];
    const seen = new Set<number>();
    const out: number[] = [];
    for (const p of popularQuery.data) {
      const id = Number(p.game_id);
      if (Number.isFinite(id) && !seen.has(id)) {
        seen.add(id);
        out.push(id);
        if (out.length >= 10) break;
      }
    }
    return out;
  })();

  // 3) Resolve games for those IDs and reorder to match popularity order
  const gameQuery = useQuery({
    queryKey: ['game_data', orderedUniqueIds],
    enabled: popularQuery.isFetched && orderedUniqueIds.length > 0,
    queryFn: async () => {
      const { data } = await axios.post<GameCardModel[]>(
        '/igdb/games',
        `fields *; where id=(${orderedUniqueIds.join(",")}); limit ${orderedUniqueIds.length};`,
        {
          headers: {
            'Client-ID': clientId,
            Authorization: 'Bearer ' + apiKey,
          },
        }
      );
      // Reorder to match popularity order
      const byId = new Map<number, GameCardModel>(
        (data ?? []).map((g) => [Number(g.id), g])
      );
      return orderedUniqueIds
        .map((id) => byId.get(id))
        .filter(Boolean) as GameCardModel[];
    },
    staleTime: 60_000,
  });

  // 4) Covers for exactly these games (hook should use a unique cache key per id set)
  const coverIds: number[] = gameQuery.isFetched
    ? gameQuery.data!.map((g) => Number(g.id))
    : [];
  const coverQuery = useCoversQuery(gameQuery.isFetched, coverIds);

  // ---- Loading / error states ----
  if (popularQuery.isLoading) return <div></div>;
  if (popularQuery.isError) return <div>Error retrieving data</div>;

  if (popularQuery.isFetched) {
    if (gameQuery.isLoading) return <LoadingSpinner />;
    if (gameQuery.isError) return <div>Failed to load games</div>;

    if (coverQuery.isLoading) return <LoadingSpinner />;
    if (coverQuery.isError) return <div>Error Loading Cover</div>;
  }

  // ---- Render ----
  return (
    <div className="mx-4 sm:mx-8 md:mx-12 mb-4">
      <p className="text-white text-2xl md:text-3xl">Recently Popular</p>

      <div className="flex flex-col">
        <DraggableScroll>
          {gameQuery.data?.map((value: GameCardModel, index: number) => {
            // attach cover if present
            value.cover = coverQuery.data?.find(
              (c: CoverArt) => c.game === Number(value.id)
            );
            return (
              <div key={index} className="flex-shrink-0">
                <GameCard game={value} />
              </div>
            );
          })}
        </DraggableScroll>
      </div>
    </div>
  );
}

export default Popular;
