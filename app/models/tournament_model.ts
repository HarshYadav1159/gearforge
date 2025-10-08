export interface Tournament {
  tournament_id: string;
  name: string;
  game_category: string;
  start_date: Date;
  end_date: Date;
  cover?: string;
  team_size?: number;
  total_slots?: number;
  registered_slots?: number;
  registered_id?: string[];
  winner_id?: string;
  runnerup_id?: string;
  tournament_division?: number;
  pool_price?: number;
  entry_fee?: number;
  created_at?: Date;
  updated_at?: Date;
  status: 'upcoming' | 'live' | 'ended';
  tournament_date?: Date;
}