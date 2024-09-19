import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    content: []
}

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        addContent: (state, action) => {
            state.content.unshift(action.payload)
        }
    }
})

export const {addContent} = notificationSlice.actions
export default notificationSlice.reducer