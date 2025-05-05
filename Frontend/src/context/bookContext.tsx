import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
//contextAPI-for global data management
//ThemeContext-for implementing dark/light mode toggle across the app
//Context Provider-stores and manipulates context data
//Context Consumer-uses context data in components
interface Book {
  id?: number;
  title: string;
  author: string;
  quantity: number;
  availability?: boolean;
  book_img?: string;
}

interface BookContextValues {
  bookData: Book[];
  onDelete: (id: number) => void;
  updateBookData:(updatedBook:Book)=>void;
}
const BookContext = createContext<BookContextValues>({
  bookData: [],
  onDelete: () => {},
  updateBookData: () => {},
});

const BookProvider = ({ children }: { children: React.ReactElement }) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance(`/books`);
      console.log("response", response.data);
      setBookData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const updateBookData=(updatedBook:Book)=>{
    setBookData([...bookData, updatedBook]);
  };
  const onDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      const newData = [...bookData].filter((book) => book.id !== id);
      setBookData(newData);
      toast.success("Book deleted successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error deleting book!", {
        position: "top-right",
        autoClose: 1000,
      });
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const value = useMemo(() => ({ bookData, onDelete ,updateBookData}), [bookData]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
//custom hook that consumes the ThemeContext and returns the context value
const useBook = () => {
  const context = useContext(BookContext);
  return context;
};
export { useBook, BookProvider };
