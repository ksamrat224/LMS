import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../pages/Books";
import { data } from "react-router";

interface Book{
    title?: string;
    author?: string;
    quantity?: number;
    availability?: boolean;
    book_img?: string | ArrayBuffer | null;
    id?: number;
}
const initialState:BookInitialState={
    data: [],
    isLoading: false,
    error: null,
}

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
        