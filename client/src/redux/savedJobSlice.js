// src/redux/savedJobsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedJobSlice = createSlice({
  name: "savedJobs",
  initialState: {
    items: [],         // full job docs (with company populated)
    loading: false,
  },
  reducers: {
    setSavedJobs: (state, action) => {
      state.items = action.payload || [];
    },
    setSavedJobsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSavedJobs, setSavedJobsLoading } = savedJobSlice.actions;
export default savedJobSlice.reducer;
