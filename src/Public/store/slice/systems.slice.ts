import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import bootstrapMainPageThunk from "../thunks/bootstrap-main-page.thunk";


const systemsSlice = createSlice({
    name: 'systems',
    initialState: [],
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(bootstrapMainPageThunk.fulfilled, (state, action) => {
            state.push(...action.payload);
        })
    }
})

export default systemsSlice.reducer;
