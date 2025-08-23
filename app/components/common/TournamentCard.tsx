'use client'

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

// inside GameCard component
interface TournamentCardProps {
  game: {
    id: number;
    name: string;
    cover?: { url: string };
    status?: string;
    registrationDeadline?: string;
  };
  type?: 'live' | 'upcoming';
}

const TournamentCard: React.FC<TournamentCardProps> = ({ game, type = 'live' }) => 
  {
  
  // const router = useRouter()
  
  return (
    <div className="min-w-[300px] bg-zinc-800 rounded-lg overflow-hidden">
      
      <Image
        src={game.cover?.url || "/placeholder.jpg"}
        alt={game.name}
        className="w-full h-32 object-cover"
        width={1080}
        height={720}
      />

      <div className="p-3 text-white flex flex-col gap-1">
        <h4 className="font-semibold">{game.name}</h4>

        {type === 'live' && game.status && (
          <span className="text-sm text-red-500 font-semibold">{game.status}</span>
        )}

        {type === 'upcoming' && game.registrationDeadline && (
          <>
            <p className="text-sm text-gray-400">
              Register by: {game.registrationDeadline}
            </p>
            <Link className= "w-fit" href={"/tournaments/register"}>
            <button
              // onClick={() => router.push('/tournament_register')}
              className="mt-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded cursor-pointer w-fit"
            >
              Register
            </button>
            </Link>
          </>
        )}
      </div>
    </div>
  )};

export default TournamentCard;
