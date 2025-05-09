import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
    name: "books",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers:{

    }

    });
        