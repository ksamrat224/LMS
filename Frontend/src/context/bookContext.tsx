import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
//contextAPI-for global data management
//ThemeContext-for implementing dark/light mode toggle across the app
//Context Provider-stores and manipulates context data
//Context Consumer-uses context data in components
interface Book {
    id: number;
    title: string;
    author: string;
    quantity: number;
    availability: boolean;
    image: string;
}

interface BookContextValues {
  bookData:Book[];
}
const BookContext = createContext<BookContextValues>({
  bookData: [],
});

const BookProvider = ({ children }: { children: React.ReactElement }) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const fetchBooks = async () => {
    try {
        const response = await axiosInstance(`/books`);
        setBookData(response.data);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);


  const value = useMemo(() => ({ bookData}), [bookData]);
  return (
    <BookContext.Provider value={value}>{children}</BookContext.Provider>
  );
};
//custom hook that consumes the ThemeContext and returns the context value
const useBook = () => {
  const context = useContext(BookContext);
   return context;
};
export { useBook, BookProvider };
