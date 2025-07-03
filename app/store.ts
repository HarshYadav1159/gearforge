import { configureStore } from "@reduxjs/toolkit";
import {sidePanelSlice} from "./components/common/side_panel/sidePanelSlice"
import { genreSlice } from "./genres/genreSlice";

export const store = configureStore({
    reducer:{
       sidePanel:sidePanelSlice.reducer,
       genres:genreSlice.reducer
    }
})

export type GetState = ReturnType<typeof store.getState>

export type Dispatch = typeof store.dispatch
