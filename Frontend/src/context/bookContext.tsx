import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
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
  const [Book, setBook] = useState<Book>("light");
  const toggleBook = () => {
    setBook((prevBook) => (prevBook === "light" ? "dark" : "light"));
  };
  const value = useMemo(() => ({ Book, toggleBook }), [Book]);
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
