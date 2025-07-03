import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GenreApiResponse{
    id:number
    name:string
}

const initState = {
    genres:[] as GenreApiResponse[]
}

export const genreSlice = createSlice({
    name:'genreSlice',
    initialState:initState,
    reducers:{
        addGenre:(state, action:PayloadAction<GenreApiResponse>)=>{
            state.genres.push(action.payload)
        }
    }
})

export const  {addGenre} = genreSlice.actions