export interface Tournament{
    tournament_id : string
    name:string
    date:Date
    cover:string
    total_slots:number
    registered_slots : number
    registerd_id : string[]
    winner_id:string
    runnerup_id : string
    tournament_division : number
}