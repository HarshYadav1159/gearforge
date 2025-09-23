export interface Tournament{
    tournament_id : string
    name:string
    start_date:Date
    end_date:Date
    cover:string
    team_size:number
    total_slots:number
    registered_slots : number
    registerd_id : string[]
    winner_id:string
    runnerup_id : string
    tournament_division : number
    pool_price: number
    entry_fee: number
    game_type: string
}