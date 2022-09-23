import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface conventionI {
    convention: 'celsius' | 'fahrenheit';
}

const initialState: conventionI = {
    convention: 'celsius'
}

export const conventionSlice = createSlice({
    name: 'convention',
    initialState,
    reducers: {
        setConvention: (state, action: PayloadAction<conventionI>) => {
            state.convention = action.payload.convention;
        },
    }
})

export const {
    setConvention
} = conventionSlice.actions;

export const conventionReducer = conventionSlice.reducer;
