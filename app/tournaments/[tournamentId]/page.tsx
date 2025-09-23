// app/tournaments/[tournamentId]/page.tsx
import React from "react";

type Props = {
  params: Promise<{ tournamentId: string }>; // <-- now Promise
};

export default async function TournamentPage({ params }: Props) {
  // Await params
  const { tournamentId } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tournament Page {tournamentId}</h1>
      <p className="mt-2">Welcome to the tournament details page.</p>
    </div>
  );
}
