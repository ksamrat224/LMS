import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../pages/Books";

interface Book{
    title?: string;
    author?: string;
    quantity?: number;
    availability?: boolean;
    book_img?: string | ArrayBuffer | null;
    id?: number;
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
        