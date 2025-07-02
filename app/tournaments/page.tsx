import React from "react";
import LiveTournaments from "./sections/LiveTournaments";
import UpcomingTournaments from "./sections/UpcomingTournaments";

const Tournaments: React.FC = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-zinc-900">
      <div className="flex flex-col h-full py-6 space-y-8">
        <LiveTournaments />
        <UpcomingTournaments />
      </div>
    </div>
  );
};

export default Tournaments;


