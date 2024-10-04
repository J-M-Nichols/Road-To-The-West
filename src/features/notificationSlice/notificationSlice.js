import { createSlice } from "@reduxjs/toolkit"
import { GitHubStorageHandler } from "github-localstorage-handler"
import trackedPaths from "../../handlers/trackedPaths"

const notificationHandler = new GitHubStorageHandler(trackedPaths.notification)

const initialState = notificationHandler.getObject([])

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        addContent: (state, {payload}) => {
            const newState = state
            newState.unshift({
                content: payload.content, 
                classNames: payload.classNames
            })

            notificationHandler.setObject(newState)

            state = newState
            return newState
        }
    }
})

export const {addContent} = notificationSlice.actions
export default notificationSlice.reducer