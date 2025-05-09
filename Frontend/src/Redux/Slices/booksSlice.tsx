import { createSlice } from "@reduxjs/toolkit";

interface Book{
    title?: string;
    author?: string;
    quantity?: number;
    availability?: boolean;
    book_img?: string | ArrayBuffer | null;
    id?: number;
}
interface BookInitialState{
    data: Book[];
    isLoading: boolean;
    error: string | null;
}
const initialState:BookInitialState={
    data: [],
    isLoading: false,
    error: null,
}

export const booksSlice = createSlice({
    name: "Books",
    initialState: initialState,
    reducers:{
        addBook:(state)=>{
            state.data=[
                {
                    id:1,
                    title: "Book Title",
                    author: "Book Author",
                },
            ];
        },

    },

    });

    export const { addBook } = booksSlice.actions;
    export default booksSlice.reducer;
        