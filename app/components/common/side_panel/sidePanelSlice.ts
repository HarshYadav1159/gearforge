import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false
}

export const sidePanelSlice = createSlice({
    name:'side_panel',
    initialState,
    reducers:{
        togglePanel : (state)=>{
            state.isOpen = !state.isOpen
        },
        openPanel : (state)=>{
            state.isOpen = true
        },
        clostPanel:(state)=>{
            state.isOpen = false
        }
    }
})

export const {togglePanel, openPanel} = sidePanelSlice.actions